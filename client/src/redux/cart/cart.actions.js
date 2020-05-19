import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
});

export const addItemToCartStart = (item) => ({
  type: CartActionTypes.ADD_ITEM_START,
  payload: item,
});

export const addItemToCartSuccess = (cartItems) => ({
  type: CartActionTypes.ADD_ITEM_SUCCESS,
  payload: cartItems,
});

export const addItemToCartFailure = (errorMessage) => ({
  type: CartActionTypes.ADD_ITEM_FAILURE,
  payload: errorMessage,
});

export const removeItemFromCartStart = (item) => ({
  type: CartActionTypes.REMOVE_ITEM_START,
  payload: item,
});

export const removeItemFromCartSuccess = (cartItems) => ({
  type: CartActionTypes.REMOVE_ITEM_SUCCESS,
  payload: cartItems,
});

export const removeItemFromCartFailure = (errorMessage) => ({
  type: CartActionTypes.REMOVE_ITEM_FAILURE,
  payload: errorMessage,
});

export const clearItemFromCartStart = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_START,
  payload: item,
});

export const clearItemFromCartSuccess = (cartItems) => ({
  type: CartActionTypes.CLEAR_ITEM_SUCCESS,
  payload: cartItems,
});

export const clearItemFromCartFailure = (errorMessage) => ({
  type: CartActionTypes.CLEAR_ITEM_FAILURE,
  payload: errorMessage,
});

export const loadCartStart = () => ({
  type: CartActionTypes.LOAD_CART_SUCCESS,
});
export const loadCartSuccess = (cartItems) => ({
  type: CartActionTypes.LOAD_CART_SUCCESS,
  payload: cartItems,
});

export const loadCartFailure = (errorMessage) => ({
  type: CartActionTypes.CLEAR_ITEM_FAILURE,
  payload: errorMessage,
});
