"use client";

import React, { useState } from "react";
import styles from "./Flags.module.css";

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

function Flags({
  numOfColumns = 10,
  staggeredDelay = 80,
}) {
  const [flagType, setFlagType] = useState("spain");
  const [index, setIndex] = useState(0);

    const changeFlag = () => {
        setIndex(index + 1);

        const flagTypes = ["russia", "spain", "germany"];    
            setFlagType(flagTypes[index % 3]);

    }

  return (
    <div className={styles.container} onClick={changeFlag}>
      <div className={styles.flag}>
        {range(numOfColumns).map((index) => (
          <div
            key={index}
            className={styles.column}
            style={{
              ...FLAG_GRADIENTS[flagType],
              animationDelay: index * staggeredDelay + "ms",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
      </div>
      <div>
        <p className={styles.text}>I am considered a <span className={styles.accent}>polyglot</span></p>
        <p className={styles.small}>click to explore languages</p>
      </div>
    </div>
  );
}

export default Flags;

const range = (num) => Array.from({ length: num }, (_, i) => i);