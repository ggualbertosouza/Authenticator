import "../styles/globals.css";

import AppProviders from "@/provider";
import { globalMetadata } from "@/metadata/global";
import { GlobalFonts } from "@/assets/fonts/global";
import GlobalComponents from "@/components/globalComponents";

export const metadata = globalMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${GlobalFonts} overflow-hidden`}>
        <GlobalComponents />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
