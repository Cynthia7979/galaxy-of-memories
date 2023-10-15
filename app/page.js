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
import { addStar, searchStar, addPlanet } from './starApi';
import SkyBox from './skybox'
import { AddMessageModal, AddStarModal } from './modals';
import Message from './message';

extend({ UnrealBloomPass, OutputPass })

export default function Home() {
  const randomValue = (min=-3, max=3, gap=5) => (Math.random() * (max/gap - min/gap) + min/gap) * gap
  const randomPos = () => [randomValue(), randomValue(), randomValue(-3, 1)]

  const { intensity, radius } = useState({
    intensity: { value: 0.34, min: 0, max: 1.5, step: 0.01 },
    radius: { value: 0.90, min: 0, max: 1, step: 0.01 }
  })
  
  const [zoom, setZoom] = useState(false)
  const [focusPos, setFocusPos] = useState({})
  const [currentFocus, setCurrentFocus] = useState(null)
  const [stars, setStars] = useState([
    {
      name: 'star1',
      born: 2000,
      death: 3000,
      description: "Lorum ipsum",
      color: '#fce6a6',
      position: randomPos(),
      planets: [
        {
          label: "I was here",
          color: "#3f3ffe"
        }
      ]
    },
    {
      name: 'star2',
      born: 2000,
      death: 3000,
      description: "Momento mori",
      color: '#fce616',
      position: randomPos(),
      planets: [
        {
          label: "I was here",
          color: "#3f3ffe"
        }
      ]
    }
  ])
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [starModalOpen, setStarModalOpen] = useState(false)
  const [messageVisible, setMessageVisible] = useState(false)
  const [message, setMessage] = useState('')

  const StarComponents = ({ stars }) => (
    <>
      {
        stars.map(({ name, color, position, born, death, description, planets }) => (
          <Star
            onClick_={() => (setZoom(!zoom), setFocusPos({x: position[0], y: position[1], z: position[2]}), setCurrentFocus(!zoom ? name : null), console.log(focusPos))}
            isFocus={currentFocus == name}
            key={name}
            color={color}
            label={name}
            born={born}
            death={death}
            description={description}
            position={position}
            planets={planets}
          />
        ))
      }
    </>
  )

  const showMessage = (message, lifeTime) => {
    setMessage(message)
    setMessageVisible(true)
    setTimeout(() => {
      setMessageVisible(false)
    }, lifeTime)
  }

  return (
    <main className={styles.main}>
      <NextUIProvider className={styles.position}>
        <Menu
          searchCallback={searchStar(stars, setZoom, setFocusPos, setCurrentFocus, showMessage)}
          messageCallback={() => setMessageModalOpen(true)}
          addStarCallback={() => setStarModalOpen(true)}
          inZoom={zoom}/>
      </NextUIProvider>

      <Message
        message={message}
        visible={messageVisible}
      />
      
      <AddMessageModal
        visible={messageModalOpen}
        closeModal={() => setMessageModalOpen(false)}
        addMessageCallback={addPlanet(stars, setStars, currentFocus)}
      />
      <AddStarModal
        visible={starModalOpen}
        closeModal={() => setStarModalOpen(false)}
        addStarCallback={addStar(stars, setStars)}
      />
      <Canvas camera={{fov: 50}}>
        <ambientLight />

        <Effects disableGamma>
          {/* threshhold has to be 1, so nothing at all gets bloom by default */}
          <unrealBloomPass threshold={0} strength={0.34} radius={0.90} />
          <outputPass args={[THREE.ACESFilmicToneMapping]} />
        </Effects>
        <Controls zoom={zoom} focus={focusPos} />

        <StarComponents stars={stars} />
        <SkyBox />
      </Canvas>
    </main>
  )
}
