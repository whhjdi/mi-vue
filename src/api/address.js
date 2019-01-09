import fetchData from "./fetch";
class Address {
  static fetchAddressList() {
    return fetchData("addressList");
  }
  static fetchCheckout() {
    return fetchData("checkout");
  }
}

export default Address;
