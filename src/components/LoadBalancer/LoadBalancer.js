"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaServer } from 'react-icons/fa';
import { GiServerRack } from "react-icons/gi";
import styled from 'styled-components';
function LoadBalancerAnimation() {
  const [strategy, setStrategy] = useState("weightRoundRobin");
  const [requestNumber, setRequestNumber] = useState(0);
  const requestCounter = useRef(0);
  const [requestsPerCycle, setRequestsPerCycle] = useState(10);

  const [servers, setServers] = useState([
    { id: 0, name: "Server 0", weight: 0.5, hits: 0 },
    { id: 1, name: "Server 1", weight: 0.3, hits: 0 },
    { id: 2, name: "Server 2", weight: 0.2, hits: 0 }
  ]);

  const updateWeight = (id, newWeight) => {
    const updatedServers = servers.map(server => {
      if (server.id === id) {
        return { ...server, weight: newWeight };
      }
      return server;
    });
    setServers(updatedServers);
  };

  const getNextServerIndex = () => {
    if (strategy === "roundRobin") {
      return requestNumber % servers.length;
    } else if (strategy === "weightRoundRobin") {
      let totalWeight = servers.reduce((acc, server) => acc + server.weight, 0);
      let currentCount = requestCounter.current % requestsPerCycle;
      let weightSum = 0;

      for (let i = 0; i < servers.length; i++) {
        weightSum += servers[i].weight / totalWeight * requestsPerCycle;
        if (currentCount < weightSum) {
          requestCounter.current++;
          return i;
        }
      }
    } else if (strategy === "sourceIpHash") {
      return requestNumber % servers.length; 
    }
    return null;
  };

  const sendRequest = () => {
    const serverIndex = getNextServerIndex();
    if (serverIndex !== null) {
      const updatedServers = servers.map((server, index) => {
        if (index === serverIndex) {
          return { ...server, hits: server.hits + 1 };
        }
        return server;
      });
      setServers(updatedServers);
      console.log("Request sent to server", servers[serverIndex].name, "Hits:", servers[serverIndex].hits);
    }
    setRequestNumber(prev => prev + 1); 
  };

  return (
    <LoadBalancerAnimationWrapper>
      <BalancerAndServers>
        <Icon onClick={sendRequest}>
          <GiServerRack />
          <p>Load Balancer</p>
        </Icon>
        <Servers>
          {servers.map(server => (
            <Icon key={server.id}>
                <FaServer />
                <p>{server.name}</p>
                <p>{strategy === "weightRoundRobin" && <span>Weight: <input type="number" value={server.weight} onChange={e => updateWeight(server.id, parseFloat(e.target.value))} min="0" step="0.1" /></span>}</p>
                <p>Hits: {server.hits}</p>
            </Icon>
          ))}
        </Servers>
      </BalancerAndServers>
      <Options>
        <button onClick={() => setStrategy("roundRobin")}>Round Robin</button>
        <button onClick={() => setStrategy("weightRoundRobin")}>Weighted Round Robin</button>
        <button onClick={() => setStrategy("sourceIpHash")}>Source IP Hash</button>
        <div>
        {strategy === "weightRoundRobin" && (
          <>
            <label>Requests per Cycle: </label>
            <input type="number" value={requestsPerCycle} onChange={e => setRequestsPerCycle(parseInt(e.target.value, 10))} min="1" />
          </>
        )}
        </div>
      </Options>
    </LoadBalancerAnimationWrapper>
  );
}


export default LoadBalancerAnimation;

const LoadBalancerAnimationWrapper = styled.div`
  background-color: #333;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  width: 100%;
`;

const BalancerAndServers = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Servers = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  flex-grow: 1;
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  margin: 10px;

  svg {
    font-size: 2em;
    margin-bottom: 5px;
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;
