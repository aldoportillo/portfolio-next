import Link from "next/link";
import Typing from "/public/typing.gif";
import Image from "next/image";
import SpotifyPlaylist from "../components/SpotifyPlaylist/SpotifyPlaylist";
import styles from "./Home.module.css";
import HotDog from "@/components/HotDog";
import Fighter from "@/components/Fighter";
import Flags from "@/components/Flags";

export const metadata = {
  title: "Home | Aldo Portillo",
  description: "Welcome to my portfolio",
  icons: {
    icon: "/save-icon.png",
  },
};

function Home({ blogData }) {
  return (
    <div className={styles.homeWrapper}>
      <h1 className={styles.heading}>
        Hello, I&apos;m <span className={styles.highlight}>Aldo Portillo</span>
      </h1>

      <h2 className={styles.subheader}>
        Full Stack Engineer | MMA Fighter | Bartender
      </h2>
      <div className={styles.inline}>
        <Image src={Typing} alt="Typing Icon" priority unoptimized />
        <p className={styles.bio}>
          Based in Chicago. Blending problem-solving skills with creativity and
          resilience learned from my roles as an MMA fighter and bartender. My
          diverse experiences fuel my ability to approach technology challenges
          from unique angles, constantly pushing for growth and innovation.
        </p>
      </div>

      <div className={styles.about}>
        <Fighter />
        <Flags />
        {/* <div class="card bartend-card">
          <Image src="/wine.png" alt="Wine Glass" width={100} height={100} />
          <div>
            <h3>I bartend on weekends</h3>
            <p>I have a passion for cocktails and wines that I enjoy sharing</p>
          </div>
        </div> */}
        <SpotifyPlaylist />
        <HotDog />
        {/* <div class="card">
          <Image src="/rock-climbing.png" alt="Rock Climbing" width={100} height={100} />
          <div>
            <h3>I climb rocks</h3>
            <p>Rock climbing challenges me physically and mentally</p>
          </div>
        </div> */}
        <div class={styles.notrCard}>
          <a
            className={styles.flex}
            href="https://www.neatonthe.rocks/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/notr-logo.png"
              alt="neat on the rocks logo"
              width={50}
              height={50}
            />
            <h3>Neat on the Rocks</h3>
          </a>
          <p style={{ alignSelf: "flex-start" }}>I am the creator of NOTR</p>
          <p
            style={{
              fontSize: "0.8rem",
              marginTop: "5px",
              color: "hsl(210deg 9% 40%)",
            }}
          >
            a social media promoting fun and responsible drinking. Click the
            logo to view the features.
          </p>
        </div>
      </div>
      {/* 
      <div className={styles.aboutMe}>
        <h2>About Me</h2>
        <p>Hello! I&apos;m <strong>Aldo Portillo</strong>, a passionate <strong>Full Stack Engineer</strong> based in Chicago. With a foundational background in organic chemistry, I bring a methodical and analytical approach to developing robust, scalable web applications.</p>
        
        <p>Beyond my professional career, I am an avid <strong>rock climber</strong> and an enthusiastic <strong>MMA fighter</strong>. Both activities challenge me to push my limits and develop discipline. As a professional <strong>bartender</strong>, I fine-tune my ability to interact and connect with people from all walks of life.</p>
        
        <p>My journey is driven by honor, respect, and a commitment to positively impact society. I eagerly embrace life&apos;s adventures and challenges, especially in software, mixology, martial arts, and personal development. Tutoring in software and math allows me to share my knowledge and help others grow in their skills.</p>
        
        <p>I&apos;m excited to connect and share this journey with you. Whether you&apos;re interested in collaborative projects, or just wish to chat about technology, climbing, or anything else, feel free to <Link href="/contact">contact me</Link> or explore my <Link href="/projects">projects</Link>. Let’s navigate the adventures of life together!</p>
      </div>
      {/* <Posts blogData={blogData} /> */}
    </div>
  );
}

export default Home;
