import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema, authForm } from "@/app/[auth]/login/schema";
import AuthService from "@/services/authService";

const AuthForm = () => {
  const form = useForm({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: authForm) => {
    const { email, password, rememberMe } = data;
    const api = new AuthService();
    // Lógica para lidar com 'lembrar-me'

    api.login({ email, password });
  };

  return {
    form,
    onSubmit,
  };
};

export default AuthForm;
