import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Link href="/" rel="icon">Home</Link>
      <Link href="/projects" rel="icon">Projects</Link>
      <Link href="/blogs" rel="icon">Blogs</Link>
      <Link href="/contact" rel="icon">Contact</Link>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
