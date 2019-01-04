import fetchData from "./fetch";
class HomePage {
  static fetchHomePage() {
    return fetchData("homePage");
  }
}

export default HomePage;
