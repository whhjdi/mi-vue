import fetchData from "./fetch";
class Address {
  static fetchAddressList() {
    return fetchData("addressList");
  }
}

export default Address;
