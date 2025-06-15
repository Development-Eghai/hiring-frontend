import { decryptData, encryptData } from "Security/Crypto/Crypto";
import Cookies from 'js-cookie'
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    login_data: {},
    modal: {
        show: false,
        size: "md",
        from: null,
        type: null,
        close_btn: false
    },
    app_data: {
        canvasShow: false,
        isOnline: true,
        currentMenuName: '',
        innerWidth: 0,
        innerHeight: 0,
        buttonSpinner: false,
        token: Cookies.get("pixeel_advant_log") ? decryptData(Cookies.get("pixeel_advant_log"))?.access_token : '',
        refresh_token: Cookies.get("pixeel_advant_log") ? decryptData(Cookies.get("pixeel_advant_log"))?.refresh_token : '',
        user_role: Cookies.get("pixeel_advant_log") ? decryptData(Cookies.get("pixeel_advant_log"))?.role : '',
        user_id: Cookies.get('pixeel_advant_log') ? decryptData(Cookies.get("pixeel_advant_log"))?.user_id : '',
    },
    pagination: {
        currentPage: 1,
        totalCount: 0,
        siblingCount: 1,
    },
    search: {
        value: '',
        clicked: false,
    },
    error: {
        Err: null,
        Toast_Type: null
    },
}

const commonSlice = createSlice({
    name: 'common_slice',
    initialState,
    reducers: {
        updateModalShow(state, actions) {
            const { data } = actions.payload;
            state.modal.show = true
            state.modal.size = data?.modalSize || "md"
            state.modal.from = data?.modal_from || null
            state.modal.type = data?.modal_type || null
            state.modal.close_btn = data?.modal_close_btn || false
        },
        update_app_data(state, action) {
            const { type, data } = action.payload;
            switch (type) {
                case "canvas":
                    state.app_data.canvasShow = data || false;
                    break;
                case "internet_status":
                    state.app_data.isOnline = data || false;
                    break;
                case "menu_name":
                    state.app_data.currentMenuName = data || '';
                    break;
                case "dimension":
                    state.app_data.innerWidth = data?.innerWidth || 0;
                    state.app_data.innerHeight = data?.innerHeight || 0;
                    break;
                case "validation":
                    state.app_data.validated = data || false;
                    break;
                default:
                    return
            }
        },
        update_login_data(state, action) {
            const [key, value] = Object.entries(action.payload)[0] || [];
            state.login_data[key] = value || '';
        },
        update_error(state, action) {
            const { Err, Toast_Type } = action.payload || {};
            state.error.Err = Err || null;
            state.error.Toast_Type = Toast_Type || null;
        },

        //Api 
        login_reducer(state, actions) {
            const { type, data } = actions.payload || {};

            switch (type) {
                case "request":
                    state.app_data.buttonSpinner = true;
                    state.app_data.token = null;
                    state.app_data.refresh_token = null;
                    state.app_data.user_role = null;
                    break;
                case "response":
                    let update_cookie_log = {
                        access_token: data?.access_token || '',
                        refresh_token: data?.refresh_token || '',
                        role: data?.role || '',
                    }
                    const encrypted_logs = encryptData(update_cookie_log);
                    Cookies.set('pixeel_advant_log', encrypted_logs);

                    state.app_data.buttonSpinner = false;
                    state.app_data.token = data?.access_token || '';
                    state.app_data.refresh_token = data?.refresh_token || '';
                    state.app_data.user_role = data?.role || '';
                    break;
                case "failure":
                    state.app_data.buttonSpinner = false;
                    state.error.Err = data?.message || 'Login failed';
                    state.error.Toast_Type = data?.Toast_Type || "error";
                    break;
                default:
                    return
            }
        },
        logout(state, actions) {
            Cookies.remove("pixeel_advant_log");
            state.app_data.token = '';
            state.app_data.refresh_token = '';
            state.app_data.user_role = '';
            state.app_data.user_id = '';
        },

    },
    // extraReducers: (builder) => {
    //     builder

    // }
})

function setSuccessState(state, action) {
    let error_message = typeof action.payload === 'object' ? action.payload?.message : action.payload;
    state.Err = error_message;
    state.Toast_Type = "success";
}

function setErrorState(state, action) {
    let error_message = typeof action.payload === 'object' ? action.payload?.message : action.payload;
    state.Err = error_message;
    state.Toast_Type = "error";
}

const { actions, reducer } = commonSlice;

export const {
    update_login_data, update_app_data,
    update_error, login_reducer, logout,

} = actions;

export default reducer