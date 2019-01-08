const host = " https://www.easy-mock.com/mock/5c2ef74a5802a5653fb28562/muxue";

const urls = {
  homePage: "/homePage",
  category: "/category",
  productView: "/product/productView",
  estDelivery: "/product/estDelivery",
  // 购物车
  cart: "/cart/index",
  cartEdit: "/cart/edit",
  cartSelCart: "/cart/selcart",
  cartDel: "/cart/del",
  cartClear: "/cart/clear",
  cartCount: "/cart/count"
};

for (let key in urls) {
  urls[key] = host + urls[key];
}
export default urls;
