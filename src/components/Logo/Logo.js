"use client";
import styled from "styled-components";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";

export default function Logo() {
  const steps = useMemo(
    () => [
      "",
      "<",
      "</",
      "</A",
      "</Al",
      "</Alg",
      "</Algo",
      "</Alg",
      "</Ald",
      "</Aldo",
      "</Aldo ",
      "</AldoP",
      "</AldoPo",
      "</AldoPor",
      "</AldoPort",
      "</AldoPorti",
      "</AldoPortil",
      "</AldoPortill",
      "</AldoPortillo",
      "</AldoPortillo>",
    ],
    []
  );

  const [stepIndex, setStepIndex] = useState(0);

  const isTyping = stepIndex < steps.length - 1;

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isTyping, stepIndex]);

  return (
    <StyledLink href="/">
      {steps[stepIndex]}
      <Cursor isTyping={isTyping}>|</Cursor>
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  font-family: monospace;
  font-size: 1.5rem;
  text-decoration: none;
  color: var(--accent);
`;

const Cursor = styled.span`
  margin-left: 2px;
  animation: ${({ isTyping }) => (isTyping ? "blink 1s infinite" : "none")};
  display: ${({ isTyping }) => (isTyping ? "inline" : "none")};
  color: var(--secondary-text-color);
  
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;
