"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const STANCE_GIF = "/stance.gif";
const JAB_GIF = "/jab.gif";
const CROSS_GIF = "/cross.gif";
const KICK_GIF = "/kick.gif";

const Stage = styled.div`
  position: relative;
  width: 450px;
  height: 330px;
  background-size: contain;
  margin-right: 20px;
`;

const FighterBase = styled.div`
  position: absolute;
  bottom: 112px;
  margin-left: 150px;

  &.flip {
    transform: scaleX(-1);
  }
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
  }, []);

  // 5. Determine which GIF to display based on Ken’s current classes
  const fighterGif = getFighterGif(fighterClasses);

  return (
    <Stage>
      {/* We still apply any relevant classes like "flip" */}
      <FighterBase id="ken" className={fighterClasses.join(" ")}>
        <Image src={fighterGif} alt="fighter" width={50} height={50} />
      </FighterBase>
    </Stage>
  );
};

export default Fighter;
