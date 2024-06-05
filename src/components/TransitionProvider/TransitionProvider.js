"use client";

import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/NavBar";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Footer from "../Footer";

const TransitionProvider = ({ children }) => {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div
        key={pathName}
        style={{
          width: '100vw',
          height: '100vh',
          backgroundImage: 'linear-gradient(to bottom, #bfdbfe, #fecaca)'
        }}
      >
        <motion.div
          style={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            backgroundColor: 'black',
            borderRadius: '0 0 100px 100px',
            zIndex: 40,
          }}
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          style={{
            position: 'fixed',
            margin: 'auto',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            color: 'white',
            fontSize: '8rem',
            cursor: 'default',
            zIndex: 50,
            width: 'fit-content',
            height: 'fit-content'
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {pathName.substring(1)}
        </motion.div>
        <motion.div
          style={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            backgroundColor: 'black',
            borderRadius: '100px 100px 0 0',
            bottom: 0,
            zIndex: 30,
          }}
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", transition: { delay: 0.5 } }}
        />
        <div style={{ height: '6rem' }}>
          <Navbar />
        </div>
        <div style={{ height: 'calc(100vh - 6rem)' }}>
          {children}
        </div>
        <div style={{ height: '6rem' }}>
          <Footer />
        </div>
      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;
