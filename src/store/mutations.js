import * as types from "./mutationTypes";
const mutations = {
  [types.SET_SHOW_FOOTER](state, flag) {
    state.showFooter = flag;
  },
  [types.SET_COUNT](state, num) {
    state.count = num;
  },
  [types.SET_IS_LOGIN](state, flag) {
    state.isLogin = flag;
  },
  [types.SET_USER_INFO](state, data) {
    state.userInfo = data;
  }
};
export default mutations;
