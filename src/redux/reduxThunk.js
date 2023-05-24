// // dataActions.js
// import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from "./reducer";
// import { fetchData } from "./thunk";

// export const fetchDataFromAPI = () => async (dispatch) => {
//   try {
//     dispatch(fetchDataStart());

//     const data = await fetchData();

//     dispatch(fetchDataSuccess(data));
//   } catch (error) {
//     dispatch(fetchDataFailure(error.message));
//   }
// };
