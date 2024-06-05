import styled from "styled-components";

const Wrapper = styled.footer`
  align-items: center;
  background-color: var(--header);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 1rem ;
  text-align: center;
  width: 85vw;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px; 
  margin-bottom: 20px;
`;

const IconLink = styled.a`
  color: #ffffff; 
  transition: color 0.3s;

  &:hover {
    color: var(--accent); 
  }
`;

const MiscLinks = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;

  a {
    color: #ffffff;
    transition: color 0.3s;

    &:hover {
      color: var(--accent);
    }
  }
`;

const CopyRight = styled.p`
  margin: 10px 0 0;
  width: 100%; 
`;

export { Wrapper, SocialIcons, IconLink, MiscLinks, CopyRight };