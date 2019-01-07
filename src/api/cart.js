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
  static fetchCartSelService() {
    return fetchData("cartSelService");
  }
  static fetchCartDel() {
    return fetchData("cartDel");
  }
  static fetchCartAdd() {
    return fetchData("cartAdd");
  }
  static fetchCartCount() {
    return fetchData("cartCount");
  }
}

export default Cart;
