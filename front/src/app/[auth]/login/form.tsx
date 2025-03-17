import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useAuthStore from "@/store/auth";
import AuthService from "@/services/authService";
import { authFormSchema, authForm } from "@/app/[auth]/login/schema";

const AuthForm = () => {
  const { login } = useAuthStore();

  const form = useForm({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: authForm) => {
    try {
      const { email, password, rememberMe } = data;

      const api = new AuthService();
      // #TODO Lógica para lidar com 'lembrar-me'

      const token = await api.login({ email, password });
      login(token as string);
      window.location.href = "/home";
    } catch {
      form.reset();
    }
  };

  return {
    form,
    onSubmit,
  };
};

export default AuthForm;
