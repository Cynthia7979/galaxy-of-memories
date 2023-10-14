'use client'

import { useState, useEffect } from 'react';
import styles from './page.module.css'
import { Canvas, camera, useThree } from "@react-three/fiber";
import Star from './star.js';
import { Vector3 } from 'three';

export default function Home() {
  const [MousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  })

  const [Camera, setCamera] = useState();

  const size = useWindowSize();
  // useThree(({ camera }) => setCamera(camera));

  return (
    <main className={styles.main}>
      <Canvas>
        <ambientLight />
        <pointLight position={[MousePosition.x, MousePosition.y, 1]} decay={0} intensity={3}/>
        <Star position={[0, 0, 0]}/>
      </Canvas>
    </main>
  )
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
     
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}