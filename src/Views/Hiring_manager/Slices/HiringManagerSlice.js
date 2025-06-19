import { createSlice } from "@reduxjs/toolkit";

const hiring_managerSlice = createSlice({
    name: "hiring_manager",
    initialState: {
        isLoading: false,
        reporting: {}
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
        }
    }
});

const { actions, reducer } = hiring_managerSlice;

export const {
    getReportingData
    
} = actions;

export default reducer;