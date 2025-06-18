export function LoginSuccessNavigateTo(user_role, navigate) {
    switch (user_role) {
        case "Hiring Manager":
            return navigate("/hiring_manager/home");

        case "user":
            navigate("/user_dashboard");
            break;
            
        default:
            break;
    }
}