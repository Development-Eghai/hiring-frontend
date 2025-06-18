import React from 'react';
import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import JsonData from 'Views/Common/Common_utils/JsonData';
import { Inputfunctions } from 'ResuableFunctions/Inputfunctions';
import LinkComponent from 'Components/Router_components/LinkComponent';
import { handleLogin } from 'Views/Common/Actions/Common_action';
import ButtonSpinner from 'Components/Spinner/ButtonSpinner';

const LoginForm = () => {
    const { commonState } = useCommonState();
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();
    const { jsxJson } = JsonData();

    return (
        <div className="pb-3">
            <p className='text-primary'>Login</p>
            {Inputfunctions(jsxJson.login)}
            <LinkComponent to="/forgot-password" className="w-100 text-end d-inline-block mb-4" title="Forgot Password?" />

            <ButtonSpinner
                type="button"
                className="btn-md btn-primary w-100"
                clickFunction={() => dispatch(handleLogin(commonState?.login_data, navigate))}
                title={commonState?.app_data?.buttonSpinner ? "Logging in..." : "Login"}
                is_spinner={commonState?.app_data?.buttonSpinner}
            />
        </div>
    )
}

export default LoginForm