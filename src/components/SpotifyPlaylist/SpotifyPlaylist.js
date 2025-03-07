"use client";
import React from "react";
import styled from "styled-components";

export default function SpotifyPlaylist() {
  return (
    <Container>
      <StyledIframe
        src="https://open.spotify.com/embed/playlist/2Nct7cXHNSIUpqmoSqKjZd?utm_source=generator&theme=0"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
      <TextContainer>
        <Text>
          A peek into my headphones
        </Text>
        <Small>Press play to explore my coding playlist</Small>
      </TextContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: #1b2532;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 16px;
  grid-area: playlist;
  cursor: pointer;
`;

const StyledIframe = styled.iframe`
  border-radius: 12px;
  border: none;
  width: 100%;
  height: 152px;
`;

const TextContainer = styled.div`
  margin-top: 10px;
`;

const Text = styled.p`
  color: white;
  font-family: "Wotfard", sans-serif;
  margin-bottom: 0;
`;

const Accent = styled.span`
  color: #5eddac;
`;

const Small = styled.p`
  font-size: 0.8rem;
  margin-top: 5px;
  color: hsl(210deg 9% 40%);
`;
