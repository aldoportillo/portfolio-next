"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const SPRITE_WIDTH = 70;
const SPRITE_HEIGHT = 80;
const BG_KEN = "https://raw.githubusercontent.com/jkneb/street-fighter-css/master/images/ken.png";
const BG_KEN_TATSU = "https://raw.githubusercontent.com/jkneb/street-fighter-css/master/images/ken-tatsumaki-senpuu-kyaku.png";
const BG_KEN_SHO = "https://raw.githubusercontent.com/jkneb/street-fighter-css/master/images/ken-shoryuken.png";
const BG_STAGE = "https://raw.githubusercontent.com/jkneb/street-fighter-css/master/images/bg2.jpg";

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

// Fireball frames (2 steps total) from the SCSS snippet
const fireballFrames = keyframes`
  0%   { background-position: 140px 320px; }
  100% { background-position: -${SPRITE_WIDTH * 2}px 320px; }
`;
// Explosion frames (4 steps)
const explodeFrames = keyframes`
  0%   { background-position: 0px ${-SPRITE_HEIGHT * 4}px; }
  100% { background-position: -${SPRITE_WIDTH * 4}px ${-SPRITE_HEIGHT * 4}px; }
`;

/* --------------------------------
   3) STYLED COMPONENTS
----------------------------------- */

// Stage: the background / stage container
const Stage = styled.div`
  position: relative; /* so Ken, fireballs stay within this context if you want */
  width: 450px;
  height: 330px;
  background: url(${BG_STAGE}) no-repeat 0px -100px;
  background-size: contain;
  margin-right: 20px;
`;

// Commands container
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

/* Ken sprite container */
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

  /* SHORYUKEN uses a different sprite (Ken-shoryuken.png) */
  &.shoryuken {
    height: 110px;
    background-image: url(${BG_KEN_SHO});
    animation: ${shoryukenFrames} 1s steps(7) infinite;
    transition: bottom 0.5s cubic-bezier(0.99, 0.005, 0, 0.42);
    bottom: 225px;
  }
  &.shoryuken.down {
    bottom: 112px;
  }

  /* TATSUMAKI uses Ken-tatsumaki-senpuu-kyaku.png */
  &.tatsumaki {
    height: 110px;
    background-image: url(${BG_KEN_TATSU});
    animation: ${tatsumakiFrames} 2s steps(13) infinite;
    transition: bottom 0.2s cubic-bezier(0.99, 0.005, 0, 0.42);
    bottom: 132px;
  }
  &.tatsumaki.down {
    bottom: 112px;
  }
