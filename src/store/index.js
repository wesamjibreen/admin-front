import {createStore} from "vuex";

import modules from './modules';


// export default store;
export const initStore = function (options) {
    return createStore({
        ...options,
        modules
    });
};