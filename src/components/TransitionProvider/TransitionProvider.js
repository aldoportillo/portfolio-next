"use client";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import styled from "styled-components";
import { usePathname } from "next/navigation";

const TransitionProvider = ({ children }) => {

  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <PageContainer key={pathName}>
        {/* <TransitionOverlay
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
        /> */}
        {children}
      </PageContainer>
    </AnimatePresence>
  );
};

export default TransitionProvider;

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
  background-color: #121212;
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
