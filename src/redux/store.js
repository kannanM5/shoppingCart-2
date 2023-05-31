import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../redux/reducer";

const store = configureStore({
  reducer: {
    Data: dataReducer,
  },
});
export default store;
