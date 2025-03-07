import Me from "/public/me.png";
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

function Home() {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.inline}>
      <div>
          <h1 className={styles.heading}>
            Hello, I&apos;m{" "}
            <span className={styles.highlight}>Aldo Portillo</span>
          </h1>

          <h2 className={styles.subheader}>
            Full Stack Engineer | MMA Fighter | Bartender
          </h2>
          <p className={styles.bio}>
          Full Stack Engineer based in Chicago. I build scalable applications, solve problems creatively, and approach challenges with a mix of logic and adaptability. My background in chemistry, MMA, and bartending gives me a unique perspective—precision, discipline, and the ability to think on my feet.
          </p>
        </div>
        <Image src={Me} alt="Me Icon" priority unoptimized />
        
      </div>

      <div className={styles.about}>
        <Fighter />
        <Flags />
        {/* <Bartending /> */}
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
    </div>
  );
}

export default Home;
