import fetchData from "./fetch";
class Address {
  static fetchAddressList() {
    return fetchData("addressList");
  }
  static fetchCheckout() {
    return fetchData("checkout");
  }
  static fetchOrderList(type) {
    return fetchData("orderList", {
      params: {
        type
      }
    });
  }
}

export default Address;
