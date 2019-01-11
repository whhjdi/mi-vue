import fetchData from "./fetch";
class User {
  static fetchInfo() {
    return fetchData("info");
  }
  static fetchLogin(data) {
    return fetchData("login", {
      params: { data }
    });
  }
  static fetchLogout() {
    return fetchData("logout");
  }
  static fetchCode() {
    return fetchData("code");
  }
}

export default User;
