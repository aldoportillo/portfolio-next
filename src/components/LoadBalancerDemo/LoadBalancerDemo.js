"use client";
import LoadBalancer from "@/../public/loadBalancer.png";
import Server from "@/../public/server.png";
import Image from "next/image";
import styles from "./LoadBalancerDemo.module.css";
import React, { useState } from "react";
import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";

const range = (n) => Array.from({ length: n }, (_, i) => i);

function LoadBalancerDemo() {

  const id = React.useId();
  const [strategy, setStrategy] = useState("weightRoundRobin");
  const [animating, setAnimating] = useState(false);
  const [activeHit, setActiveHit] = useState(null);

  const [servers, setServers] = useState([
    { id: 0, name: "Server 0", weight: 0.5, hits: [], totalHits: 0 },
    { id: 1, name: "Server 1", weight: 0.3, hits: [], totalHits: 0 },
    { id: 2, name: "Server 2", weight: 0.2, hits: [], totalHits: 0 },
  ]);

  const sendRequest = () => {
    const newHitId = `hit-${Date.now()}`; // Unique ID for each hit
    setActiveHit(newHitId);

    setTimeout(() => {
      const updatedServers = servers.map((server) => {
        if (server.id === 1) { // Target Server 1 for this example
          return {
            ...server,
            hits: [...server.hits, newHitId],
            totalHits: server.totalHits + 1
          };
        }
        return server;
      });
      setServers(updatedServers);
      setActiveHit(null); // Clear the temporary hit from the load balancer
    }, 1000); // Duration for the hit to appear in the load balancer before moving
  };

  return (
    <div className={styles.demoWrapper}>
      <div className={styles.options}>
        <button
          onClick={() => setStrategy("roundRobin")}
          className={clsx({ [styles.selected]: strategy === "roundRobin" })}
        >
          Round Robin
        </button>
        <button
          onClick={() => setStrategy("weightRoundRobin")}
          className={clsx({
            [styles.selected]: strategy === "weightRoundRobin",
          })}
        >
          Weighted Round Robin
        </button>
        <button
          onClick={() => setStrategy("sourceIpHash")}
          className={clsx({ [styles.selected]: strategy === "sourceIpHash" })}
        >
          Source IP Hash
        </button>
      </div>
      <LayoutGroup>
        <div className={styles.animationWrapper}>
          <div className={styles.loadBalancer} onClick={sendRequest}>
            <Image src={LoadBalancer} alt="Load Balancer" width={100} height={100} />
            {activeHit && (
              <motion.div
                layoutId={activeHit}
                className={styles.hit}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
              >{activeHit}</motion.div>
            )}
          </div>
          <div className={styles.servers}>
            {servers.map((server) => (
              <div key={server.id} className={styles.server}>
                <Image src={Server} alt="Server" width={50} height={50} />
                {server.hits.map((hitId) => (
                  <motion.div
                    layoutId={hitId}
                    key={hitId}
                    className={styles.hit}
                  >{hitId}</motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </LayoutGroup>
    </div>
  );
}

export default LoadBalancerDemo;
