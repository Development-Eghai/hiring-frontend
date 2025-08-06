export function LoginSuccessNavigateTo(user_role, navigate) {
    console.log(user_role,"Czxcxa")
    switch (user_role) {
        case "Hiring Manager":
            return navigate("/hiring_manager/dashboard");
        case "Recruiter":
            return navigate("/recruiter/dashboard");
        case "Business Ops" :
            return navigate("/business_ops/dashboard")
        case "Interviewer" :
            return navigate("/interviewer/dashboard")
        case "Vendor":
            return navigate("/vendor/dashboard")
        default:
            break;
    }
}