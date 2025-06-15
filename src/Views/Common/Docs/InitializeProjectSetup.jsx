import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { update_error } from '../Slices/Common_slice';
import { CustomUseLocationHook, useCommonState, useDispatch, useSize } from 'Components/CustomHooks';
import { update_app_data } from 'Views/Common/Slices/Common_slice';

export const InitializeProjectSetup = () => {
    const { commonState } = useCommonState();
    const sizer = useSize();
    const dispatch = useDispatch();
    const location = CustomUseLocationHook();

    useEffect(() => {
        dispatch(update_app_data({ type: 'internet_status', data: navigator.onLine }))
        dispatch(update_app_data({ type: "dimension", data: sizer }))
    }, [])

    window.addEventListener('online', () => {
        dispatch(update_app_data({ type: 'internet_status', data: true }))
    });
    window.addEventListener('offline', () => {
        dispatch(update_app_data({ type: 'internet_status', data: false }))
    });

    useEffect(() => {
        if (commonState?.error?.Err) {
            toast(commonState?.error?.Err, {
                position: "top-right",
                type: commonState?.error?.Toast_Type,
                onOpen: () => dispatch(update_error({})),
                autoClose: 1600
            })
            return
        }
    }, [commonState?.error?.Err])

    useEffect(() => {
        const currentLocation = location[location.length - 1]
        if (location?.length) {
            if (currentLocation) {
                if (commonState?.app_data?.currentMenuName !== currentLocation) dispatch(update_app_data({ type: "menu_name", data: currentLocation }))
            }
        }
    }, [location])

    return commonState?.app_data?.isOnline ?
        <Outlet />
        :
        <p>No internet connection</p>
}