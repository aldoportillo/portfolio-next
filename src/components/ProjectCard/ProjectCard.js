import Image from "next/image";
import styles from "./ProjectCard.module.css";

function ProjectCard({ project }) {
  return (
    <div className={styles.projectCard}>
      <Image src={project.image} alt={project.name}/>
      <div className={styles.projectInfo}>
        <h2 className={styles.projectTitle}>{project.name}</h2>
        <p className={styles.projectDescription}>{project.description}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
