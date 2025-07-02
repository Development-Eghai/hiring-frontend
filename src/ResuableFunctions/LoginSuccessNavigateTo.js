export function LoginSuccessNavigateTo(user_role, navigate) {
    switch (user_role) {
        case "Hiring Manager":
            return navigate("/hiring_manager/home");

        case "recruiter":
            navigate("/recruiter");
            break;
            
        default:
            break;
    }
}