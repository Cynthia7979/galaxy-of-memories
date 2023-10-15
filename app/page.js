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
  const randomValue = (min=-3, max=3) => Math.random() * (max - min) + min
  const randomPos = () => [randomValue(), randomValue(), randomValue(-3, 1)]

  const { intensity, radius } = useState({
    intensity: { value: 0.34, min: 0, max: 1.5, step: 0.01 },
    radius: { value: 0.90, min: 0, max: 1, step: 0.01 }
  })
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})
  const [stars, setStars] = useState([
    {
      name: 'star1',
      color: '#fce6a6',
      position: randomPos()
    },
    {
      name: 'star2',
      color: '#fce616',
      position: randomPos()
    }
  ])

  const StarComponents = ({ stars }) => (
    <>
      {
        stars.map(({ name, color, position }) => (
          <Star setZoom={(focusPos) => (setZoom(!zoom), setFocus(focusPos))} key={name} color={color} label={name} position={position}/>
        ))
      }
    </>
  )

  return (
    <main className={styles.main}>
      <NextUIProvider>
        <Menu/>
      </NextUIProvider>
      <Canvas camera={{fov: 50}}>
        <ambientLight />

        <Effects disableGamma>
          {/* threshhold has to be 1, so nothing at all gets bloom by default */}
          <unrealBloomPass threshold={0} strength={0.34} radius={0.90} />
          <outputPass args={[THREE.ACESFilmicToneMapping]} />
        </Effects>
        <Controls zoom={zoom} focus={focus} />

        <StarComponents stars={stars} />
      </Canvas>
    </main>
  )
}

