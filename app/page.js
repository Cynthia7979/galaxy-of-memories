'use client'

import { useState, useEffect } from 'react';
import styles from './page.module.css'
import { Canvas, camera, useThree } from "@react-three/fiber";
import Star from './star.js';
import { Vector3 } from 'three';

export default function Home() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0
  })

  const onMouseMove = (ev) => {
    ev.preventDefault();
    setMouse({
      x: (ev.clientX / window.innerWidth) * 2 - 1,
      y: -(ev.clientY / window.innerHeight) * 2 - 1
    })
  }

  return (
    <main className={styles.main}>
      <Canvas onMouseMove={onMouseMove}>
        <ambientLight />
        <DynamicPointLight mouse={mouse}/>
        <Star position={[0, 0, 0]}/>
      </Canvas>
    </main>
  )
}

function DynamicPointLight(mouse) {
  let pos = new Vector3(0, 0, 1);

  useThree(({ camera }) => {
    let vector = new Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    let direction = vector.sub(camera.position).normalize();
    let distance = -camera.position.z / vector.z;
    let final = camera.position.clone().add(direction.multiplyScalar(distance))
    pos.set(final.x, final.y, 2);
    console.log(pos)
  });

  console.log(pos)

  return <pointLight position={pos} decay={0} intensity={3}/>
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