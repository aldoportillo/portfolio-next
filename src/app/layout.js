import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/TransitionProvider";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className} style={{"backgroundColor": "#121212"}}>
      <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
