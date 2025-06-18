import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import { update_login_data } from 'Views/Common/Slices/Common_slice';
import { handleLogin } from 'Views/Common/Actions/Common_action';

const JsonData = () => {
    //main selectors
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();
    const { commonState } = useCommonState();

    const jsonOnly = {

    }

    const jsxJson = {
        //                                                              Login                                                                  //
        login: [
            {
                name: "",
                type: "text",
                category: "input",
                placeholder: "Username",
                value: commonState?.login_data?.username || '',
                change: (e) => dispatch(update_login_data({ username: e.target.value })),
                keyDown: (e) => {
                    if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                },
                divClassName: "mb-3",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !commonState?.login_data?.username ? "username required" : null
            },
            {
                name: "",
                type: commonState?.login_data?.showPassword ? "text" : "password",
                category: "input",
                placeholder: "Password",
                className: "pe-5",
                value: commonState?.login_data?.password || '',
                change: (e) => dispatch(update_login_data({ password: e.target.value })),
                keyDown: (e) => {
                    if (e.key === 'Enter') dispatch(handleLogin(commonState?.login_data, navigate))
                },
                eyeFunction: () => dispatch(update_login_data({ showPassword: !commonState?.login_data?.showPassword })),
                eyeIcon: commonState?.login_data?.showPassword ? "hi" : "bye",
                divClassName: "mb-1",
                isMandatory: false,
                Err: commonState?.app_data?.validated && !commonState?.login_data?.password ? "password required" : null
            },
        ]
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData