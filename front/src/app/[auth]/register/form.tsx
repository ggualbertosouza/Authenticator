import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerFormSchema, registerForm } from "./schema";
import AuthService from "@/services/authService";

const RegisterForm = () => {
  const form = useForm<registerForm>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: registerForm) => {
    const { name, email, password } = data;

    try {
      const api = new AuthService();
      await api.register({ name, email, password });

      window.location.href = "/auth/login";
    } catch {
      form.reset();
    }
  };

  return {
    form,
    onSubmit,
  };
};

export default RegisterForm;
