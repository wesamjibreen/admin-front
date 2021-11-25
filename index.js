import {createApp, h} from 'vue';
import initRouter from "./src/router";
import {initStore} from "./src/store";
import RootApp from "./src/RootApp.vue";
import {createHead} from '@vueuse/head'
import {GlobalComponents} from "./src/components";
import {GlobalMixins} from "./src/mixins";


export default class App {
    constructor({base, routes, endPoints, config}) {
        this.routes = routes;
        this.base = base;
        this.endPoints = endPoints;
        this.config = config;
    }


    boot() {
        this.initRouter();
        this.initStore();
        this.initEndPoints();
    }


    init() {
        this.boot();
        this.app = createApp({
            render() {
                return h(RootApp)
            }
        });
        this.useModules();
        this.registerComponents();
        this.useMixins();
        this.app.mount('#app');
        return this.app;
    }

    useModules() {
        this.app.use(createHead);
        this.app.use(this.router);
        this.app.use(this.store);

    }

    registerComponents() {
        Object.entries(GlobalComponents).forEach((value) => {
            this.app.component(value[0], value[1]);
        });
    }

    useMixins() {
        GlobalMixins.forEach((mixin) => {
            this.app.mixin(mixin);
        });
    }

    initRouter() {
        this.router = initRouter(this.routes, "/company");
    }


    initStore() {
        this.store = initStore();
    }


    initEndPoints() {
        this.endPoints = {}
    }

    instance() {
        return this.app;
    }
}

// import {GlobalComponents} from "./components";
// import {createI18n} from './i18n'
// import store from './store';
//
// require('./plugins');
// require('./utils/bus');
// const app = createApp({
//     // components: GlobalComponents,
//     render() {
//         return h(App)
//     }
// });
// const head = createHead();
// Object.entries(GlobalComponents).forEach(function (value) {
//     app.component(value[0], value[1]);
// });
// app.use(router);
// app.use(head);
// app.use(store);
// app.use(createI18n());
// globalMixins.forEach(function (mixin) {
//     app.mixin(mixin);
// });
// app.mount('#app');
//
// export default window.app =app;


