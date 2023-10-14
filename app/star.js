import { useRef, useState } from "react";

export default function Star(props) {
  const ref = useRef();
  return (
    <mesh
      {...props}
      ref={ref}
    >
      <sphereGeometry />
      <meshStandardMaterial color='white' />
    </mesh>
  );
}