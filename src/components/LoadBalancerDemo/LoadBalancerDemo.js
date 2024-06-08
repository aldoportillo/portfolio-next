"use client";
import LoadBalancer from "@/../public/loadBalancer.png";
import Server from "@/../public/server.png";
import Image from "next/image";
import styles from "./LoadBalancerDemo.module.css";
import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";

const hashIP = (ip) => {
  const ipParts = ip.split(".");
  return ipParts.reduce((acc, part) => {
    return acc + parseInt(part);
  }, 0);
};

function LoadBalancerDemo() {

  const [strategy, setStrategy] = useState("weightRoundRobin");
  const [activeHit, setActiveHit] = useState(null);
  const requestCounter = useRef(0);
  const [requestsPerCycle, setRequestsPerCycle] = useState(10);

  const [servers, setServers] = useState([
    { id: 0, name: "Server 0", weight: 0.5, hits: [] },
    { id: 1, name: "Server 1", weight: 0.3, hits: [] },
    { id: 2, name: "Server 2", weight: 0.2, hits: [] },
  ]);

  const getNextServerIndex = (ip) => {
    if (strategy === "roundRobin") {

      console.log(requestCounter.current % servers.length)
      return requestCounter.current % servers.length;
    } else if (strategy === "sourceIpHash") {
      const hashedIp = hashIP(ip);
      console.log(hashedIp)
      return hashedIp % servers.length;
    } else if (strategy === "weightRoundRobin") {
      let totalWeight = servers.reduce((acc, server) => acc + server.weight, 0);
      let currentCount = requestCounter.current % requestsPerCycle;
      let weightSum = 0;

      for (let i = 0; i < servers.length; i++) {
        weightSum += (servers[i].weight / totalWeight) * requestsPerCycle;
        if (currentCount < weightSum) {
          return i;
        }
      }
    }
  }

  const sendRequest = () => {
    const randomIP = Math.floor(Math.random() * 256) + "." + Math.floor(Math.random() * 256) + "." + Math.floor(Math.random() * 256) + "." + Math.floor(Math.random() * 256);
    const newHitId = `hit-${randomIP}`; 
    setActiveHit(newHitId);

    const serverIndex = getNextServerIndex(randomIP);

    setTimeout(() => {
      const updatedServers = servers.map((server) => {
        if (server.id === serverIndex) { 
          return {
            ...server,
            hits: [...server.hits, newHitId]
          };
        }
        return server;
      });
      requestCounter.current += 1;
      setServers(updatedServers);
      setActiveHit(null);
    }, 1000);
  };

  useEffect(() => {
    requestCounter.current = 0;
    setServers([
      { id: 0, name: "Server 0", weight: 0.5, hits: []},
    { id: 1, name: "Server 1", weight: 0.3, hits: [] },
    { id: 2, name: "Server 2", weight: 0.2, hits: [] },
    ]);
  }, [strategy]);

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
