"use client";

import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import NavLink from '@/components/NavLink';

const links = [
  { url: "/", title: "Home" },
  { url: "/projects", title: "Projects" },
  { url: "/blogs", title: "Blog" },
  { url: "/contact", title: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

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


  return (
    <NavContainer>
      <LinksContainer>
        {links.map((link) => (
          <NavLink link={link} key={link.title} />
        ))}
      </LinksContainer>
      <LogoContainer>
        <LogoLink href="/">
          <span>Aldo</span>
          <span className="logo-text">Portillo</span>
        </LogoLink>
      </LogoContainer>
      <div>
        <MenuButton onClick={() => setOpen((prev) => !prev)}>
          <MenuBar variants={topVariants} animate={open ? "opened" : "closed"} />
          <MenuBar variants={centerVariants} animate={open ? "opened" : "closed"} />
          <MenuBar variants={bottomVariants} animate={open ? "opened" : "closed"} />
        </MenuButton>
        {open && (
          <MenuList variants={listVariants} initial="closed" animate="opened">
            {links.map((link) => (
              <MenuItem variants={listItemVariants} key={link.title}>
                <Link href={link.url}>{link.title}</Link>
              </MenuItem>
            ))}
          </MenuList>
        )}
      </div>
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
  width: 33.333%;

  @media (min-width: 768px) { 
    display: flex;
  }
`;

const LogoContainer = styled.div`
  display: none;
  width: 33.333%;
  justify-content: center;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const LogoLink = styled(Link)`
  font-size: 0.875rem;
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
    width: 3rem;
    height: 2rem;
    border-radius: 0.25rem;
    background-color: white;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MenuButton = styled.button`
  width: 2.5rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 50;
`;

const MenuBar = styled(motion.div)`
  width: 2.5rem;
  height: 0.25rem;
  background-color: black;
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
