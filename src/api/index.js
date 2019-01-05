const host = " https://www.easy-mock.com/mock/5c2ef74a5802a5653fb28562/muxue";

const urls = {
  homePage: "/homePage",
  category: "/category"
};

for (let key in urls) {
  urls[key] = host + urls[key];
}
export default urls;
