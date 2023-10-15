import { Vector3 } from "three";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import { useEffect } from "react";

export default function Planet({ color, label, index, centerPos }) {
    const radius = 0.8 * (index + 1);
    return (
        <>
            <mesh position={[radius + centerPos[0], centerPos[1], centerPos[2]]} >
                <sphereGeometry args={[0.1, 32, 32]} />
                <meshBasicMaterial color={color}/>
            </mesh>
            <Orbit center={centerPos} radius={radius}/>
        </>
    )
}

const Orbit = ({ center = [0, 0, 0], radius = 1 }) => {
    const segments = 64
    const ref = useRef();
    const points = []
    const tilt = Math.PI / 6
    for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * 2 * Math.PI
        const x = radius * Math.cos(angle)
        const y = 0
        const z = radius * Math.sin(angle)
        const newX = x + center[0]
        const newY = y * Math.cos(tilt) - z * Math.sin(tilt) + center[1]
        const newZ = y * Math.sin(tilt) + z * Math.cos(tilt) + center[2]
        
        points.push(new Vector3(newX, newY, newZ))
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
