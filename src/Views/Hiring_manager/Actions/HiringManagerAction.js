import axiosInstance from 'Services/axiosInstance';
import {
    getReportingData
} from 'Views/Hiring_manager/Slices/HiringManagerSlice';


export const HandleGetReportingData = (params) => async (dispatch) => {
    try {
        dispatch(getReportingData({ type: "request" }));
        const { data } = await axiosInstance.post('/api/jobrequisition-dynamic/', params);

        if (data?.error_code === 200) dispatch(getReportingData({ type: "response", data: data?.data }));
        else dispatch(getReportingData({ type: "failure", message: data?.message || "" }));
    } catch (Err) {
        dispatch(getReportingData({ type: "failure", message: Err?.message || "" }))
    }
}