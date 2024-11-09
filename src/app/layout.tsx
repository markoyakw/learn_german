import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./reset.css"
import "./globals.css";
import Header from "./_components/Header/Header";
import LanguageSelector from "./_components/Header/LanguageSelector/LanguageSelector";
import { cookies } from "next/headers";
import { TAppLanguage } from "./_types/types";
import Link from "next/link";
import classes from "./layout.module.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const appLanguage = await cookies().get("app-language")?.value as TAppLanguage

  return (
    <html lang={appLanguage} className={classes["html"]}>
      <body className={`${inter.className} ${classes["layout"]}`} >
        <Header appLanguageCookie={appLanguage}>
          <LanguageSelector />
        </Header>
        <main className={classes["layout__main"]}>
          {children}
        </main>
      </body>
    </html>
  );
}
