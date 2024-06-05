import ProjectCard from '@/components/ProjectCard'
import React from 'react'
import { PageTitle, ProjectsContainer, Wrapper } from '@/components/ProjectStyles'

export const metadata = {
  title: "My Projects | Aldo Portillo",
  description: "A collection of projects",
  image: "../../public/save-icon.png",
  favicon: "../../public/save-icon.png",
  
};


const projectsData = [
  {
    id: 1,
    name: "Neat on the Rocks",
    description: "A social media application that brings users together for memorable and responsible nights. Built with a React client, Node and Express server. Databases with PostgreSQL for structured cocktail data and MongoDB for unstructured user data. Hosted on AWS. This app is meant to revolutionize the way people drink.",
    image: "https://res.cloudinary.com/dkhtrg1ts/image/upload/v1705443791/Portfolio/notr-card_exiwxh.png"
  },
  {
    id: 2,
    name: "BodyTrackPro",
    description: "A webapp built on Rails with a PostgreSQL database that allows users to track their body metrics, vitamin intake and nutrition. Users can create, read, update, and delete body metrics and macro nutrients. With beautiful charts and graphs, users can visualize their progress over time. This app is meant to help users achieve their fitness goals.",
    image: "https://res.cloudinary.com/dkhtrg1ts/image/upload/v1705443791/Portfolio/btp-card_fptl63.png"
  },
  {
    id: 3,
    name: "BoutBuddy",
    description: "An event management system that is best described as Tinder for fighters. Swipe right on someone you think you can beat, swipe left on someone you think you can't. If you both swipe right, you automatically get assigned to an event created by a promoter. This app focuses a lot on privilege based roles and permissions. Built with Rails and a PostgreSQL database. ",
    image: "https://res.cloudinary.com/dkhtrg1ts/image/upload/v1715366450/Portfolio/Screenshot_2024-05-10_at_1.39.58_PM_cgn1gh.png"
  },
  {
    id: 4,
    name: "TAA Logistics Website and CRM",
    description: "My first ever client project. A website and CRM for a logistics company. The website is built with React and the CRM is built with Rails. The CRM allows the client to manage their employees, quotes and applications. The CRM focuses a lot on privilege based roles and permissions. This is meant to optimize their workflow throw mass texts to dispatched drivers and automated quotes based on their current pricing model.",
    image: "https://res.cloudinary.com/dkhtrg1ts/image/upload/v1715360225/Portfolio/skj0skshqgvy5rgokbsi.png"
  },
  {
    id: 5,
    name: "VinoValley",
    description: "A WIP wine review app that allows users to search for wines, leave reviews, and learn about appellation geography. Built using a PostGIS database. The app uses the wine-searcher.com API to get wine data. This app is being built because I will be taking my level 1 sommelier exam soon, and I will learn a lot from this technical endeavour. I also want to learn more about PostGIS and how to use it in a real world application. Currently testing out api endpoints in Insomnia and storing data in PostGIS.",
    image: "https://res.cloudinary.com/dkhtrg1ts/image/upload/v1705443792/Portfolio/vv-card_iyy8vv.png"
  },
];


function Projects() {
  return (
    <Wrapper>
      <PageTitle>My Projects</PageTitle>
      <ProjectsContainer>
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ProjectsContainer>
    </Wrapper>
  )
}

export default Projects