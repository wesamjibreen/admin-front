import {createRouter, createWebHistory} from "vue-router";
// import routes from './routes';
import NProgress from 'nprogress'


const initRouter = function (routes, base = "/") {
    const router = createRouter({
        base,
        history: createWebHistory('/admin'),
        routes, // short for `routes: routes`
    });
    /**
     * Handle NProgress display on page changes
     */
    router.beforeEach(() => {
        NProgress.start()
    });
    router.afterEach(() => {
        NProgress.done()
    });
}

export default initRouter;
