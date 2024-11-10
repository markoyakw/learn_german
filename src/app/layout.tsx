import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./reset.css"
import "./globals.css";
import Header from "./_components/Header/Header";
import LanguageSelector from "./_components/Header/LanguageSelector/LanguageSelector";
import { cookies } from "next/headers";
import { TAppLanguage } from "./_types/types";
import classes from "./layout.module.css"
import UserAvatar from "./_components/Header/UserAvatar/UserAvatar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skills to pump!",
  description: "Choose excercise to learn better German:",
};

export default async function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {

  const appLanguage = await cookies().get("app-language")?.value as TAppLanguage

  return (
    <html lang={appLanguage} className={classes["html"]}>
      <body className={`${inter.className} ${classes["layout"]}`} >
        <Header appLanguageCookie={appLanguage} wrapClassName={classes["layout__content-wrap"]}>
          <LanguageSelector />
          <UserAvatar />
        </Header>
        <main className={`${classes["layout__main"]} ${classes["layout__content-wrap"]}`}>
          {children}
        </main>
      </body>
    </html>
  );
}
