import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useCursor } from "@react-three/drei";

export default function Star(props) {
  const [hover, setHover] = useState(false);

  const meshRef = useRef();
  const { onFocus, position } = props;

  useCursor(hover);

  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={() => onFocus({x: position[0], y: position[1], z: position[2]})}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <pointLight castShadow intensity={10} />
      <sphereGeometry args={[0.2, 30, 10]} />
      <meshStandardMaterial color={hover ? "white" : "yellow"}/>
    </mesh>
  );
}