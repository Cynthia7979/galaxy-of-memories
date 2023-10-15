import { Vector3 } from "three";
import { useLayoutEffect, useState } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useCursor, Html } from "@react-three/drei";
import styles from './planet.module.css'
import { useFrame } from "@react-three/fiber";

export default function Planet({ color, label, index, centerPos }) {
    const planetRef = useRef()
    const [hovered, setHovered] = useState(false)
    const [tOffset, setTOffset] = useState(0)
    const [savedT, setSavedT] = useState(0)
    const orbitRadius = 0.3 * (index + 1) + 1;
    const planetPosition = [orbitRadius + centerPos[0], centerPos[1], centerPos[2]]
    const planetRadius = 0.1
    useCursor(hovered, 'help')

    useFrame(({ clock }) => {
        if (hovered) {
            if (!savedT) setSavedT(clock.getElapsedTime())
            if (savedT) setTOffset(clock.getElapsedTime() - savedT)
        } else if (savedT) {
            setSavedT(0)
        }
        const t = (clock.getElapsedTime() - tOffset) * (1.6 / orbitRadius);  // Slower the further away
        const newPos = circularMotionAt(t, orbitRadius, centerPos)
        planetRef.current.position.x = hovered ? planetRef.current.position.x : newPos.x
        planetRef.current.position.y = hovered ? planetRef.current.position.y : newPos.y
        planetRef.current.position.z = hovered ? planetRef.current.position.z : newPos.z
    })

    return (
        <>
            {hovered ? (
            <Html center position={[planetRef.current.position.x + 1.5 * planetRadius, planetRef.current.position.y - 1.1 * planetRadius, planetRef.current.position.z]}>
                <div className={styles.label}>{label}</div>
            </Html>
            ) : null}
            <mesh position={planetPosition} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} ref={planetRef}>
                <sphereGeometry args={[planetRadius, 32, 32]} />
                <meshStandardMaterial color={color}/>
            </mesh>
            <Orbit center={centerPos} radius={orbitRadius}/>
        </>
    )
}

const Orbit = ({ center = [0, 0, 0], radius = 1 }) => {
    const segments = 64
    const ref = useRef();
    const points = []
    for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * 2 * Math.PI
        points.push(circularMotionAt(angle, radius, center))
    }
    points.push(points[0])
    useEffect(() => {
        ref.current.setFromPoints(points)
    })
    return (
        <line>
            <bufferGeometry ref={ref} />
            <lineBasicMaterial attach="material" color="#ffffff" linewidth={10} />
        </line>
    )
}

const circularMotionAt = (t, radius, center, tilt=Math.PI/6) => {
    const x = radius * Math.cos(t)
    const y = 0
    const z = radius * Math.sin(t)
    return new Vector3(x + center[0], y * Math.cos(tilt) - z * Math.sin(tilt) + center[1], y * Math.sin(tilt) + z * Math.cos(tilt) + center[2])
}
