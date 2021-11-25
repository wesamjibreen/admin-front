const state = () => ({});
export const BUSY_FIELDS = "busyFields";

// mutation types
export const SET_INPUT = "setInput";
export const SET_FORM = "setForm";
export const EMPTY_FORM = "emptyForm";
export const SET_BUSY_FIELDS = "setBusyFields";

// getters types
export const GET_INPUT = "getInput";
export const GET_FORM = "getForm";
export const GET_REPEATER = "getRepeater";

// actions types
export const SUBMIT_FORM = "submitForm";

const getters = {
    [GET_FORM](state) {
        return state;
    },
    //   [GET_BUSY_FIELDS](state) {
    //       console.log('get busy state', state[busyFields]);
    //     return state[busyFields];
    //   }
    [GET_REPEATER]: state => model => {
        return state[model];
    }
};

const actions = {
    [SUBMIT_FORM](context, {_this, endPoint}) {
        return new Promise((resolve, reject) => {
            _this.request(
                endPoint,
                {
                    ...context.state
                },
                function ({data}) {
                    resolve(data);
                },
                function (response) {
                    reject(response);
                }
            );
        });
    }
    // [FETCH_OPTIONS](context , paylod)
};

const mutations = {
    [SET_INPUT](state, {model, value, locale}) {
        // console.log('model', model, value);
        if (locale) {
            if (!state[model])
                state[model] = {};
            state[model][locale] = value;
        } else
            state[model] = value;

        // alert('SET_INPUT');
        // console.log("SET_INPUT", model, value, state[model]);
        // state[model] = value;
        // window.app.$set(state, model, value);
        // _.set(state, model, value);
        // window.$vm.$set(state, model, value);
    },

    [SET_FORM](state, form) {
        Object.assign(state, form);
    },
    [EMPTY_FORM](state, _this) {
        Object.assign(
            state,
            _.transform(
                state,
                function (result, value, key) {
                    if (typeof value === "number") result[key] = 0;
                    else result[key] = null;
                },
                {}
            )
        );
        // _.assign(state, Object.entries(state).map(function () {
        //     return undefined;
        // }));
        // console.log('EMPTY_FORM',  arr, state);

        // Object.keys(state).forEach(element => {
        //     if (element != "type" && element != BUSY_FIELDS) {
        //         window.$vm.$set(state, element, null);
        //     }
        // });
        _this.$root.$emit("form-data-emptied", _this.formModule);
    },
    [SET_BUSY_FIELDS](state, value) {
        window.$vm.$set(state, BUSY_FIELDS, value);
    }
};

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true // making our module reusable
};
