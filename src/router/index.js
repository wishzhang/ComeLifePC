import Vue from 'vue/dist/vue';
import Router from 'vue-router';
import store from '$src/store/index';
import routes from './routes';

Vue.use(Router);

const router = new Router({
    routes,
    scrollBehavior(to, from, savedPosition) {
        /*        console.log('to:'+JSON.stringify(to.hash))
                if (to.hash) {
                    return {
                        selector: to.hash
                    }
                }*/
    }
});

router.beforeEach((to, from, next) => {
    console.log('beforeEach')
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.loginStatus) {
            next({
                name: 'session'
            });
        } else {
            next();
        }
    } else {
        next(); // 确保一定要调用 next()
    }
});

router.afterEach((to, from) => {

});

export default router;
