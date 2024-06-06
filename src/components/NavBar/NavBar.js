"use client";

import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import NavLink from '@/components/NavLink';
import HomeIcon from '@/../public/save-icon.png';
import ProjectsIcon from '@/../public/code-icon.png';
import BlogIcon from '@/../public/blog-icon.png';
import ContactIcon from '@/../public/search-icon.png';

const links = [
  { url: "/", title: "Home", icon: HomeIcon},
  { url: "/projects", title: "Projects", icon: ProjectsIcon},
  { url: "/blogs", title: "Blog", icon: BlogIcon},
  { url: "/contact", title: "Contact", icon: ContactIcon}
];

const topVariants = {
  closed: {
    rotate: 0,
  },
  opened: {
    rotate: 45,
    backgroundColor: "rgb(255,255,255)",
  },
};
const centerVariants = {
  closed: {
    opacity: 1,
  },
  opened: {
    opacity: 0,
  },
};

const bottomVariants = {
  closed: {
    rotate: 0,
  },
  opened: {
    rotate: -45,
    backgroundColor: "rgb(255,255,255)",
  },
};

const listVariants = {
  closed: {
    x: "100vw",
  },
  opened: {
    x: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const listItemVariants = {
  closed: {
    x: -10,
    opacity: 0,
  },
  opened: {
    x: 0,
    opacity: 1,
  },
};

const getWindowSize = () => {
  const { innerWidth } = window;
  return innerWidth;
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    setWindowSize(getWindowSize())
  }, [])

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <NavContainer>
      
      
      {windowSize < 1025 ?
        <MenuButton onClick={() => setOpen((prev) => !prev)}>
          <MenuBar variants={topVariants} animate={open ? "opened" : "closed"} />
          <MenuBar variants={centerVariants} animate={open ? "opened" : "closed"} />
          <MenuBar variants={bottomVariants} animate={open ? "opened" : "closed"} />
        </MenuButton>
        :
        <LinksContainer>
        {links.map((link) => (
          <NavLink link={link} key={link.title} />
        ))}
      </LinksContainer>
      }
        {open && (
          <MenuList variants={listVariants} initial="closed" animate="opened">
            {links.map((link) => (
              <MenuItem variants={listItemVariants} key={link.title}>
                <NavLink link={link} key={link.title} />
              </MenuItem>
            ))}
          </MenuList>
        )}
    </NavContainer>
  );
};

export default Navbar;



const NavContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 1.25rem;
`;

const LinksContainer = styled.div`
  display: none;
  flex-direction: row;
  gap: 16px;
  width: auto;

  @media (min-width: 768px) { 
    display: flex;
  }
`;


const MenuButton = styled.div`
  width: 2.5rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 50;
  color: white;
`;

const MenuBar = styled(motion.div)`
  width: 2.5rem;
  height: 0.25rem;
  background-color: white;
  border-radius: 0.125rem;
  
`;

const MenuList = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  font-size: 2.25rem;
  z-index: 40;
`;

const MenuItem = styled(motion.div)``;
