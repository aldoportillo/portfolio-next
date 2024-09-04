"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./ReverseLinkedListDemo.module.css";

export default function ReverseLinkedListDemo() {
  const [list, setList] = useState([
    { value: 1, next: 2 },
    { value: 2, next: 3 },
    { value: 3, next: 4 },
    { value: 4, next: 5 },
    { value: 5, next: null },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const nodeRefs = useRef([]);

  // Function to handle the progression of the node reversal
  const handleStep = () => {
    if (currentIndex < list.length) {
      let newList = [...list];
      const prevNode = previousIndex !== null ? list[previousIndex] : null;
      newList[currentIndex].next = prevNode ? prevNode.value : null;
      setList(newList);

      setPreviousIndex(currentIndex);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Function to handle reset
  const handleReset = () => {
    setList([
      { value: 1, next: 2 },
      { value: 2, next: 3 },
      { value: 3, next: 4 },
      { value: 4, next: 5 },
      { value: 5, next: null },
    ]);
    setCurrentIndex(0);
    setPreviousIndex(null);
  };

  // Render the nodes and arrows between them
  const renderNodes = () => {
    return list.map((node, index) => (
      <div
        key={index}
        className={styles.nodeWrapper}
        ref={(el) => (nodeRefs.current[index] = el)} // Save reference to each node
      >
        <div className={styles.node}>
          <div>{node.value}</div>
          <div className={styles.pointerInfo}>Next: {node.next ?? "null"}</div>
        </div>

        {index < list.length && (
          <motion.svg
            className={styles.arcArrow}
            width="100"
            height="50"
            viewBox="0 0 100 50"
            animate={{
              x: currentIndex > index ? -80 : 0,
              rotateY: currentIndex > index ? 180 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <path
              d="M10 40 Q50 0 90 40"
              stroke="#5eddac"
              strokeWidth="2"
              fill="transparent"
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="0"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#5eddac" />
              </marker>
            </defs>
          </motion.svg>
        )}
      </div>
    ));
  };

  return (
    <div className={styles.demoWrapper}>
      <div className={styles.linkedList}>{renderNodes()}</div>

      <div className={styles.controls}>
        <button onClick={handleStep} disabled={currentIndex >= list.length}>
          Process Node
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
