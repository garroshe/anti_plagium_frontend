import { LoginModal } from "./modalsView/LoginModal/ModalLogin.tsx";
import { ProfileSettingsModal } from "./modalsView/ProfileSettingsModal/ProfileSettingsModal.tsx";

export const modalMap = {
  login: LoginModal,
  profileSettings: ProfileSettingsModal,
} as const;
