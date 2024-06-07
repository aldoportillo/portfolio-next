"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaServer } from "react-icons/fa";
import { GiServerRack } from "react-icons/gi";
import styled from "styled-components";

function LoadBalancerDemo() {
  const [strategy, setStrategy] = useState("weightRoundRobin");
  const [requestNumber, setRequestNumber] = useState(0);
  const requestCounter = useRef(0);
  const [requestsPerCycle, setRequestsPerCycle] = useState(10);
  const [activeRequests, setActiveRequests] = useState([]);

  const [servers, setServers] = useState([
    { id: 0, name: "Server 0", weight: 0.5, hits: 0 },
    { id: 1, name: "Server 1", weight: 0.3, hits: 0 },
    { id: 2, name: "Server 2", weight: 0.2, hits: 0 },
  ]);

  const updateWeight = (id, newWeight) => {
    const updatedServers = servers.map((server) => {
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
        weightSum += (servers[i].weight / totalWeight) * requestsPerCycle;
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

      const newRequest = {
        id: requestNumber,
        serverId: serverIndex,
      };
      setActiveRequests((current) => [...current, newRequest]);

      setTimeout(() => {
        setActiveRequests((current) =>
          current.filter((req) => req.id !== newRequest.id)
        );
      }, 1000);

      console.log(
        "Request sent to server",
        servers[serverIndex].name,
        "Hits:",
        servers[serverIndex].hits
      );
    }
    setRequestNumber((prev) => prev + 1);
  };

  useEffect(() => {
    setActiveRequests([]);
    setRequestNumber(0);
    requestCounter.current = 0;
    setServers([
      { id: 0, name: "Server 0", weight: 0.5, hits: 0 },
      { id: 1, name: "Server 1", weight: 0.3, hits: 0 },
      { id: 2, name: "Server 2", weight: 0.2, hits: 0 },
    ]);
  }, [strategy]);

  return (
    <LoadBalancerDemoWrapper>
      <Options>
        <Button
          onClick={() => setStrategy("roundRobin")}
          selected={strategy === "roundRobin"}
        >
          Round Robin
        </Button>
        <Button
          onClick={() => setStrategy("weightRoundRobin")}
          selected={strategy === "weightRoundRobin"}
        >
          Weighted Round Robin
        </Button>
        <Button
          onClick={() => setStrategy("sourceIpHash")}
          selected={strategy === "sourceIpHash"}
        >
          Source IP Hash
        </Button>
      </Options>
      <LoadBalancerAnimationWrapper>
        <BalancerAndServers>
          <Icon onClick={sendRequest}>
            <GiServerRack />
            <p>Load Balancer</p>
            <div>
              {strategy === "weightRoundRobin" && (
                <Input>
                  <label>RPS:</label>
                  <input
                    type="number"
                    value={requestsPerCycle}
                    onChange={(e) =>
                      setRequestsPerCycle(parseInt(e.target.value, 10))
                    }
                    min="1"
                  />
                </Input>
              )}
            </div>
          </Icon>
          <Servers>
            {servers.map((server) => (
              <Icon key={server.id}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaServer />
                  <Text>server-{server.id}</Text>
                  <Text>
                    {strategy === "weightRoundRobin" && (
                      <Input>
                        <label>Weight: </label>
                        <input
                          type="number"
                          value={server.weight}
                          onChange={(e) =>
                            updateWeight(server.id, parseFloat(e.target.value))
                          }
                          min="0"
                          step="0.1"
                        />
                      </Input>
                    )}
                  </Text>
                  <Text>Hits: {server.hits}</Text>
                </motion.div>
                {activeRequests.map(
                  (req) =>
                    req.serverId === server.id && (
                      <Request
                        key={req.id}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{ duration: 1 }}
                      >
                        Request: {req.id}
                      </Request>
                    )
                )}
              </Icon>
            ))}
          </Servers>
        </BalancerAndServers>
      </LoadBalancerAnimationWrapper>
    </LoadBalancerDemoWrapper>
  );
}

export default LoadBalancerDemo;

const LoadBalancerDemoWrapper = styled.div`
  background-color: #333;
  border-radius: 10px;
  padding: 0px 20px 10px 20px;
}`;

const Request = styled(motion.div)`
  background-color: #5eddac;
  color: #242424;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 5px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.selected ? "#4CAF50" : "#333")};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    background-color: ${(props) => (props.selected ? "#66bb6a" : "#555")};
  }
`;

const LoadBalancerAnimationWrapper = styled.div`
  background-color: #e6e8f0;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
  color: #333;

  svg {
    font-size: 2em;
    margin-bottom: 5px;
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  padding: 10px 0;
  width: 100%;
`;

const Text = styled.p`
  font-size: 0.6em;
`;

const Input = styled.span`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 10px;
  gap: 5px;

  input {
    font-size: 0.6em;
    width: 40px;
    margin-top: 5px;
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
  }

  input:focus {
    outline: none;
  }
`;
