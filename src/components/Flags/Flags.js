"use client";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

export default function Flags({ numOfColumns = 10, staggeredDelay = 80 }) {
  const [flagType, setFlagType] = useState("spain");
  const [index, setIndex] = useState(0);

  const changeFlag = () => {
    setIndex(index + 1);
    const flagTypes = ["russia", "spain", "germany"];
    setFlagType(flagTypes[index % 3]);
  };

  return (
    <Container onClick={changeFlag}>
      <FlagWrapper>
        {range(numOfColumns).map((colIndex) => (
          <Column
            key={colIndex}
            delay={colIndex * staggeredDelay}
            gradient={FLAG_GRADIENTS[flagType].backgroundImage}
          />
        ))}
      </FlagWrapper>

      <TextContainer>
        <Text>
          I am considered a <Accent>polyglot</Accent>
        </Text>
        <Small>click to explore languages</Small>
      </TextContainer>
    </Container>
  );
};

const range = (num) => Array.from({ length: num }, (_, i) => i);

const oscillate = keyframes`
  from {
    transform: translateY(8px);
  }
  to {
    transform: translateY(-8px);
  }
`;

const Container = styled.div`
  background-color: #1b2532;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 16px;
  grid-area: flags;
  cursor: pointer;
`;

const FlagWrapper = styled.div`
  display: flex;
  aspect-ratio: 3 / 2;
  width: 40%;
  margin: -30px auto 0 auto;
  align-self: center;
`;

const Column = styled.div`
  flex: 1;
  animation: ${oscillate} 500ms infinite alternate ease-in-out backwards;
  animation-delay: ${(props) => props.delay}ms;
  background-image: ${(props) => props.gradient};
  background-size: 100% 100%;
  background-repeat: no-repeat;
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

const FLAG_GRADIENTS = {
  russia: {
    backgroundImage: `
      linear-gradient(
        to bottom,
        #fff 0%,
        #fff 33%,
        #0039a6 33%,
        #0039a6 66%,
        #d52b1e 66%,
        #d52b1e 100%
      )
    `,
  },
  germany: {
    backgroundImage: `
      linear-gradient(
        to bottom,
        #000 0%,
        #000 33%,
        #D00 33%,
        #D00 66%,
        #FFCE00 66%,
        #FFCE00 100%
      )
    `,
  },
  spain: {
    backgroundImage: `
      linear-gradient(
        to bottom,
        #AA151B 0%,
        #AA151B 25%,
        #F1BF00 25%,
        #F1BF00 75%,
        #AA151B 75%,
        #AA151B 100%
      )
    `,
  },
};
