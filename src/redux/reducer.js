import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
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

      if (dataIndex > -1) {
        dataValue[dataIndex].Qty -= 1;
      }
    },
    addToCart: (state, action) => {
      let dataValue = [...state.data];
      let dataIndex = dataValue.findIndex(
        (ele) => parseInt(ele.product_id) === parseInt(action.payload)
      );
      if (dataIndex > -1) {
        dataValue[dataIndex].cartCount += 1;
      }
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
} = dataSlice.actions;
export default dataSlice.reducer;
