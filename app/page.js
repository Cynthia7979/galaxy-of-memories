'use client'

import { useState, useEffect } from 'react';
import styles from './page.module.css'
import { Canvas } from "@react-three/fiber";
import Star from './star.js';
import { Button } from "@nextui-org/react";
import AddStar from './api/addStar'

export default function Home() {

  return (
    <main className={styles.main}>
      <AddStar
        name="GBP"
        born={2000}
        death={3000}
        description={"Test Description"}
        media={"None"}
      />
      <Canvas>
        <ambientLight />
        <pointLight position={[0, 1, 1]} decay={0} intensity={3}/>
        <Star position={[0, 0, 0]}/>
      </Canvas>
    </main>
  )
}
