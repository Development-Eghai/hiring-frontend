export function LoginSuccessNavigateTo(user_role, navigate) {
    switch (user_role) {
        case "Hiring Manager":
            return navigate("/hiring_manager/home");

        case "Recruiter":
            return navigate("/recruiter/dashboard");
            
        default:
            break;
    }
}