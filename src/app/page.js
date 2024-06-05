import Link from "next/link";
import { Wrapper, Header, Subheader, Highlight, Inline, Bio, AboutMeSection } from "../components/HomeStyles";
import Typing from "/public/typing.gif";
import Image from "next/image";

export const metadata = {
  title: "Home | Aldo Portillo",
  description: "Welcome to my portfolio",
  image: "../../public/save-icon.png",
  favicon: "../../public/save-icon.png",
  
};

function Home({ blogData }) {
  return (
    <Wrapper>
      <Header>
        Hello, I’m <Highlight>Aldo Portillo</Highlight>
      </Header>
      <Subheader>Full Stack Engineer | MMA Fighter | Bartender</Subheader>
      <Inline>
        <Image src={Typing} alt="Typing" priority unoptimized/>
        <Bio>
          Based in Chicago. Blending problem-solving skills with creativity and resilience learned from my roles as an MMA fighter and bartender. My diverse experiences fuel my ability to approach technology challenges from unique angles, constantly pushing for growth and innovation.
        </Bio>
      </Inline>
      <AboutMeSection>
        <h2>About Me</h2>
        <p>Hello! I&apos;m <strong>Aldo Portillo</strong>, a passionate <strong>Full Stack Engineer</strong> based in Chicago. With a foundational background in organic chemistry, I bring a methodical and analytical approach to developing robust, scalable web applications.</p>
        
        <p>Beyond my professional career, I am an avid <strong>rock climber</strong> and an enthusiastic <strong>MMA fighter</strong>. Both activities challenge me to push my limits and develop discipline. As a professional <strong>bartender</strong>, I fine-tune my ability to interact and connect with people from all walks of life.</p>
        
        <p>My journey is driven by honor, respect, and a commitment to positively impact society. I eagerly embrace life&apos;s adventures and challenges, especially in software, mixology, martial arts, and personal development. Tutoring in software and math allows me to share my knowledge and help others grow in their skills.</p>
        
        <p>I&apos;m excited to connect and share this journey with you. Whether you&apos;re interested in collaborative projects, or just wish to chat about technology, climbing, or anything else, feel free to <Link href="/contact">contact me</Link> or explore my <Link href="/projects">projects</Link>. Let’s navigate the adventures of life together!</p>
      </AboutMeSection>
      {/* <Posts blogData={blogData} /> */}
    </Wrapper>
  );
}

export default Home;