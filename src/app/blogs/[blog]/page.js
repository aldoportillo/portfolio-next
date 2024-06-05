import LoadBalancer from '@/components/LoadBalancer';
import { motion } from 'framer-motion';
import React from 'react'


export function generateMetadata({params}){
    return {
        title: `${params.blog} | Aldo Portillo`,
        description: "A collection of blogs",
        image: "../../public/save-icon.png",
        favicon: "../../public/save-icon.png",
        };
}
function Blog({ params }) {
    console.log(params)
  return (
    <div>
      <h2>Load Balancing Algorithms</h2>

      <LoadBalancer />

      <h3>Static Load Balancing Algorithms</h3>

      <ul>
        <li>Round Robin</li>
        <li>Weighted Round-Robin</li>
        <li>Source IP Hash</li>
      </ul>

      <h3>Dynamic Load Balancing Algorithms</h3>

      <ul>
        <li>Least Connections</li>
        <li>Least Response Time</li>
      </ul>

      <h4>Round Robin</h4>

      

    </div>
  )
}

export default Blog