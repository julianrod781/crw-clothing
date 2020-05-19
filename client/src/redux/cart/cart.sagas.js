import {
  all,
  call,
  takeEvery,
  takeLatest,
  put,
  select,
} from "redux-saga/effects";

import UserActionTypes from "../user/user.types";
import {
  clearCart,
  addItemToCartFailure,
  addItemToCartSuccess,
  removeItemFromCartSuccess,
  removeItemFromCartFailure,
  loadCartSuccess,
  loadCartFailure,
} from "./cart.actions";
import CartActionTypes from "./cart.types";

import {
  addItemToFireStoreUserCart,
  removeItemFromFireStoreUserCart,
  clearItemFromFireStoreUserCart,
  getCurrentUserCart,
} from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../user/user.selector";
import { selectCartItems } from "./cart.selectors";
import { addOneToCartItem, removeOneFromCartItem } from "./cart.utils";

export function* loadCartOnSignIn() {
  try {
    const currentUser = yield select(selectCurrentUser);
    const cartItems = yield getCurrentUserCart(currentUser);
    yield put(loadCartSuccess(cartItems));
  } catch (error) {
    yield put(loadCartFailure(error.message));
  }
}

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* addItemCart(action) {
  let item = action.payload;

  try {
    const currentUser = yield select(selectCurrentUser);
    let cartItems = yield select(selectCartItems);

    item = addOneToCartItem(cartItems, item);

    cartItems = yield addItemToFireStoreUserCart(currentUser, item);
    yield put(addItemToCartSuccess(cartItems));
  } catch (error) {
    yield put(addItemToCartFailure(error.message));
  }
}

export function* removeItemCart(action) {
  let item = action.payload;
  try {
    const currentUser = yield select(selectCurrentUser);
    let cartItems = yield select(selectCartItems);

    item = removeOneFromCartItem(cartItems, item);

    cartItems = yield removeItemFromFireStoreUserCart(currentUser, item);
    yield put(removeItemFromCartSuccess(cartItems));
  } catch (error) {
    yield put(removeItemFromCartFailure(error.message));
  }
}

export function* clearItemFromCart(action) {
  let item = action.payload;
  try {
    const currentUser = yield select(selectCurrentUser);
    console.log(currentUser);

    let cartItems = yield clearItemFromFireStoreUserCart(currentUser, item);
    console.log(cartItems);

    yield put(removeItemFromCartSuccess(cartItems));
  } catch (error) {
    yield put(removeItemFromCartFailure(error.message));
  }
}

export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, loadCartOnSignIn);
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onAddItemStart() {
  yield takeEvery(CartActionTypes.ADD_ITEM_START, addItemCart);
}

export function* onRemoveItemStart() {
  yield takeLatest(CartActionTypes.REMOVE_ITEM_START, removeItemCart);
}

export function* onClearItemStart() {
  yield takeLatest(CartActionTypes.CLEAR_ITEM_START, clearItemFromCart);
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onAddItemStart),
    call(onRemoveItemStart),
    call(onClearItemStart),
    call(onSignInSuccess),
  ]);
}
