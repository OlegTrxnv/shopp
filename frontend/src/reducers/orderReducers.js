import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
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
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: "",
    loading: true,
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
    default:
      return state;
  }
};
