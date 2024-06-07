import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/TransitionProvider";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{"backgroundColor": "#121212"}}>
      <TransitionProvider>
      <header>
          <div className="logo-container">
            <Link href="/" className="header-logo">
              <span>Aldo</span>
              <span className="logo-text">Portillo</span>
            </Link>
          </div>
          <NavBar />
        </header>
        <main>{children}</main>
        <Footer />
      </TransitionProvider>
      </body>
    </html>
  );
}
