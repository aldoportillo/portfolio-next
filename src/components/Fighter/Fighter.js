"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const STANCE_GIF = "/stance.gif";
const JAB_GIF = "/jab.gif";
const CROSS_GIF = "/cross.gif";
const KICK_GIF = "/kick.gif";

const Wrapper = styled.div`
  background-color: #1b2532;
  width: 250px; /* Change to 100% */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-radius: 16px;
`;

const FighterBase = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  background-size: contain;
  margin-right: 20px;
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

const getFighterGif = (fighterClasses) => {
  if (fighterClasses.includes("punch")) return JAB_GIF;
  if (fighterClasses.includes("kick")) return CROSS_GIF;
  if (fighterClasses.includes("reversekick")) return KICK_GIF;
  return STANCE_GIF;
};

const Fighter = () => {
  const [fighterClasses, setFighterClasses] = useState(["stance"]);

  const addKenClass = (cls) => {
    setFighterClasses((prev) => (prev.includes(cls) ? prev : [...prev, cls]));
  };
  const removeKenClass = (cls) => {
    setFighterClasses((prev) => prev.filter((c) => c !== cls));
  };
  const hasFighterClass = (cls) => fighterClasses.includes(cls);

  const punch = () => {
    if (hasFighterClass("punch") || hasFighterClass("kick")) return;
    addKenClass("punch");
    setTimeout(() => removeKenClass("punch"), 150);
  };

  const kick = () => {
    if (hasFighterClass("kick")) return;
    addKenClass("kick");
    setTimeout(() => removeKenClass("kick"), 500);
  };

  const rkick = () => {
    if (hasFighterClass("reversekick") || hasFighterClass("kick")) return;
    addKenClass("reversekick");
    setTimeout(() => removeKenClass("reversekick"), 500);
  };

  const randomize = () => {
    const random = Math.floor(Math.random() * 3);
    if (random === 0) punch();
    if (random === 1) kick();
    if (random === 2) rkick();
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 81: // 'Q'
          punch();
          break;
        case 87: // 'W'
          kick();
          break;
        case 69: // 'E'
          rkick();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fighterGif = getFighterGif(fighterClasses);

  return (
    <Wrapper onClick={randomize}>
      <FighterBase id="ken" className={fighterClasses.join(" ")}>
        <Image src={fighterGif} alt="fighter" width={50} height={50} />
      </FighterBase>
      <div>
        <Text>
          I enjoy training <Accent>MMA</Accent>
        </Text>
        <Small>i have competed in fights and tournaments</Small>
      </div>
    </Wrapper>
  );
};

export default Fighter;
