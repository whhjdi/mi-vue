import urls from "./index";

function fetchData(api, data) {
  return new Promise((resolve, reject) => {
    axios
      .get(urls[api], data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default fetchData;
