'use client'

import { useState, useEffect } from 'react';
import styles from './page.module.css'
import { Canvas, extend, camera, useThree } from "@react-three/fiber";
import Star from './star.js';
import Menu from './menu';
import {NextUIProvider} from "@nextui-org/system";
import * as THREE from 'three'
import { Effects } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import Controls from './controls';

extend({ UnrealBloomPass, OutputPass })

export default function Home() {
  const { intensity, radius } = useState({
    intensity: { value: 0.34, min: 0, max: 1.5, step: 0.01 },
    radius: { value: 0.90, min: 0, max: 1, step: 0.01 }
  })

  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})

  return (
    <main className={styles.main}>
      <NextUIProvider>
        <Menu/>
      </NextUIProvider>
      <Canvas>
        <ambientLight />

        <Effects disableGamma>
          {/* threshhold has to be 1, so nothing at all gets bloom by default */}
          <unrealBloomPass threshold={1} strength={0.34} radius={0.90} />
          <outputPass args={[THREE.ACESFilmicToneMapping]} />
        </Effects>
        <Star setZoom={(objRef) => (setZoom(!zoom), setFocus(objRef))} />
        <Controls zoom={zoom} focus={focus} />
      </Canvas>
    </main>
  )
}

