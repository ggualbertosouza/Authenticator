"use client";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

import AuthForm from "./form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const LoginPage = () => {
  const { form, onSubmit } = AuthForm();

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Entre com seu email e senha ou use SSO.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FontAwesomeIcon icon={faLock} className="mr-2" /> Password
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Input type="password" placeholder="Senha" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember-me"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="remember-me"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Lembrar-me
                        </label>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Esqueci a senha
              </Link>
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <div className="text-center">
              <Link
                href="/auth/register"
                className="text-sm text-primary hover:underline"
              >
                Cadastre-se
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
            onClick={() => console.log("Login com Google")}
          >
            <FontAwesomeIcon icon={faGoogle} /> Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => console.log("Login com GitHub")}
          >
            <FontAwesomeIcon icon={faGithub} /> GitHub
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
