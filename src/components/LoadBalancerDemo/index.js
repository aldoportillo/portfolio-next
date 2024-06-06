"use client";
import dynamic from 'next/dynamic';

const LoadBalancerDemo = dynamic(() => import('./LoadBalancerDemo.js'));

export default LoadBalancerDemo;