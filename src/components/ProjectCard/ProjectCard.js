"use client";
import styled from "styled-components";
import PropTypes from "prop-types";

function ProjectCard({ project }) {
  return (
    <Card>
      <ProjectImage src={project.image} alt={project.name} />
      <ProjectInfo>
        <ProjectTitle>{project.name}</ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
      </ProjectInfo>
    </Card>
  );
}

const Card = styled.div`
  background: #333;
  color: #fff;
  border-radius: 8px;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ProjectInfo = styled.div`
  padding: 15px;
`;

const ProjectTitle = styled.h2`
  font-size: 1.5em;
  color: #5eddac;
`;

const ProjectDescription = styled.p`
  font-size: 1em;
  color: #ccc;
`;

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired
};


export default ProjectCard;
