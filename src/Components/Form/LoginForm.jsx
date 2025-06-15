import React, { useEffect } from 'react';
import ButtonComponent from 'Components/Button/Button';
import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import SpinnerComponent from 'Components/Spinner/Spinner';
import JsonData from 'Views/Common/Common_utils/JsonData';
import { Inputfunctions } from 'ResuableFunctions/Inputfunctions';
import LinkComponent from 'Components/Router_components/LinkComponent';
import { LoginSuccessNavigateTo } from 'ResuableFunctions/LoginSuccessNavigateTo';
import { handleLogin } from 'Views/Common/Actions/Common_action';

const LoginForm = () => {
    const { commonState } = useCommonState();
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();
    const { jsxJson } = JsonData();

    useEffect(() => {
        if (commonState?.user_role) LoginSuccessNavigateTo(commonState?.data?.role, navigate)
    }, [commonState?.user_role])

    return (
        <div className="pb-3">
            <p className='text-primary'>Login</p>
            {Inputfunctions(jsxJson.login)}
            <LinkComponent to="/forgot-password" className="w-100 text-end d-inline-block mb-4" title="Forgot Password?" />

            <ButtonComponent
                type="button"
                className="btn-md btn-primary w-100"
                clickFunction={() => dispatch(handleLogin(commonState?.login_data, navigate))}
                title="Login"
                buttonName={commonState?.buttonSpinner ?
                    <SpinnerComponent />
                    :
                    "Login"
                }
                btnDisable={commonState?.buttonSpinner}
            />
        </div>
    )
}

export default LoginForm