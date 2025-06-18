import axios from 'axios';
import { LoginSuccessNavigateTo } from 'ResuableFunctions/LoginSuccessNavigateTo';
import {
    update_app_data, updateToast, updateToken,
    login_reducer

} from 'Views/Common/Slices/Common_slice';

const BASE_URL = process.env.REACT_APP_API_URL || '';

// login api 
export const handleLogin = (login_data, navigate) => async (dispatch) => {
    let username = login_data?.username || '';
    let password = login_data?.password || '';
    if (!username || !password) return dispatch(update_app_data({ type: "validation", data: true }));
    try {
        dispatch(login_reducer({ type: 'request' }))
        const res = await axios.post(`${BASE_URL}/login/`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(`${username}:${password}`)}`
            }
        });

        if (res.status === 200) {
            dispatch(login_reducer({ type: 'response', data: res?.data }))
            LoginSuccessNavigateTo(res?.data?.role, navigate)
        }
        else dispatch(login_reducer({ type: 'failure', data: { message: res?.data?.message, type: "error" } }))
    } catch (err) {
        dispatch(login_reducer({ type: 'failure', data: { message: err?.message, type: "error" } }))
    }
}



//refresh token
export const handlerefreshToken = (refresh_token) => async (dispatch) => {
    return
    try {
        const { data } = await axios.get(`/refresh_token`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refresh_token}`,
            }
        });

        if (data?.error_code === 200) dispatch(updateToken(data?.data?.access_token))
        else dispatch(updateToast({ message: data?.message, type: "error" }))
    } catch (err) {
        dispatch(updateToast({ message: err?.message, type: "error" }))
    }
}