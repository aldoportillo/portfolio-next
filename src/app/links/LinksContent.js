"use client";

import React from "react";
import styles from "./Links.module.css";
import Image from "next/image";
import { AiFillLinkedin, AiFillGithub, AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { motion } from "framer-motion";

const links = [
  {
    name: "Neat on the Rocks | Sip Smart. Stay Connected.",
    url: "https://www.neatonthe.rocks/",
    icon: "/notr-logo.png",
  },
  {
    name: "Portfolio | Interactive Blogs, Projects, and More",
    url: "https://www.aldoportillo.com/",
    icon: "/typing.gif",
  },
  {
    name: "My Matches | Portillo MMA",
    url: "https://www.youtube.com/@portillomma",
    icon: "/intercept-logo.png",
  },
  {
    name: "Best VS Code Extensions | Dev.to",
    url: "https://dev.to/aldoportillo/vscode-extensions-309i",
    icon: "/vscode-logo.png",
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const renderLinks = () => {
  return links.map((link) => (
    <motion.a 
      href={link.url} 
      key={link.name} 
      className={styles.link}
      variants={linkVariants}
      whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.95 }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={link.icon} alt={link.name} width={50} height={50} className={styles.linkIcon} />
      <p>{link.name}</p>
    </motion.a>
  ));
};

export default function LinksContent() {
  return (
    <motion.main 
      className={styles.linksPageWrapper}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className={styles.head}
        variants={iconVariants}
      >
        <Image src="/portrait.jpg" alt="Portfolio Picture" width={150} height={150} className={styles.profilePortrait} />
        <h1 className={styles.title}>Aldo Portillo</h1>
        <p className={styles.subtitle}>Software Engineer</p>
        <div className={styles.socialIcons}>
          <motion.a 
            href='https://www.linkedin.com/in/aldo-portillo-09b187253/' 
            className={styles.iconLink} 
            target="_blank" 
            rel="noreferrer"
            whileHover={{ y: -5, color: "#0A66C2" }}
          >
            <AiFillLinkedin size={30} />
          </motion.a>
          <motion.a 
            href='https://github.com/aldoportillo' 
            className={styles.iconLink} 
            target="_blank" 
            rel="noreferrer"
            whileHover={{ y: -5, color: "#4078c0" }}
          >
            <AiFillGithub size={30} />
          </motion.a>
          <motion.a 
            href='https://www.instagram.com/portillo.mma/' 
            className={styles.iconLink} 
            target="_blank" 
            rel="noreferrer"
            whileHover={{ y: -5, color: "#E1306C" }}
          >
            <AiFillInstagram size={30} />
          </motion.a>
          <motion.a 
            href='https://twitter.com/aldoportillodev' 
            className={styles.iconLink} 
            target="_blank" 
            rel="noreferrer"
            whileHover={{ y: -5, color: "#1DA1F2" }}
          >
            <AiOutlineTwitter size={30} />
          </motion.a>
        </div>
      </motion.div>

      <motion.div className={styles.linksWrapper} variants={containerVariants}>
        {renderLinks()}
      </motion.div>
    </motion.main>
  );
}
