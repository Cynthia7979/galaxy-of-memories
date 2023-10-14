'use client'

import { useState, useEffect } from 'react';
import styles from './page.module.css'
import { Canvas } from "@react-three/fiber";
import Star from './star.js';

export default function Home() {

  return (
    <main className={styles.main}>
      <Canvas>
        <ambientLight />
        <pointLight position={[0, 1, 1]} decay={0} intensity={3}/>
        <Star position={[0, 0, 0]}/>
      </Canvas>
    </main>
  )
}
