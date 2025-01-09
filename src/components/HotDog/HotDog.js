"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const colorHotdog = "#CA6A41";
const colorBread = "#EDB662";
const colorMustard = "#F5D530";
const colorBackground = "#1b2532";

const WienerScale = "10em";

const hover = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    /* move it up 1% of WienerScale */
    transform: translateY(-${parseFloat(WienerScale) * 0.01}px);
  }
  100% {
    transform: translateY(0);
  }
`;

function getBitePosition(biteStep) {
  switch (biteStep) {
    case 1:
      return "-60%";
    case 2:
      return "-35%";
    case 3:
      return "0%";
    default:
      return "-100%";
  }
}

const Center = styled.div`
  background-color: ${colorBackground};
  padding: 20px;
  border-radius: 16px;
  width: 300px; /* arbitrary width */
`;

const WienerContainer = styled.div`
  margin: auto;
  box-sizing: border-box;
  font-size: ${WienerScale};
  width: 1em;
  height: 0.5em;
  display: flex;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    z-index: 10;
    display: block;
    position: absolute;
    background-color: ${colorBackground};
    height: 0.5em;
    border-radius: 0.25em;
    top: 50%;
    margin-top: -10%;
    width: 100%;
    animation: ${hover} 3s infinite linear;
    left: ${(props) => getBitePosition(props.biteStep)};
    transition: left 0.5s ease;
  }

  &::before {
    margin-top: -35%;
  }
`;

const Wiener = styled.div`
  z-index: 8;
  display: block;
  position: relative;
  margin: auto;
  font-size: 0.75em;
  width: 1em;
  height: 0.18em;
  border-radius: 0.09em;
  background-color: ${colorHotdog};
  animation: ${hover} 3s infinite linear;

  /* Bread (on top) */
  &::before {
    content: "";
    display: block;
    font-size: 0.75em;
    width: 1em;
    height: 0.35em;
    background-color: ${colorBread};
    position: absolute;
    border-radius: 0.2em;
    top: 0.085em;
    left: 0;
    right: 0;
    margin: auto;
  }

  &.mustard::after {
    content: "";
    display: block;
    font-size: 0.75em;
    width: 1em;
    position: absolute;
    top: -0.033em;
    left: 0;
    right: 0;
    margin: auto;
  }

  &.mustard::after {
    background-color: ${colorMustard};
    height: 0.06em;
    border-radius: 0.03em;
  }
`;

const Text = styled.p`
  color: white;
  font-family: "Wotfard", sans-serif;
  margin-bottom: 0;
  overflow: wrap;
`;

const Small = styled.p`
  font-size: 0.8rem;
  margin-top: 5px;
  color: hsl(210deg 9% 40%);
`;

const Accent = styled.span`
  color: #5eddac;
`;

const WienerBiter = () => {
  const [biteStep, setBiteStep] = useState(0);

  const handleBite = () => {
    setBiteStep((prev) => {
      const nextStep = prev + 1;
      if (nextStep === 3) {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        return 0;
      }
      return nextStep;
    });
  };

  return (
    <Center>
      <WienerContainer biteStep={biteStep} onClick={handleBite}>
        <Wiener className="mustard" />
      </WienerContainer>
      <div>
        <Text>
          My most FAQ: does my family own <Accent>Portillo&apos;s</Accent>?
        </Text>
        <Small>click the hot dog 3 times for the the answer</Small>
      </div>
    </Center>
  );
};

export default WienerBiter;
