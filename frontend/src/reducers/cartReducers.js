import {
  CART_ADD_ITEM,
  CART_CHANGE_QTY,
  CART_REMOVE_ITEM,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
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

    default:
      return state;
  }
};

// export const cartReducer = (state = { cartItems: [] }, action) => {
//   switch (action.type) {
//     case CART_ADD_ITEM:
//       const item = action.payload;

//       const existItem = state.cartItems.find((x) => x.product === item.product);

//       if (existItem) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((x) =>
//             x.product === existItem.product ? item : x
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           cartItems: [...state.cartItems, item],
//         };
//       }

//     default:
//       return state;
//   }
// };
