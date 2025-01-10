"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const SPRITE_WIDTH = 70;
const SPRITE_HEIGHT = 80;
const BG_KEN = "https://raw.githubusercontent.com/jkneb/street-fighter-css/master/images/ken.png";

const stanceFrames = keyframes`
  0%   { background-position: 0px ${-SPRITE_HEIGHT * 1}px; }
  100% { background-position: ${-SPRITE_WIDTH * 4}px ${-SPRITE_HEIGHT * 1}px; }
`;
const punchFrames = keyframes`
  0%   { background-position: 0px ${-SPRITE_HEIGHT * 2}px; }
  100% { background-position: ${-SPRITE_WIDTH * 3}px ${-SPRITE_HEIGHT * 2}px; }
`;
const hadokenFrames = keyframes`
  0%   { background-position: 0px ${-SPRITE_HEIGHT * 1 * 0}px; }
  100% { background-position: ${-SPRITE_WIDTH * 4}px ${-SPRITE_HEIGHT * 0}; }
`;
const walkFrames = keyframes`
  0%   { background-position: 0px ${-SPRITE_HEIGHT * 4}px; }
  100% { background-position: ${-SPRITE_WIDTH * 5}px ${-SPRITE_HEIGHT * 4}px; }
`;
const kickFrames = keyframes`
  0%   { background-position: 0px ${-SPRITE_HEIGHT * 7}px; }
  100% { background-position: ${-SPRITE_WIDTH * 5}px ${-SPRITE_HEIGHT * 7}px; }
`;
const reverseKickFrames = keyframes`
  0%   { background-position: 0px ${-SPRITE_HEIGHT * 8}px; }
  100% { background-position: ${-SPRITE_WIDTH * 5}px ${-SPRITE_HEIGHT * 8}px; }
`;
const kneelFrames = keyframes`
  0%   { background-position: 0px ${-SPRITE_HEIGHT * 10}px; }
  100% { background-position: 0px ${-SPRITE_HEIGHT * 10}px; }
`;
const jumpFrames = keyframes`
  0%   { background-position: 0px ${-SPRITE_HEIGHT * 9}px; }
  100% { background-position: ${-SPRITE_WIDTH * 7}px ${-SPRITE_HEIGHT * 9}px; }
`;
const shoryukenFrames = keyframes`
  0%   { background-position: 0px 0px; }
  100% { background-position: ${-SPRITE_WIDTH * 7}px 0px; }
`;
const tatsumakiFrames = keyframes`
  0%   { background-position: 0px 0px; }
  100% { background-position: ${-SPRITE_WIDTH * 13}px 0px; }
`;

const fireballFrames = keyframes`
  0%   { background-position: 140px 320px; }
  100% { background-position: -${SPRITE_WIDTH * 2}px 320px; }
`;
const explodeFrames = keyframes`
  0%   { background-position: 0px ${-SPRITE_HEIGHT * 4}px; }
  100% { background-position: -${SPRITE_WIDTH * 4}px ${-SPRITE_HEIGHT * 4}px; }
`;

const Stage = styled.div` 
  position: relative; /* so Ken, fireballs stay within this context if you want */
  width: 450px;
  height: 330px;
  background-size: contain;
  margin-right: 20px;
`;

const Commands = styled.div`
  margin-left: 450px; /* next to the stage */
  font-size: 12px;
  padding: 15px;
  color: #333;
  h1 {
    margin-top: 0;
    font-size: 14px;
  }
  button {
    margin: 3px 0;
    cursor: pointer;
  }
  button + button {
    white-space: nowrap;
  }
`;

