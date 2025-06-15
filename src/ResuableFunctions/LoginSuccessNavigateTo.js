export function LoginSuccessNavigateTo(user_role, navigate) {

    switch (user_role) {
        case "admin":
            navigate("/admin_dashboard");
            break;

        case "user":
            navigate("/user_dashboard");
            break;
            
        default:
            break;
    }
}