`;

/* Fireball style (like .fireball in your code) */
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

/* --------------------------------
   4) REACT COMPONENT
----------------------------------- */
const Fighter = () => {
  // We store Ken's "active classes" in state
  const [kenClasses, setKenClasses] = useState(["stance"]);

  // For multiple fireballs, store each in an array
  const [fireballs, setFireballs] = useState([]);

  // Helper: add a class if not present
  const addKenClass = (cls) => {
    setKenClasses((prev) =>
      prev.includes(cls) ? prev : [...prev, cls]
    );
  };
  // Helper: remove a class
  const removeKenClass = (cls) => {
    setKenClasses((prev) => prev.filter((c) => c !== cls));
  };
  // Quick check if Ken has a certain class
  const hasKenClass = (cls) => kenClasses.includes(cls);

  /* -------------- ACTIONS -------------- */
  const punch = () => {
    // if Ken is busy with other moves, ignore
    if (hasKenClass("punch") || hasKenClass("kick") || hasKenClass("hadoken")) return;
    addKenClass("punch");
    setTimeout(() => removeKenClass("punch"), 150);
  };

  const kick = () => {
    if (hasKenClass("kick") || hasKenClass("reversekick") || hasKenClass("hadoken")) return;
    addKenClass("kick");
    setTimeout(() => removeKenClass("kick"), 500);
  };

  const rkick = () => {
    if (hasKenClass("reversekick") || hasKenClass("kick") || hasKenClass("hadoken")) return;
    addKenClass("reversekick");
    setTimeout(() => removeKenClass("reversekick"), 500);
  };

  const tatsumaki = () => {
    if (
      hasKenClass("tatsumaki") ||
      hasKenClass("shoryuken") ||
      hasKenClass("hadoken") ||
      hasKenClass("jump")
    )
      return;
    addKenClass("tatsumaki");
    setTimeout(() => addKenClass("down"), 1500);
    setTimeout(() => {
      removeKenClass("tatsumaki");
      removeKenClass("down");
    }, 2000);
  };

  const hadoken = () => {
    if (
      hasKenClass("tatsumaki") ||
      hasKenClass("shoryuken") ||
      hasKenClass("hadoken") ||
      hasKenClass("punch") ||
      hasKenClass("kick") ||
      hasKenClass("reversekick")
    )
      return;
    // animate Ken hadoken
    addKenClass("hadoken");
    setTimeout(() => removeKenClass("hadoken"), 500);

    // spawn a new fireball
    setTimeout(() => {
      const id = Date.now(); // unique ID
      setFireballs((prev) => [...prev, { id, state: "moving" }]);
    }, 250);
  };

  // We'll handle removing fireballs after "explosion" or crossing screen
  const removeFireball = (id) => {
    setFireballs((prev) => prev.filter((fb) => fb.id !== id));
  };

  const shoryuken = () => {
    if (
      hasKenClass("tatsumaki") ||
      hasKenClass("shoryuken") ||
      hasKenClass("hadoken") ||
      hasKenClass("punch") ||
      hasKenClass("kick") ||
      hasKenClass("jump")
    )
      return;
    addKenClass("shoryuken");
    setTimeout(() => addKenClass("down"), 500);
    setTimeout(() => {
      removeKenClass("shoryuken");
      removeKenClass("down");
    }, 1000);
  };

  const jump = () => {
    if (
      hasKenClass("jump") ||
      hasKenClass("reversekick") ||
      hasKenClass("kick") ||
      hasKenClass("hadoken") ||
      hasKenClass("shoryuken") ||
      hasKenClass("tatsumaki")
    )
      return;
    addKenClass("jump");
    setTimeout(() => addKenClass("down"), 500);
    setTimeout(() => {
      removeKenClass("jump");
      removeKenClass("down");
    }, 1000);
  };

  const kneel = () => {
    if (
      hasKenClass("kneel") ||
      hasKenClass("jump") ||
      hasKenClass("reversekick") ||
      hasKenClass("kick") ||
      hasKenClass("hadoken") ||
      hasKenClass("shoryuken") ||
      hasKenClass("tatsumaki")
    )
      return;
    addKenClass("kneel");
  };

  const walkLeft = () => {
    addKenClass("walk");
    // move Ken left
    // we can do it by setting an inline style, or a separate state
    // for simplicity, let's just do a direct DOM approach:
    const kenEl = document.getElementById("ken");
    if (kenEl) {
      const current = parseInt(kenEl.style.marginLeft || "150px", 10);
      kenEl.style.marginLeft = `${current - 10}px`;
    }
  };

  const walkRight = () => {
    addKenClass("walk");
    const kenEl = document.getElementById("ken");
    if (kenEl) {
      const current = parseInt(kenEl.style.marginLeft || "150px", 10);
      kenEl.style.marginLeft = `${current + 10}px`;
    }
  };

  /* 
    --------------- KEYBOARD EVENTS ---------------
    We'll replicate the keydown/keyup approach,
    toggling classes in React. 
  */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent repeated triggers if Ken is mid-action, e.g. hadoken
      switch (e.keyCode) {
        case 83: // "s" hadoken
          hadoken();
          break;
        case 68: // "d" shoryuken
          shoryuken();
          break;
        case 81: // "q" tatsumaki
          tatsumaki();
          break;
        case 65: // "a" punch
          punch();
          break;
        case 90: // "z" (note: user’s code says e=reversekick, z=kick, might differ)
          kick();
          break;
        case 69: // "e" reverse kick
          rkick();
          break;
        case 38: // up arrow jump
          jump();
          break;
        case 40: // down arrow kneel
          kneel();
          break;
        case 37: // left arrow walk left
          walkLeft();
          break;
        case 39: // right arrow walk right
          walkRight();
          break;
        default:
          break;
      }
      // Return false if you want to block default page scroll on arrow keys
      // e.preventDefault();
    };

    const handleKeyUp = (e) => {
      // remove walk / kneel on key up
      removeKenClass("walk");
      removeKenClass("kneel");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []); // run once

  /* 
    --------------- FIREBALL HANDLING ---------------
    For collisions, the original code checks if the fireball passes window width.
    We'll do a simpler approach: after 3s, "explode" or just remove it.
    If you want full collision detection, you'd track the offset in state, etc.
  */
  useEffect(() => {
    fireballs.forEach((fb) => {
      // after 50ms, check if it needs to "explode"? 
      // The original code checks if (left + 75 > windowWidth) 
      // For simplicity, we'll just remove after ~3s or so
      const timer = setTimeout(() => {
        // first "explode"
        setFireballs((prev) =>
          prev.map((x) => (x.id === fb.id ? { ...x, state: "explode" } : x))
        );
        // then remove after 500ms
        setTimeout(() => removeFireball(fb.id), 500);
      }, 3000);
      return () => clearTimeout(timer);
    });
  }, [fireballs]);

  return (
    <>
      <Stage>
        {/* Ken */}
        <KenBase
          id="ken"
          className={kenClasses.join(" ")}
          /* the default inline style for marginLeft so we can update it */
          style={{ marginLeft: "150px" }}
        />
        {/* Fireballs */}
        {fireballs.map((fb) => (
          <Fireball
            key={fb.id}
            className={`${fb.state} ${fb.state === "moving" ? "moving" : ""}`}
          />
        ))}
      </Stage>

      <Commands>
        <h1>Control Ken with your keyboard</h1>
        <div>
          Punch: <button onClick={punch}>a</button>
          <br />
          Kick: <button onClick={kick}>z</button>
          <br />
          Reverse Kick: <button onClick={rkick}>e</button>
          <br />
          <br />
          Tatsumaki: <button onClick={tatsumaki}>q</button>
          <br />
          Hadoken: <button onClick={hadoken}>s</button>
          <br />
          Shoryuken: <button onClick={shoryuken}>d</button>
          <br />
          <br />
          Jump: <button onClick={jump}>▲</button>
          <br />
          Walk:{" "}
          <button
            onMouseDown={walkLeft}
            onMouseUp={() => removeKenClass("walk")}
          >
            ◀
          </button>
          <button
            onMouseDown={walkRight}
            onMouseUp={() => removeKenClass("walk")}
          >
            ►
          </button>
          <br />
          Kneel: <button
            onMouseDown={kneel}
            onMouseUp={() => removeKenClass("kneel")}
          >
            ▼
          </button>
        </div>
      </Commands>
    </>
  );
};

export default Fighter;
