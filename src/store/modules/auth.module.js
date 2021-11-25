import ApiService from "@common/core/services/api.service";
import JwtService from "@common/core/services/jwt.service";
import api from "@common/mixins/request";
import Swal from "sweetalert2";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_PASSWORD = "updateUser";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_PASSWORD = "setPassword";
export const SET_ERROR = "setError";

const state = {
  errors: null,
  user:
    JSON.parse(
      localStorage.getItem(
        JwtService.getResource() === "admin" ? "admin_auth" : "restaurant_auth"
      )
    ) || {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, { credentials, endPoint }) {
    return new Promise((resolve, reject) => {
      api.methods.request(
        endPoint,
        credentials,
        function(data) {
          context.commit(SET_AUTH, { ...data, module });
          resolve(data);
        },
        function(response) {
          Swal.fire({
            title: "",
            text: response.data.message,
            icon: "error",
            confirmButtonClass: "btn btn-secondary",
            heightAuto: false
          });
          reject(response);
          context.commit(SET_ERROR, "");
        }
      );
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise(resolve => {
      ApiService.post("login", credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [VERIFY_AUTH](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("verify")
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
        })
        .catch(({ response }) => {
          // context.commit(SET_ERROR, response.data.errors);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_PASSWORD](context, payload) {
    const password = payload;

    return ApiService.put("password", password).then(({ data }) => {
      context.commit(SET_PASSWORD, data);
      return data;
    });
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    let data = user.data.data;

    state.isAuthenticated = true;
    state.user = data.auth;
    state.errors = {};
    JwtService.saveUser(data.auth);
    JwtService.saveToken(data.access_token);
  },
  [SET_PASSWORD](state, password) {
    state.user.password = password;
  },
  [PURGE_AUTH](state, module) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyUser();
    JwtService.destroyToken();
    JwtService.destroyScope();
    JwtService.destroyCountry();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