const KenBase = styled.div`
  position: absolute;
  bottom: 112px;
  margin-left: 150px;
  width: ${SPRITE_WIDTH}px;
  height: ${SPRITE_HEIGHT}px;
  background-image: url(${BG_KEN});
  background-repeat: no-repeat;
  /* By default, show Ken’s stance animation */
  animation: ${stanceFrames} 0.5s steps(4) infinite;

  /* Flip horizontally */
  &.flip {
    transform: scaleX(-1);
  }

  /* Each move toggles a different background sprite sheet & animation */
  &.punch {
    animation: ${punchFrames} 0.15s steps(3) infinite;
  }
  &.hadoken {
    animation: ${hadokenFrames} 0.5s steps(4) infinite;
  }
  &.walk {
    animation: ${walkFrames} 0.5s steps(5) infinite;
  }
  &.kick {
    animation: ${kickFrames} 0.5s steps(5) infinite;
  }
  &.reversekick {
    animation: ${reverseKickFrames} 0.5s steps(5) infinite;
  }
  &.kneel {
    animation: ${kneelFrames} 0.2s steps(1) infinite;
  }

  /* JUMP changes the bottom position (we’ll handle in JS) + sprite frames */
  &.jump {
    animation: ${jumpFrames} 1s steps(7) infinite;
    transition: bottom 0.5s cubic-bezier(0.99, 0.005, 0, 0.42);
    bottom: 225px;
  }
  &.jump.down {
    bottom: 112px; /* back down */
  }

  /* Delete SHORYUKEN uses a different sprite (Ken-shoryuken.png) */
  &.shoryuken {
    height: 110px;
    animation: ${shoryukenFrames} 1s steps(7) infinite;
    transition: bottom 0.5s cubic-bezier(0.99, 0.005, 0, 0.42);
    bottom: 225px;
  }
  &.shoryuken.down {
    bottom: 112px;
  }

  /* Delete TATSUMAKI uses Ken-tatsumaki-senpuu-kyaku.png */
  &.tatsumaki {
    height: 110px;
    animation: ${tatsumakiFrames} 2s steps(13) infinite;
    transition: bottom 0.2s cubic-bezier(0.99, 0.005, 0, 0.42);
    bottom: 132px;
  }
  &.tatsumaki.down {
    bottom: 112px;
  }
`;

const Fireball = styled.div`
  position: absolute;
  left: 100%;
  bottom: 0;
  margin-left: 0;
  width: ${SPRITE_WIDTH}px;
  height: ${SPRITE_HEIGHT}px;
  background-image: url(${BG_KEN});
  background-position: 140px 320px; /* initial position in sprite */
  background-repeat: no-repeat;

  /* Animate the sprite frames for the fireball */
  animation: ${fireballFrames} 0.15s steps(2) infinite;

  /* The actual movement to the right via margin-left. */
  transition: margin 8s linear;

  &.moving {
    margin-left: 4000px; /* push it across screen over 8s */
  }

  /* Explosion variant */
  &.explode {
    animation: ${explodeFrames} 0.5s steps(4) 1;
    background-position: 0 ${-SPRITE_HEIGHT * 4}px;
  }
`;

const Fighter = () => {
  const [kenClasses, setKenClasses] = useState(["stance"]);

  const [fireballs, setFireballs] = useState([]);

  const addKenClass = (cls) => {
    setKenClasses((prev) =>
      prev.includes(cls) ? prev : [...prev, cls]
    );
  };
  const removeKenClass = (cls) => {
    setKenClasses((prev) => prev.filter((c) => c !== cls));
  };
  const hasKenClass = (cls) => kenClasses.includes(cls);

  const punch = () => {
    if (hasKenClass("punch") || hasKenClass("kick")) return;
    addKenClass("punch");
    setTimeout(() => removeKenClass("punch"), 150);
  };

  const kick = () => {
    if (hasKenClass("kick")) return;
    addKenClass("kick");
    setTimeout(() => removeKenClass("kick"), 500);
  };

  const rkick = () => {
    if (hasKenClass("reversekick") || hasKenClass("kick")) return;
    addKenClass("reversekick");
    setTimeout(() => removeKenClass("reversekick"), 500);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 81: 
          punch();
          break;
        case 87:
          kick();
          break;
        case 69:
          rkick();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); 

  return (
    <>
      <Stage>
        {/* Ken */}
        <KenBase
          id="ken"
          className={kenClasses.join(" ")}
          style={{ marginLeft: "150px" }}
        />
        {fireballs.map((fb) => (
          <Fireball
            key={fb.id}
            className={`${fb.state} ${fb.state === "moving" ? "moving" : ""}`}
          />
        ))}
      </Stage>
    </>
  );
};

export default Fighter;
