import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  cartItems: [],
  cartCount: 0,
  wishlistCount: 0,
};

export const dataSlice = createSlice({
  name: "Data",
  initialState,
  reducers: {
    fetchdataRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchdatasuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchdataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    CountQty: (state, action) => {
      let dataValue = [...state.data];
      let dataIndex = dataValue.findIndex(
        (ele) => parseInt(ele.product_id) === parseInt(action.payload.id)
      );

      let cartValue = [...state.cartItems];
      let cartIndex = cartValue.findIndex(
        (ele) => parseInt(ele.product_id) === parseInt(action.payload.id)
      );

      if (dataIndex > -1) {
        if (action.payload.type === "INC") {
          dataValue[dataIndex].Qty += 1;
          state.cartItems[cartIndex].Qty += 1;
        } else if (
          action.payload.type === "DEC" &&
          dataValue[dataIndex].Qty > 1
        ) {
          dataValue[dataIndex].Qty -= 1;
          state.cartItems[dataIndex].Qty -= 1;
        }
      }

      let removeDollar = state.cartItems[cartIndex].price.substring(1);

      let sub_Total1 = parseInt(removeDollar * state.cartItems[cartIndex].Qty);
      state.cartItems[cartIndex].sub_Total = sub_Total1;
    },

    addToCart: (state, action) => {
      let dataValue = [...state.data];

      const { name, img_path, price, Qty, product_id } = action.payload;
      let sub_Total = parseInt(price.substring(1) * Qty);
      state.cartCount += 1;

      state.cartItems = [
        ...state.cartItems,
        { name, img_path, price, Qty, sub_Total, product_id },
      ];

      let ind = dataValue.findIndex(
        (ele) =>
          parseInt(ele.product_id) === parseInt(action.payload.product_id)
      );

      if (ind > -1) {
        dataValue[ind].viewStatus = 1;
      }
    },

    removeItem: (state, action) => {
      state.cartItems.splice(action.payload.index, 1);
      alert("Are you sure to remove the product from the cart?");
      state.cartCount -= 1;

      let dataValue = [...state.data];
      let dataIndex = dataValue.findIndex(
        (ele) => parseInt(ele.product_id) === parseInt(action.payload.id)
      );
      dataValue[dataIndex].Qty = 1;
      dataValue[dataIndex].viewStatus = 0;
    },
    emptyCart: (state, action) => {
      state.cartItems.splice(0, state.cartItems.length);
      state.cartCount = 0;
      let dataValue = [...state.data];
      let dataIndex = dataValue.findIndex(
        (ele) => parseInt(ele.product_id) === parseInt(action.payload)
      );

      dataValue[dataIndex].Qty = 1;
      dataValue[dataIndex].viewStatus = 0;
    },

    wishlist: (state, action) => {
      let dataValue = [...state.data];

      let dataIndex = dataValue.findIndex(
        (ele) => parseInt(ele.product_id) === parseInt(action.payload)
      );

      if (dataIndex > -1) {
        dataValue[dataIndex].wishlist = !dataValue[dataIndex].wishlist;
      }

      if (dataValue[dataIndex].wishlist) {
        state.wishlistCount += 1;
      } else {
        state.wishlistCount -= 1;
      }
    },
  },
});

export const {
  fetchdataRequest,
  fetchdatasuccess,
  fetchdataFailure,
  CountQty,
  addToCart,
  removeItem,
  emptyCart,
  wishlist,
} = dataSlice.actions;
export default dataSlice.reducer;
