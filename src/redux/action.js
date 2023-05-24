export const FETCHDATA_REQUEST = "FETCHDATA_REQUEST";
export const FETCHDATA_SUCCESS = "FETCHDATA_SUCCESS";
export const FETCHDATA_FAILURE = "FETCHDATA_FAILURE";

export const fetchdataRequest = () => {
  return {
    type: FETCHDATA_REQUEST,
  };
};

export const fetchdatasuccess = (value) => {
  return {
    type: FETCHDATA_SUCCESS,
    payload: value,
  };
};
export const fetchdataFailure = (error) => {
  return {
    type: FETCHDATA_FAILURE,
    payload: error,
  };
};
