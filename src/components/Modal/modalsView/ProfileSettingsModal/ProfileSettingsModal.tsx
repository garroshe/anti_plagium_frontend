import { useEffect, useMemo, useState } from "react";
import { Button } from "antd";

import { userService } from "../../../../bus/user/service/userService.ts";
import { useModal } from "../../../../context/modal-context.tsx";
import { useUser } from "../../../../context/user-context.tsx";
import { InputUI } from "../../../ui/InputUI/InputUI";
import { AvatarPreview, FeedbackText, StyledActions, StyledLabel, StyledProfileForm, StyledProfileWrapper } from "./styled";

type ProfileFormState = {
  avatar: string;
  userName: string;
  lastName: string;
  loginName: string;
};

const EMPTY_STATE: ProfileFormState = {
  avatar: "",
  userName: "",
  lastName: "",
  loginName: "",
};

export const ProfileSettingsModal = () => {
  const { user, refreshUser } = useUser();
  const { closeModal } = useModal();
  const [formState, setFormState] = useState<ProfileFormState>(EMPTY_STATE);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (user) {
      setFormState({
        avatar: user.avatar || "",
        userName: user.userName || "",
        lastName: user.lastName || "",
        loginName: user.loginName || "",
      });
    } else {
      setFormState(EMPTY_STATE);
    }
  }, [user]);

  const handleChange =
    (field: keyof ProfileFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormState((prev) => ({ ...prev, [field]: value }));
    };

  const isSaveDisabled = useMemo(() => {
    if (!user?.uid) return true;
    if (!formState.userName.trim() || !formState.loginName.trim()) return true;
    return loading;
  }, [formState.loginName, formState.userName, loading, user?.uid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;
    setLoading(true);
    setFeedback(null);

    try {
      const response = await userService.updateUser({
        uid: user.uid,
        data: {
          avatar: formState.avatar || null,
          userName: formState.userName.trim(),
          lastName: formState.lastName.trim(),
          loginName: formState.loginName.trim(),
        },
      });

      if (response.error) {
        throw response.error;
      }

      await refreshUser();
      setFeedback({ type: "success", message: "Зміни збережено" });
      setTimeout(() => {
        closeModal();
      }, 600);
    } catch (error) {
      console.error(error);
      setFeedback({ type: "error", message: "Не вдалося зберегти. Спробуйте ще раз." });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <StyledProfileWrapper>
        <h2>Налаштування профілю</h2>
        <p>Увійдіть у систему, щоб редагувати профіль.</p>
      </StyledProfileWrapper>
    );
  }

  return (
    <StyledProfileWrapper>
      <h2>Налаштування профілю</h2>
      <StyledProfileForm onSubmit={handleSubmit}>
        <div>
          <StyledLabel>Аватар</StyledLabel>
          <AvatarPreview>
            <img src={formState.avatar || user?.avatar || "https://placehold.co/64x64"} alt="avatar preview" />
            <InputUI value={formState.avatar} onChange={handleChange("avatar")} placeholder="URL зображення" />
          </AvatarPreview>
        </div>

        <div>
          <StyledLabel>Ім’я</StyledLabel>
          <InputUI value={formState.userName} onChange={handleChange("userName")} placeholder="Вкажіть ім’я" />
        </div>

        <div>
          <StyledLabel>Прізвище</StyledLabel>
          <InputUI value={formState.lastName} onChange={handleChange("lastName")} placeholder="Вкажіть прізвище" />
        </div>

        <div>
          <StyledLabel>Нікнейм</StyledLabel>
          <InputUI value={formState.loginName} onChange={handleChange("loginName")} placeholder="Вкажіть нік" />
        </div>

        {feedback && <FeedbackText $type={feedback.type}>{feedback.message}</FeedbackText>}

        <StyledActions>
          <Button onClick={closeModal}>Скасувати</Button>
          <Button type="primary" htmlType="submit" loading={loading} disabled={isSaveDisabled}>
            Зберегти
          </Button>
        </StyledActions>
      </StyledProfileForm>
    </StyledProfileWrapper>
  );
};

