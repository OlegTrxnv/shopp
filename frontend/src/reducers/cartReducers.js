import {
  CART_ADD_ITEM,
  CART_CHANGE_QTY,
  CART_REMOVE_ITEM,
  CART_CLEAR,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_RESET,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existInCart =
        state.cartItems.findIndex((inCart) => inCart.product === item.product) +
        1;

      if (existInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((inCart) =>
            inCart.product === item.product
              ? { ...item, qty: item.qty + inCart.qty }
              : inCart
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_CHANGE_QTY:
      const changed = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((inCart) =>
          inCart.product === changed.product
            ? { ...inCart, qty: changed.qty }
            : inCart
        ),
      };

    case CART_REMOVE_ITEM:
      const removed = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (inCart) => inCart.product !== removed.product
        ),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_CLEAR:
      return {
        ...state,
        cartItems: [],
      };

    case CART_RESET:
      return {
        cartItems: [],
        shippingAddress: {},
      };

    default:
      return state;
  }
};
