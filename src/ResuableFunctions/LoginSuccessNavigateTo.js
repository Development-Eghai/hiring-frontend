export function LoginSuccessNavigateTo(user_role, navigate) {
    switch (user_role) {
        case "Hiring Manager":
            return navigate("/hiring_manager/dashboard");

        case "Recruiter":
            return navigate("/recruiter/dashboard");
        case "Business Ops" :
            return navigate("/business_ops/dashboard")
        default:
            break;
    }
}