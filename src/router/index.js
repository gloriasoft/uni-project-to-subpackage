import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from '../common/uni-simple-router'

Vue.use(Router)
//初始化
const router = new Router({
    routes: [
        {
            path:'/uniSubpackage/pages/about/about'
        },{
            path:'/pages/about/about'
        },{
            path:'/uniSubpackage/pages/test/about'
        },{
            path:'/pages/index/index'
        }
        // ...getRouterTableList(require('../page_modules')),
        // ...getRouterTableList(require('../page_modules/component')),
        // ...getRouterTableList(require('../page_modules/tabbar'))
    ]//路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
    console.log(to,from,88888)
    next()
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})
export default router;
