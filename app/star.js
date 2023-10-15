import { useRef, useState } from "react";
import { useCursor } from "@react-three/drei";

export default function Star({ label, setZoom, color="#fce6a6", position=[0, 0, 0], ...props}) {
  return (
    <Blooming {...props} color={color} position={position} setZoom={setZoom}>
      <sphereGeometry args={[0.5]}/>
    </Blooming>
  );
}

function Blooming({ children, color, setZoom, ...props }) {
  const [hovered, hover] = useState(true)
  useCursor(!hovered)
  return (
    <mesh {...props} onClick={(e) => setZoom(e.object.position)} onPointerOver={() => hover(false)} onPointerOut={() => hover(true)}>
      {children}
      {/* Now, in order to get selective bloom we simply crank colors out of
        their natural spectrum. Where colors are normally defined between 0 - 1 we push them
        way out of range, into a higher defintion (HDR). What previously was [1, 1, 1] now could
        for instance be [10, 10, 10]. This requires that toneMapping is off, or it clamps to 1 */}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1 : 2} toneMapped={false} />
    </mesh>
  )
}
