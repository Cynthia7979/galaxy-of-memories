import { useRef, useState } from "react";

export default function Star(props) {
  const ref = useRef();
  return (
    <mesh
      {...props}
      ref={ref}
    >
      <sphereGeometry parameters={{radius: 10}} />
      <meshStandardMaterial color='white' />
    </mesh>
  );
}