"use client";

import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/NavBar";
import Footer from "../Footer";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import Link from "next/link";

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
        <Header>
          <LogoContainer>
            <LogoLink href="/">
              <span>Aldo</span>
              <span className="logo-text">Portillo</span>
            </LogoLink>
          </LogoContainer>
          <Navbar />
        </Header>
        <MainContent>{children}</MainContent>
        <Footer />
      </PageContainer>
    </AnimatePresence>
  );
};

export default TransitionProvider;

const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: var(--header);
  justify-content: space-between;
  max-width: 1200px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  overflow-x: hidden;
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

const MainContent = styled.main`
  display: flex;
  position: relative;
  overflow: hidden;
  justify-content: center;
  width: 100%;
  flex: 1;

  @media (max-width: 768px) {
    width: 100vw;
    padding: 0;
  }
`;

const LogoLink = styled(Link)`
  font-size: 2rem;
  background-color: black;
  border-radius: 0.25rem;
  padding: 0.25rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: white;
    margin-right: 0.25rem;
  }

  .logo-text {
    width: 7rem;
    height: 2rem;
    border-radius: 0.25rem;
    background-color: #5eddac;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;
