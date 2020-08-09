import { ConstructionsService } from "../service/constructions.service";
import { PartnersService } from "../service/partners.service";

export const getOutdoorFurnitureData = () => {
  const request = () => ({ type: "GET_CONSTRUCTIONS_REQUEST" });
  const success = (data) => ({
    type: "GET_CONSTRUCTIONS_SUCCESS",
    payload: data,
  });
  console.log("hey");
  const failure = (err) => ({ type: "GET_CONSTRUCTIONS_FAILURE", error: err });
  return (dispatch) => {
    dispatch(request());
    ConstructionsService.get()
      .then((res) => dispatch(success(res.data)))
      .catch((err) => dispatch(failure(err)));
  };
};
export const getPartnersData = () => {
  const request = () => ({ type: "GET_PARTNERS_REQUEST" });
  const success = (data) => ({
    type: "GET_PARTNERS_SUCCESS",
    payload: data,
  });
  const failure = (err) => ({ type: "GET_PARTNERS_FAILURE", error: err });
  return (dispatch) => {
    dispatch(request());
    PartnersService.get()
      .then((res) => dispatch(success(res.data)))
      .catch((err) => dispatch(failure(err)));
  };
};
export const filterOutdoorTable = () => {
  const request = () => ({ type: "GET_CONSTRUCTIONS_REQUEST" });
  const success = (data) => ({
    type: "GET_CONSTRUCTIONS_SUCCESS",
    payload: data,
  });
  console.log("hey");
  const failure = (err) => ({ type: "GET_CONSTRUCTIONS_FAILURE", error: err });
  return (dispatch) => {
    dispatch(request());
    ConstructionsService.get()
      .then((res) => dispatch(success(res.data)))
      .then((res) => dispatch({ type: "FILTER_OUTDOOR_TABLE" }))
      .catch((err) => dispatch(failure(err)));
  };
};

export const filterPartners = () => {
  const request = () => ({ type: "GET_PARTNERS_REQUEST" });
  const success = (data) => ({
    type: "GET_PARTNERS_SUCCESS",
    payload: data,
  });
  console.log("hey");
  const failure = (err) => ({ type: "GET_PARTNERS_FAILURE", error: err });
  return (dispatch) => {
    dispatch(request());
    PartnersService.get()
      .then((res) => dispatch(success(res.data)))
      .then((res) => dispatch({ type: "FILTER_PARTNERS_TABLE" }))
      .catch((err) => dispatch(failure(err)));
  };
};

export const getOutdoorFurnitureFiltered = (fastSearch) => {
  const request = () => ({ type: "GET_CONSTRUCTIONS_REQUEST" });
  const success = (data) => ({
    type: "GET_CONSTRUCTIONS_SUCCESS",
    payload: data,
  });
  const failure = (err) => ({ type: "GET_CONSTRUCTIONS_FAILURE", error: err });
  return (dispatch) => {
    dispatch(request());
    ConstructionsService.get()
      .then((res) => {
        dispatch(success(res.data));
      })
      .then((res) => dispatch({ type: "SET_FAST_SEARCH", payload: fastSearch }))
      .catch((err) => dispatch(failure(err)));
  };
};
export const getPartnersFiltered = (fastSearch) => {
  const request = () => ({ type: "GET_PARTNERS_REQUEST" });
  const success = (data) => ({
    type: "GET_PARTNERS_SUCCESS",
    payload: data,
  });
  const failure = (err) => ({ type: "GET_PARTNERS_FAILURE", error: err });
  return (dispatch) => {
    dispatch(request());
    PartnersService.get()
      .then((res) => {
        dispatch(success(res.data));
      })
      .then((res) =>
        dispatch({ type: "SET_PARTNERS_FAST_SEARCH", payload: fastSearch })
      )
      .catch((err) => dispatch(failure(err)));
  };
};
export const getPartners = () => {
  return (dispatch) => {
    PartnersService.getPartners().then((res) =>
      dispatch({ type: "SET_CONTRAGENTS", payload: res.data })
    );
  };
};

export const getCities = () => {
  return (dispatch) => {
    ConstructionsService.getCities().then((res) =>
      dispatch({ type: "SET_CITIES", payload: res.data })
    );
  };
};
export const getDistricts = () => {
  return (dispatch) => {
    ConstructionsService.getDistricts().then((res) =>
      dispatch({ type: "SET_DISTRICTS", payload: res.data })
    );
  };
};
export const getPostalCodes = () => {
  return (dispatch) => {
    ConstructionsService.getPostalCodes().then((res) =>
      dispatch({ type: "SET_POSTALCODES", payload: res.data })
    );
  };
};
