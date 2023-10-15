import { useRef, useState } from "react";
import { Html, useCursor } from "@react-three/drei";
import styles from "./star.module.css"
import Planet from "./planet";

export default function Star({ label: name, born, death, description, onClick_, isFocus, color="#fce6a6", position=[0, 0, 0], planets, ...props}) {
  const [hover, setHover] = useState(false)
  useCursor(hover)

  const starRadius = 0.5;

  const PlanetComponents = ({ planets }) => (
    <>
      {
        planets.map(({ label, color }, index) => (
          <Planet color={color} label={label} index={index} centerPos={position} key={index}/>
        ))
      }
    </>
  )

  return (
    <>
      {(hover || isFocus) ? (
        <Html center position={[position[0], position[1] - 1.3 * starRadius, position[2]]}>
            <div className={[styles.label, isFocus ? styles.largeLabel : null].join(' ')}>{name}</div>
        </Html>
      ) : null}
        
      {isFocus ? (
        <Html position={[position[0] + 1.3 * starRadius, position[1] + starRadius, position[2]]}>
          <div className={styles.detailsContainer}>
            <h1 className={styles.name}>{name} <span className={styles.life}>({born}-{death})</span></h1>
            <p className={styles.description}>{description}</p>
          </div>
        </Html>
      ) : null}

      {isFocus ? (
        <PlanetComponents planets={planets}/>
      ) : null}

      <Blooming {...props} color={color} position={position} onClick={(e) => onClick_()} hover={hover} setHover={setHover}>
        <sphereGeometry args={[starRadius]}/>
        <pointLight color={color} intensity={10} decay={2} />
      </Blooming>
    </>
  );
}

function Blooming({ children, color, setZoom, hover, setHover, ...props }) {
  return (
    <mesh {...props} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      {children}
      {/* Now, in order to get selective bloom we simply crank colors out of
        their natural spectrum. Where colors are normally defined between 0 - 1 we push them
        way out of range, into a higher defintion (HDR). What previously was [1, 1, 1] now could
        for instance be [10, 10, 10]. This requires that toneMapping is off, or it clamps to 1 */}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hover ? 1.5 : 1} toneMapped={false} />
    </mesh>
  )
}
