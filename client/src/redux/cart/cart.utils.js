export const addOneToCartItem = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );
  if (existingCartItem) {
    cartItemToAdd.quantity = existingCartItem.quantity + 1;
  } else {
    cartItemToAdd.quantity = 1;
  }

  return cartItemToAdd;
};

export const removeOneFromCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (!existingCartItem || existingCartItem.quantity < 1) {
    cartItemToRemove.quantity = 0;
  } else {
    cartItemToRemove.quantity = existingCartItem.quantity - 1;
  }

  return cartItemToRemove;
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (!existingCartItem) {
    return cartItems;
  } else if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
