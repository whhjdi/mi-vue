import * as types from "./mutationTypes";
const mutations = {
  [types.SET_SHOW_FOOTER](state, flag) {
    state.showFooter = flag;
  },
  [types.SET_COUNT](state, num) {
    state.count = num;
  }
};
export default mutations;
