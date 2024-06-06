import React from 'react';
import { Code } from 'bright';

import theme from './theme';
import styles from './CodeBlock.module.css';

function CodeBlock(props) {
  return (
    <Code
      {...props}
      theme={theme}
      className={styles.wrapper}
    />
  );
}

export default CodeBlock;
