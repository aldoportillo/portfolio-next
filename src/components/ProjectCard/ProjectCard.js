import Image from "next/image";
import styles from "./ProjectCard.module.css";
import { FaGithub } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
import { TbBrandGithubFilled } from "react-icons/tb";


function ProjectCard({ project }) {
  return (
    <div className={styles.projectCard}>
      <Image src={project.image} alt={project.name}/>
      <div className={styles.projectInfo}>
        <h2 className={styles.projectTitle}>{project.name}</h2>
        <p className={styles.projectDescription}>{project.description}</p>
      </div>
      <div className={styles.projectLinks}>
        {project.liveLink && (
          <div className={styles.link}>
          <TfiWorld />
          <a href={project.liveLink} target="_blank" rel="noreferrer">
            Live Site
          </a>
          </div>
        )}
        {project.serverRepoLink && (
          <div className={styles.link}>
          <TbBrandGithubFilled />
          <a
            href={project.serverRepoLink}
            target="_blank"
            rel="noreferrer"  
          >
            Server Repo
          </a>
          </div>
        )}
        {project.clientRepoLink && (
          <div className={styles.link}>
          <FaGithub />
          <a
            href={project.clientRepoLink}
            target="_blank"
            rel="noreferrer"
          >
            Client Repo
          </a>
          </div>
        )}
        </div>
      
    </div>
  );
}

export default ProjectCard;
