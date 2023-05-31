import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  cartItems: [],
  cartCount: 0,
  wishlistCount: 0,
};

const findIndexById = (array, id) => {
  return array.findIndex((item) => parseInt(item.product_id) === parseInt(id));
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
      let cartValue = [...state.cartItems];
      const { id, type } = action.payload;

      let dataIndex = findIndexById(dataValue, id);
      let cartIndex = findIndexById(cartValue, id);

      if (dataIndex > -1) {
        if (type === "INC") {
          dataValue[dataIndex].Qty += 1;
        } else if (type === "DEC" && dataValue[dataIndex].Qty > 1) {
          dataValue[dataIndex].Qty -= 1;
        }
      
      if (cartIndex > -1) {
        if (type === "INC") {
          cartValue[cartIndex].Qty += 1;
        } else if (type === "DEC" && cartValue[cartIndex].Qty > 1) {
          cartValue[cartIndex].Qty -= 1;
        }

      let removeDollar = cartValue[cartIndex].price.substring(1);
      let sub_Total1 = parseInt(removeDollar * cartValue[cartIndex].Qty);
      cartValue[cartIndex].sub_Total = sub_Total1;
      }
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

      let dataIndex = findIndexById(dataValue, action.payload.product_id);

      if (dataIndex > -1) {
        dataValue[dataIndex].viewStatus = 1;
      }
    },

    removeItem: (state, action) => {
      let dataValue = [...state.data];
      state.cartItems.splice(action.payload.index, 1);
      alert("Are you sure to remove the product from the cart?");
      state.cartCount -= 1;

      let dataIndex = findIndexById(dataValue, action.payload.id);
      dataValue[dataIndex].Qty = 1;
      dataValue[dataIndex].viewStatus = 0;
    },
    emptyCart: (state, action) => {
      let dataValue = [...state.data];
      state.cartItems.splice(0, state.cartItems.length);
      state.cartCount = 0;
   
      let dataIndex = findIndexById(dataValue, action.payload);

      dataValue[dataIndex].Qty = 1;
      dataValue[dataIndex].viewStatus = 0;
    },

    wishlist: (state, action) => {
      let dataValue = [...state.data];
      let dataIndex = findIndexById(dataValue, action.payload);

      if (dataIndex > -1) {
        dataValue[dataIndex].wishlist = !dataValue[dataIndex].wishlist;
      }

      dataValue[dataIndex].wishlist
        ? (state.wishlistCount += 1)
        : (state.wishlistCount -= 1);
    },
  },
});

export const { fetchdataRequest, fetchdatasuccess,fetchdataFailure,CountQty,
               addToCart,removeItem, emptyCart, wishlist} = dataSlice.actions;
export default dataSlice.reducer;
