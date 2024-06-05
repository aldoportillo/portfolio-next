"use client";

import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/NavBar";
import Footer from "../Footer";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const TransitionProvider = ({ children }) => {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <PageContainer key={pathName}>
        <TransitionOverlay
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <PathNameDisplay
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {pathName.substring(1)}
        </PathNameDisplay>
        <TransitionOverlay
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", transition: { delay: 0.5 } }}
        />
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>
        <MainContent>
          {children}
        </MainContent>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </PageContainer>
    </AnimatePresence>
  );
};

export default TransitionProvider;

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const TransitionOverlay = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: black;
  z-index: 40;
  border-radius: 0 0 100px 100px;

  &:nth-child(3) {
    border-radius: 100px 100px 0 0;
    bottom: 0;
    z-index: 30;
  }
`;

const PathNameDisplay = styled(motion.div)`
  position: fixed;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  font-size: 8rem;
  cursor: default;
  z-index: 50;
  width: fit-content;
  height: fit-content;
`;

const NavbarContainer = styled.div`
  height: 6rem;
`;

const MainContent = styled.div`
  height: calc(100vh - 6rem);
`;

const FooterContainer = styled.div`
  height: 6rem;
`;
