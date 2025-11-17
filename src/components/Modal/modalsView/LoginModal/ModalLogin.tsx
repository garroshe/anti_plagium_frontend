import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Spin } from "antd";
import { Controller, useForm } from "react-hook-form";

import { useAuth } from "../../../../hooks/use-auth";
import { InputUI } from "../../../ui/InputUI/InputUI";
import { PasswordUI } from "../../../ui/PasswordUI/PasswordUI";
import { loginSchema, registerSchema, type LoginForm, type RegisterForm } from "./schema";
import { StyledAuthContainer, StyledLoginForm, StyledSocialButtons, StyledToggleButton } from "./styled";

export const LoginModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const { signInWithEmail, signUp, signInWithGoogle, loading, error } = useAuth();

  // ---------------- LOGIN FORM ----------------
  const {
    control: loginControl,
    handleSubmit: handleLoginSubmit,
    reset: resetLogin,
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onLoginSubmit = async (values: LoginForm) => {
    await signInWithEmail(values.email, values.password);
  };

  // ---------------- REGISTER FORM ----------------
  const {
    control: registerControl,
    handleSubmit: handleRegisterSubmit,
    reset: resetRegister,
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      loginName: "",
      email: "",
      password: "",
    },
  });

  const onRegisterSubmit = async (values: RegisterForm) => {
    await signUp(values.email, values.password, name, lastName, values.loginName);
  };

  // переключення вкладок
  const toggleForm = (login: boolean) => {
    setIsLogin(login);
    resetLogin();
    resetRegister();
    setName("");
    setLastName("");
  };

  return (
    <StyledAuthContainer>
      <StyledToggleButton>
        <Button type={isLogin ? "primary" : "default"} onClick={() => toggleForm(true)} style={{ marginRight: 8 }}>
          Вхід
        </Button>
        <Button type={!isLogin ? "primary" : "default"} onClick={() => toggleForm(false)}>
          Реєстрація
        </Button>
      </StyledToggleButton>

      {error && <div style={{ color: "red", margin: "6px 0" }}>{error}</div>}

      {isLogin ? (
        // ---------------- LOGIN ----------------
        <StyledLoginForm onSubmit={handleLoginSubmit(onLoginSubmit)}>
          {/* EMAIL */}
          <Controller
            name="email"
            control={loginControl}
            render={({ field, fieldState }) => (
              <InputUI {...field} placeholder="Ваша пошта" error={fieldState.error?.message} />
            )}
          />

          {/* PASSWORD */}
          <Controller
            name="password"
            control={loginControl}
            render={({ field, fieldState }) => (
              <PasswordUI
                value={field.value}
                onChange={field.onChange}
                placeholder="Ваш пароль"
                error={fieldState.error?.message}
              />
            )}
          />

          <Button htmlType="submit" type="primary" block disabled={loading}>
            Увійти {loading && <Spin />}
          </Button>
        </StyledLoginForm>
      ) : (
        // ---------------- REGISTER ----------------
        <StyledLoginForm onSubmit={handleRegisterSubmit(onRegisterSubmit)}>
          {/* NAME */}
          <InputUI
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше ім'я"
          />

          {/* LASTNAME */}
          <InputUI
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Ваше прізвище"
          />

          {/* LOGIN */}
          <Controller
            name="loginName"
            control={registerControl}
            render={({ field, fieldState }) => (
              <InputUI {...field} placeholder="Ваш логін" error={fieldState.error?.message} />
            )}
          />

          {/* EMAIL */}
          <Controller
            name="email"
            control={registerControl}
            render={({ field, fieldState }) => (
              <InputUI {...field} placeholder="Ваша пошта" error={fieldState.error?.message} />
            )}
          />

          {/* PASSWORD */}
          <Controller
            name="password"
            control={registerControl}
            render={({ field, fieldState }) => (
              <PasswordUI
                value={field.value}
                onChange={field.onChange}
                placeholder="Ваш пароль"
                error={fieldState.error?.message}
              />
            )}
          />

          <Button htmlType="submit" type="primary" block disabled={loading}>
            Зареєструватися {loading && <Spin />}
          </Button>
        </StyledLoginForm>
      )}

      <Divider>Або</Divider>

      <StyledSocialButtons>
        <Button onClick={signInWithGoogle} block style={{ marginBottom: 8 }}>
          Вхід через Google {loading && <Spin />}
        </Button>
      </StyledSocialButtons>
    </StyledAuthContainer>
  );
};
