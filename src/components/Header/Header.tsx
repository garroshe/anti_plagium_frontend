import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useModal } from "../../context/modal-context.tsx";
import { useUser } from "../../context/user-context.tsx";
import { mapRoutes } from "../../router/map-routes.ts";
import UserProfileDropdown from "./components/UserProfile/UserProfile.tsx";
import {
  StyledHeader,
  StyledHeaderTitle,
  StyledHeaderWrapper,
  StyledHederTop,
  StyledLoginButton,
  StyledLogoType,
} from "./styled.tsx";

export const Header = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const { user } = useUser();

  return (
    <StyledHeader>
      <StyledHederTop>
        <StyledLogoType onClick={() => navigate(mapRoutes.main())}>Anti Plagium</StyledLogoType>
        {user ? (
          <UserProfileDropdown />
        ) : (
          <StyledLoginButton onClick={() => openModal({ modalName: "login" })}>Увійти</StyledLoginButton>
        )}
      </StyledHederTop>
      <StyledHeaderWrapper>
        <FileText size={window.innerWidth <= 768 ? 32 : 48} />
        <StyledHeaderTitle>Перевірка на плагіат</StyledHeaderTitle>
      </StyledHeaderWrapper>
    </StyledHeader>
  );
};
