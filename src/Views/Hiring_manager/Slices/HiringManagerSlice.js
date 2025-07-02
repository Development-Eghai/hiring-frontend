// import { createSlice } from "@reduxjs/toolkit";

// const hiring_managerSlice = createSlice({
//     name: "hiring_manager",
//     initialState: {
//         isLoading: false,
//         reporting: {}
//     },
//     reducers: {
//         getReportingData: (state, action) => {
//             const { type, data } = action.payload;
//             switch (type) {
//                 case "request":
//                     state.isLoading = true;
//                     state.reporting = {};
//                     break;
//                 case "response":
//                     state.isLoading = false;
//                     state.reporting = data;
//                     break;
//                 case "failure":
//                     state.isLoading = false;
//                     state.reporting = {};
//                     break;
//                 default:
//                     break;
//             }
//         }
//     },

// });

// const { actions, reducer } = hiring_managerSlice;

// export const {
//     getReportingData,

// } = actions;

// export default reducer;

// src/Slices/hiringSlices.js

import { createSlice } from "@reduxjs/toolkit";

const hiring_managerSlice = createSlice({
  name: "hiring_manager",
  initialState: {
    isLoading: false,
    reporting: {},
  },
  reducers: {
    getReportingData: (state, action) => {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.isLoading = true;
          state.reporting = {};
          break;
        case "response":

          let new_data = {};

if (Array.isArray(data?.data) && data.data.length) {
  new_data = {
    ...data,
    data: data.data.map((item, ind) => ({ ...item, s_no: ind + 1 })),
  };
} else {
  new_data = data;
}



          state.isLoading = false;
          state.reporting = new_data;

          break;
        case "failure":
          state.isLoading = false;
          state.reporting = {};
          break;
        default:
          break;
      }
    },
  },
});

const Planning_Screen = createSlice({
  name: "Planning_Screen",
  initialState: {
    isLoading: false,
    reporting: {},
  },
  reducers: {
    getPlanningScreen: (state, action) => {
      const { type, data } = action.payload;
      switch (type) {
        case "request":
          state.isLoading = true;
          state.reporting = {};
          break;
        case "response":
          state.isLoading = false;
          state.reporting = data;
          break;
        case "failure":
          state.isLoading = false;
          state.reporting = {};
          break;
        default:
          break;
      }
    },
  },
});

export const { getReportingData } = hiring_managerSlice.actions;
export const { getPlanningScreen } = Planning_Screen.actions;

export const hiringManagerReducer = hiring_managerSlice.reducer;
export const planningScreenReducer = Planning_Screen.reducer;
