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

  const onSubmit = (data: registerForm) => {
    const { name, email, password, confirmPassword } = data;
    const api = new AuthService();
    api.register({ name, email, password });
  };

  return {
    form,
    onSubmit,
  };
};

export default RegisterForm;
