"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NavLink from "../NavLink";
import { motion } from "framer-motion";

const links = [
  { url: "/", title: "Home" },
  { url: "/projects", title: "Projects" },
  { url: "/blogs", title: "Blog" },
  { url: "/contact", title: "Contact" },
];

const NavBar = () => {
  const [open, setOpen] = useState(true);

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
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'between', padding: '0 4px', fontSize: '1.25rem' }}>
      {/* LINKS */}
      <div style={{ display: 'block', flexDirection: 'row', gap: '16px', width: '33.333%' }}>
        {links.map((link) => (
          <NavLink link={link} key={link.title} />
        ))}
      </div>
      {/* LOGO */}
      <div style={{ display: 'none', width: '33.333%', justifyContent: 'center' }}>
        <Link
          href="/"
          style={{ fontSize: '0.875rem', backgroundColor: 'black', borderRadius: '4px', padding: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={{ color: 'white', marginRight: '4px' }}>Lama</span>
          <span style={{ width: '48px', height: '32px', borderRadius: '4px', backgroundColor: 'white', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            .dev
          </span>
        </Link>
      </div>
      {/* RESPONSIVE MENU */}
      <div style={{ display: 'none' }}>
        {/* MENU BUTTON */}
        <button
          style={{ width: '40px', height: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 50 }}
          onClick={() => setOpen((prev) => !prev)}
        >
          <motion.div
            variants={topVariants}
            animate={open ? "opened" : "closed"}
            style={{ width: '40px', height: '4px', backgroundColor: 'black', borderRadius: '2px' }}
          ></motion.div>
          <motion.div
            variants={centerVariants}
            animate={open ? "opened" : "closed"}
            style={{ width: '40px', height: '4px', backgroundColor: 'black', borderRadius: '2px' }}
          ></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={open ? "opened" : "closed"}
            style={{ width: '40px', height: '4px', backgroundColor: 'black', borderRadius: '2px' }}
          ></motion.div>
        </button>
        {/* MENU LIST */}
        {open && (
          <motion.div
            variants={listVariants}
            initial="closed"
            animate="opened"
            style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px', fontSize: '2.25rem', zIndex: 40 }}
          >
            {links.map((link) => (
              <motion.div
                variants={listItemVariants}
                key={link.title}
              >
                <Link href={link.url}>{link.title}</Link>
                <motion.div
                variants={listItemVariants}
                key={link.title}
                style={{}}  // Inline styles for list items if needed
              >
                <Link href={link.url}>{link.title}</Link>
              </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default NavBar;