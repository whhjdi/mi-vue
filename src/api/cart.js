import fetchData from "./fetch";
class Cart {
  static fetchCart() {
    return fetchData("cart");
  }
  static fetchCartEdit() {
    return fetchData("cartEdit");
  }
  static fetchCartSelCart() {
    return fetchData("cartSelCart");
  }
  static fetchCartClear() {
    return fetchData("cartClear");
  }
  static fetchCartDel() {
    return fetchData("cartDel");
  }
  static fetchCartCount() {
    return fetchData("cartCount");
  }
  static fetchCheckout() {
    return fetchData("checkout");
  }
}

export default Cart;
