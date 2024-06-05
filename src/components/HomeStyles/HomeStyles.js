"use client";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #242424; 
  color: #f5f5f5;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.h1`
  margin: 0;
  font-size: 2.5em;
  color: #f5f5f5;
`;

const Highlight = styled.span`
  color: #5eddac;  
`;

const Subheader = styled.h2`
  color: #ccc;
  font-size: 1.5em;
  margin-top: 0.5em;
`;

const Inline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  img {
    width: 100%;
    height: auto;
    max-width: 300px;
    margin-top: 20px;
  }

  @media (min-width: 768px) {
    flex-direction: row-reverse;
    img {
      width: 50%;
    }
  }
`;

const Bio = styled.p`
  font-size: 1.1em;
  line-height: 1.6;
  text-align: start;
  max-width: 600px;
  margin-top: 20px;
  color: #ddd;
  padding: 0 20px;
`;

const AboutMeSection = styled.section`
  padding: 20px;
  text-align: left;
  color: #f5f5f5;
  max-width: 1200px;
  width: auto;

  @media (min-width: 768px) {
    width: 75%;
    }

  h2 {
    font-size: 2em;
    color: var(--accent);
    margin-top: 20px;
    margin-bottom: 40px;
  }

  p {
    font-size: 1.1em;
    line-height: 1.6;
    color: #ddd;
    margin-bottom: 10px;
  }

  a {
    color: #5eddac;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export { Wrapper, Header, Highlight, Subheader, Inline, Bio, AboutMeSection };
