import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/TransitionProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Logo from "@/components/Logo/Logo";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TransitionProvider>
          <header>
            <Logo />
            <NavBar />
          </header>
          <main>{children}</main>
          <Analytics />
          <Footer />
        </TransitionProvider>
      </body>
    </html>
  );
}
