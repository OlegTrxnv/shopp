import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_RESET,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS: {
      return {
        order: action.payload,
        success: true,
        loading: false,
      };
    }
    case ORDER_CREATE_FAIL: {
      return {
        error: action.payload,
        loading: false,
      };
    }
    case ORDER_CREATE_RESET: {
      return {};
    }
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = {
    order: {
      orderItems: [],
      user: {},
      shippingAddress: {},
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    },
  },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS: {
      return {
        order: action.payload,
        loading: false,
      };
    }
    case ORDER_DETAILS_FAIL: {
      return {
        error: action.payload,
        loading: false,
      };
    }
    case ORDER_DETAILS_RESET: {
      return {
        order: {
          orderItems: [],
          user: {},
          shippingAddress: {},
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      };
    }
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS: {
      return {
        success: true,
        loading: false,
      };
    }
    case ORDER_PAY_FAIL: {
      return {
        error: action.payload,
        loading: false,
      };
    }
    case ORDER_PAY_RESET: {
      return {};
    }

    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_MY_SUCCESS: {
      return {
        orders: action.payload,
        loading: false,
      };
    }
    case ORDER_LIST_MY_FAIL: {
      return {
        error: action.payload,
        loading: false,
      };
    }
    case ORDER_LIST_MY_RESET: {
      return {
        orders: [],
      };
    }
    default:
      return state;
  }
};
