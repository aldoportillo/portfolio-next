import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import TransitionProvider from "@/components/TransitionProvider";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
      <Link href="/" rel="icon">Home</Link>
      <Link href="/projects" rel="icon">Projects</Link>
      <Link href="/blogs" rel="icon">Blogs</Link>
      <Link href="/contact" rel="icon">Contact</Link>
      <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
