import { createSlice } from "@reduxjs/toolkit";
import { logDOM } from "@testing-library/react";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  cartItems: [],
  cartCount: 0,
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
    incrementCount: (state, action) => {
      let dataValue = [...state.data];
      let dataIndex = dataValue.findIndex(
        (ele) => parseInt(ele.product_id) === parseInt(action.payload)
      );

      if (dataIndex > -1) {
        dataValue[dataIndex].Qty += 1;
      }
    },
    decrementCount: (state, action) => {
      let dataValue = [...state.data];

      let dataIndex = dataValue.findIndex(
        (ele) => parseInt(ele.product_id) === parseInt(action.payload)
      );

      if (dataIndex > -1 && dataValue[dataIndex].Qty > 1) {
        dataValue[dataIndex].Qty -= 1;
      }
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

      console.log("------------------------------");

      const existingItem = state.cartItems.find(
        (item) => item.product_id == dataValue[ind].product_id
      );
      console.log(existingItem);
      if (existingItem) {
        // state.cartItems.map((item) => {
        // if (item.product_id === dataValue[ind].product_id) {
        console.log("true");

        // dataValue[ind].Qty++;
        // console.log(dataValue[ind].Qty++, "num");
        //   }
        // });
      } else {
        console.log("already");
        state.cartItems = [
          ...state.cartItems,
          { name, img_path, price, Qty, sub_Total },
        ];
      }

      console.log("------------------------------");

      // let ind = dataValue.findIndex(
      //   (ele) =>
      //     parseInt(ele.product_id) === parseInt(action.payload.product_id)
      // );

      // if (ind > -1) {
      //   dataValue[ind].viewStatus = 1;
      // }
    },
    viewToCart: (state, action) => {
      let dataValue = [...state.data];
      // localStorage.setItem("data", JSON.stringify(state.cartItems));
    },
    removeItem: (state, action) => {
      state.cartItems.splice(action.payload, 1);
      alert("Are you sure to remove the product from the cart?");
    },
    emptyCart: (state) => {
      state.cartItems.splice(0, state.cartItems.length);
      // localStorage.removeItem("data");
      state.cartCount = 0;
    },
  },
});

export const {
  fetchdataRequest,
  fetchdatasuccess,
  fetchdataFailure,
  incrementCount,
  decrementCount,
  addToCart,
  viewToCart,
  removeItem,
  emptyCart,
} = dataSlice.actions;
export default dataSlice.reducer;
