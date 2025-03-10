"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import registerForm from "./form";
import Link from "next/link";

const RegisterPage = () => {
  const { form, onSubmit } = registerForm();

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Cadastre-se</CardTitle>
        <CardDescription>
          Crie uma conta para começar a usar nosso serviço.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Nome
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FontAwesomeIcon icon={faLock} className="mr-2" />
                    Senha
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FontAwesomeIcon icon={faLock} className="mr-2" />
                    Confirmar Senha
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirme sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
            <div className="text-center">
              <Link
                href="/auth/login"
                className="text-sm text-primary hover:underline"
              >
                Já tem uma conta? Faça login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex items-center w-full gap-4">
          <Separator className="flex-1" />
          <span className="text-sm text-muted-foreground">OU</span>
          <Separator className="flex-1" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => console.log("Cadastro com Google")}
          >
            <FontAwesomeIcon icon={faGoogle} /> Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => console.log("Cadastro com GitHub")}
          >
            <FontAwesomeIcon icon={faGithub} /> GitHub
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
