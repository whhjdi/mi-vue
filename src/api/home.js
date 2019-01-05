import fetchData from "./fetch";
class HomePage {
  static fetchHomePage() {
    return fetchData("homePage");
  }
  static fetchCategory() {
    return fetchData("category");
  }
  static productView() {
    return fetchData("productView");
  }
}

export default HomePage;
