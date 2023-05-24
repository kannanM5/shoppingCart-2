import { createStore } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../redux/reducer";
import countReducer from "../redux/count";
import reducer from "./reducer";

// const store = createStore(reducer);
// export default store;

const store = configureStore({
  reducer: {
    Data: dataReducer,
    count: countReducer,
  },
});
export default store;
