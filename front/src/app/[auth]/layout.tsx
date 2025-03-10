import Image from "next/image";
import backgroundImage from "@/assets/images/auth-background.jpg";

type AuthLayoutProps = {
  children: React.ReactNode;
  image: string;
};

const AuthLayout = ({ children, image }: AuthLayoutProps) => {
  return (
    <body className="w-full h-full">
      <main className="min-h-screen grid md:grid-cols-2">
        <aside className="hidden md:flex items-center justify-center relative">
          <Image
            src={backgroundImage}
            alt="Background image"
            fill
            className="object-cover"
          />
        </aside>
        <section className="flex items-center justify-center p-8">
          {children}
        </section>
      </main>
    </body>
  );
};

export default AuthLayout;
