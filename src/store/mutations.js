import * as types from "./mutationTypes";
const mutations = {
  [types.SET_SHOW_FOOTER](state, flag) {
    state.showFooter = flag;
  }
};
export default mutations;
