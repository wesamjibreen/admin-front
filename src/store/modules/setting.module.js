// actions
import {getCountry} from "../core/services/jwt.service";

export const FETCH_COUNTRIES = "fetchCountries";
export const FETCH_OPTIONS = "fetchOptions";
export const PURGE_OPTIONS = "purgeOptions";
export const UPDATE_OPTIONS = "updateOptions";
export const FETCH_LANGUAGES = "fetchLanguages";

// mutations
export const SET_COUNTRIES = "setCountries";
export const SET_CURRENT_COUNTRY = "setCurrentCountry";
export const SET_OPTIONS = "setOptions";
export const SET_OPTIONS_FETCHED = "setOptionsFetched";
export const SET_CURRENT_LANGUAGE = "setCurrentLanguage";

// getters
export const GET_CURRENT_COUNTRY = "getCurrentCountry";
export const GET_CURRENT_LANGUAGE = "getCurrentLanguage";
export const GET_CURRENT_COUNTRY_LANGUAGES = "getCurrentCountryLanguages";

const state = () => ({
  countries: [],
  currentCountry: getCountry(),
  currentLanguage: localStorage.getItem("language") || "ar"
});
// module getters
const getters = {
  [GET_CURRENT_COUNTRY](state) {
    return state.countries.find(
      country => country.id === parseInt(state.currentCountry)
    );
  },
  [GET_CURRENT_LANGUAGE](state) {
    return state.currentLanguage;
  },
  [GET_CURRENT_COUNTRY_LANGUAGES]: (state, getters) => {
    const langs = getters[`${GET_CURRENT_COUNTRY}`]?.languages || {};
    return langs;
  }
};

// module actions
const actions = {
  [FETCH_LANGUAGES]() {},
  [FETCH_COUNTRIES]({ commit }, { context }) {
    context.request(
      context.route$("country.index"),
      {
        params: {
          no_pagination: true
        }
      },
      function({ data }) {
        commit(SET_COUNTRIES, data.data);
      },
      function(xhr) {},
      function() {}
    );
  },
  async [FETCH_OPTIONS]({ commit, state }, context) {
    // if (_.get(state, `${context.optionsKey}Fetched`, true))
    if (_.get(state, context.optionsKey, []).length === 0)
      await context.request(
        context.route$(context.endPoint.route, context.endPoint.params),
        { params: context.endPoint.params },
        function({ data }) {
          let options =
            data.data.data != undefined ? data.data.data : data.data;
          commit(SET_OPTIONS, {
            key: context.optionsKey,
            options: options
          });
          commit(SET_OPTIONS_FETCHED, {
            key: `${context.optionsKey}Fetched`,
            value: false
          });
        },
        function() {
          commit(SET_OPTIONS, {
            key: context.optionsKey,
            options: []
          });
        },
        function() {
          // _this.is_loading = false;
        }
      );
  },
  async [UPDATE_OPTIONS]({ commit, state }, context) {
    await context.request(
      context.route$(context.endPoint.route, context.endPoint.params),
      { params: context.endPoint.params },
      function({ data }) {
        commit(SET_OPTIONS, {
          key: context.optionsKey,
          options: data.data.data != undefined ? data.data.data : data.data
        });
        commit(SET_OPTIONS_FETCHED, {
          key: `${context.optionsKey}Fetched`,
          value: false
        });
      },
      function() {
        commit(SET_OPTIONS, {
          key: context.optionsKey,
          options: []
        });
      },
      function() {
        // _this.is_loading = false;
      }
    );
  }
};

// module mutations
const mutations = {
  [PURGE_OPTIONS](state) {
    for (var member in state) delete state[member];
  },
  [SET_CURRENT_LANGUAGE](state, language) {
    state.currentLanguage = language;
  },
  [SET_COUNTRIES](state, countries) {
    state.countries = countries;
  },
  [SET_CURRENT_COUNTRY](state, currentCountry) {
    state.currentCountry = currentCountry;
  },
  [SET_OPTIONS](state, { key, options }) {
    window.$vm.$set(state, key, options);
  },
  [SET_OPTIONS_FETCHED](state, { key, value }) {
    window.$vm.$set(state, key, value);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
