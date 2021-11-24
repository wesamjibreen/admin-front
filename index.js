import {createApp} from 'vue';
import initRouter from "./src/router";

export default class App {
    constructor(config) {
        this.config = config;
    }

    initRouter(routes = []) {
        this.router = initRouter(routes, "/company");
    }

    boot() {

    }


    init() {
        this.boot();

        this.app = createApp({
            // components: GlobalComponents,
            // render() {
            //     return h(App)
            // }
        });

    }

    useModules() {
        this.instance().use(this.router);
    }


    instance() {
        return this.app;
    }
}
