import { AiFillLinkedin, AiFillGithub, AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.socialIcons}>
        <a href={'https://www.linkedin.com/in/aldo-portillo-09b187253/'} className={styles.iconLink} target="_blank" rel="noreferrer"><AiFillLinkedin size={50}/></a>
        <a href={'https://github.com/aldoportillo'} className={styles.iconLink} target="_blank" rel="noreferrer"><AiFillGithub size={50}/></a>
        <a href={'https://www.instagram.com/portillo.mma/'} className={styles.iconLink} target="_blank" rel="noreferrer"><AiFillInstagram size={50}/></a>
        <a href={'https://twitter.com/aldoportillodev'} className={styles.iconLink} target="_blank" rel="noreferrer"><AiOutlineTwitter size={50}/></a>
      </div>
      <div className={styles.links}>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">Don&apos;t Click!</a>
        <a href="https://12-3d-text-nu.vercel.app/" target="_blank" rel="noreferrer">3D Portfolio</a>
      </div>
      <p className={styles.copyRight}>Aldo Portillo &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}