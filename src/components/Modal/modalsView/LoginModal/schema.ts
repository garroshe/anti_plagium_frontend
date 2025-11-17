import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Некоректна пошта").required("Введіть пошту"),
  password: yup.string().min(6, "Мінімум 6 символів").required("Введіть пароль"),
});

export const registerSchema = yup.object({
  loginName: yup.string().required("Введіть логін"),
  email: yup.string().email("Некоректна пошта").required("Введіть пошту"),
  password: yup.string().min(6, "Мінімум 6 символів").required("Введіть пароль"),
});

export type LoginForm = yup.InferType<typeof loginSchema>;
export type RegisterForm = yup.InferType<typeof registerSchema>;
