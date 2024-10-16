import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './LongestConsecutiveSequenceDemo.module.css';

const LongestConsecutiveSequenceDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [array, setArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [consecutiveSequences, setConsecutiveSequences] = useState([]);

  useEffect(() => {
    if (array.length > 0) {
      const sorted = [...new Set(array)].sort((a, b) => a - b);
      setSortedArray(sorted);
      
      let longestSeq = [];
      let currentSeq = [sorted[0]];

      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] === sorted[i - 1] + 1) {
          currentSeq.push(sorted[i]);
        } else {
          if (currentSeq.length > longestSeq.length) {
            longestSeq = currentSeq;
          }
          currentSeq = [sorted[i]];
        }
      }

      if (currentSeq.length > longestSeq.length) {
        longestSeq = currentSeq;
      }

      setConsecutiveSequences(longestSeq);
    }
  }, [array]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddNumbers = () => {
    const numbers = inputValue.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
    setArray(numbers);
  };

  return (
    <div className={styles.sequenceContainer}>
      <h2>Longest Consecutive Sequence Visualization</h2>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter numbers separated by commas"
        />
        <button onClick={handleAddNumbers}>Visualize</button>
      </div>
      <div className={styles.arrayContainer}>
        {sortedArray.map((value, index) => (
          <motion.div
            key={index}
            className={`${styles.arrayElement} ${consecutiveSequences.includes(value) ? styles.highlight : ''}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {value}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LongestConsecutiveSequenceDemo;