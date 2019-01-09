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
      path: "/detail/:id",
      name: "detail",
      component: () =>
        import(/* webpackChunkName: "detail" */ "./views/Detail.vue")
    },
    {
      path: "/order/checkout",
      name: "orderCheckout",
      component: () =>
        import(/* webpackChunkName: "OrderCheckout" */ "./views/OrderCheckout.vue")
    },
    {
      path: "/order/list",
      name: "orderList",
      component: () =>
        import(/* webpackChunkName: "OrderList" */ "./views/OrderList.vue")
    },
    {
      path: "/address/list",
      name: "addressList",
      component: () =>
        import(/* webpackChunkName: "addressList" */ "./views/AddressList.vue")
    },
    {
      path: "/address/edit",
      name: "addressEdit",
      component: () =>
        import(/* webpackChunkName: "addressEdit" */ "./views/AddressEdit.vue")
    }
  ]
});
