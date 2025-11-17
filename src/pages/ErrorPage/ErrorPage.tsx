import {StyledButton, StyledError, StyledErrorPage, StyledTitle} from "./styled.tsx";
import {useNavigate} from "react-router-dom";
import {mapRoutes} from "../../router/map-routes.ts";

export const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <StyledErrorPage>
            <StyledError>404</StyledError>
            <StyledTitle>Йой! Щось пішло не так...</StyledTitle>
            <StyledButton onClick={() => navigate(mapRoutes.main())}>Вертайся назад</StyledButton>
        </StyledErrorPage>
    )
}