import * as types from "./mutationTypes";
import Cart from "../api/cart.js";
export const cartCount = async function({ commit }) {
  const res = await Cart.getCartCount();
  commit(types.SET_COUNT, res.data);
};
