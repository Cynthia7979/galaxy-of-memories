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
        <Shape color="#fce6a6" position={[0, 0, 0]} onZoom={(objectRef) => (setZoom(!zoom), setFocus(objectRef))} >
          <circleGeometry args={[0.8, 64]} />
        </Shape>
        <Controls zoom={zoom} focus={focus} />
      </Canvas>
    </main>
  )
}

function Shape({ children, color, onZoom, ...props }) {
  const [hovered, hover] = useState(true)
  return (
    <mesh {...props} onClick={(e) => onZoom(e.object.position)} onPointerOver={() => hover(false)} onPointerOut={() => hover(true)}>
      {children}
      {/* Now, in order to get selective bloom we simply crank colors out of
        their natural spectrum. Where colors are normally defined between 0 - 1 we push them
        way out of range, into a higher defintion (HDR). What previously was [1, 1, 1] now could
        for instance be [10, 10, 10]. This requires that toneMapping is off, or it clamps to 1 */}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1 : 2} toneMapped={false} />
    </mesh>
  )
}
