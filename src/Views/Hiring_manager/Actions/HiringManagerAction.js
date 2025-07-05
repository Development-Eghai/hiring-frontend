// import axiosInstance from 'Services/axiosInstance';
// import {
//     getReportingData,getPlanningScreen
// } from 'Views/Hiring_manager/Slices/HiringManagerSlice';


// export const HandleGetReportingData = (params) => async (dispatch) => {
//     try {
//         dispatch(getReportingData({ type: "request" }));
//         const { data } = await axiosInstance.post('/api/jobrequisition-dynamic/', params);

//         if (data?.error_code === 200) dispatch(getReportingData({ type: "response", data: data?.data }));
//         else dispatch(getReportingData({ type: "failure", message: data?.message || "" }));
//     } catch (Err) {
//         dispatch(getReportingData({ type: "failure", message: Err?.message || "" }))
//     }
// }


import axiosInstance from 'Services/axiosInstance';
import {
  getReportingData,
  getPlanningScreen
} from 'Views/Hiring_manager/Slices/HiringManagerSlice';


export const HandleGetReportingData = (params) => async (dispatch) => {
  try {
    dispatch(getReportingData({ type: "request" }));
    
    const { data } = await axiosInstance.post('/api/jobrequisition-dynamic/', params);

    if (data?.error_code === 200) {
      dispatch(getReportingData({ type: "response", data: data?.data }));
    } else {
      dispatch(getReportingData({ type: "failure", message: data?.message || "Unknown error" }));
    }
  } catch (err) {
    dispatch(getReportingData({ type: "failure", message: err?.message || "Network error" }));
  }
};


export const HandleGetPlanningScreen = (params) => async (dispatch) => {
  try {
    dispatch(getPlanningScreen({ type: "request" }));
    
    const { data } = await axiosInstance.post('/api/hiring-plans/', params);

    if (data?.error_code === 200) {
      dispatch(getPlanningScreen({ type: "response", data: data?.data }));
    } else {
      dispatch(getPlanningScreen({ type: "failure", message: data?.message || "Unknown error" }));
    }
  } catch (err) {
    dispatch(getPlanningScreen({ type: "failure", message: err?.message || "Network error" }));
  }
};
