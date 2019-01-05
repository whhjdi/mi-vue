import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/category",
      name: "category",
      // route level code-splitting
      // this generates a separate chunk (category.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "category" */ "./views/Category.vue")
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import(/* webpackChunkName: "cart" */ "./views/Cart.vue")
    },
    {
      path: "/user",
      name: "user",
      component: () => import(/* webpackChunkName: "user" */ "./views/User.vue")
    },
    {
      path: "commodity/detail/:id",
      name: "detail",
      component: () =>
        import(/* webpackChunkName: "product" */ "./views/Detail.vue")
    },
    {
      path: "commodity/list/:id",
      name: "list",
      component: () =>
        import(/* webpackChunkName: "product" */ "./views/Detail.vue")
    }
  ]
});
