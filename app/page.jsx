'use client'
import styles from "./page.module.css";
import { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { OrbitControls, PresentationControls } from "@react-three/drei";
import OrbiitControls from "./orbitControls";
import Star from "./star";

export default function Home() {
    const [hasFocus, setHasFocus] = useState(false);
    const [focus, setFocus] = useState({x: 0, y: 0, z: 0});
    const [domFocus, setDomFocus] = useState(undefined);

    function changeFocus(position, domElement) {
        setFocus(position);
        setHasFocus(true);
        setDomFocus(domElement);
    }

    return (
        <main className={styles.main}>
            <Canvas
                camera={{position: [10, 10, 10], fov: 25}}
            >
                {/* <OrbiitControls /> */}
                <PresentationControls global rotation={[0, -Math.PI / 4, 0]} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]} enabled={!hasFocus}>
                    <Star position={[3, 3, 0]} onFocus={changeFocus} />
                    <Star position={[0, 3, 0]} onFocus={changeFocus} />
                    <Star position={[3, 0, 0]} onFocus={changeFocus} />
                    <CameraUpdateControl focus={focus} hasFocus={hasFocus} />
                </PresentationControls>
                <color attach="background" args={['#555555']} />
                <ambientLight />
            </Canvas>
        </main>
    )
}

function CameraUpdateControl(props) {
    const { focus, hasFocus } = props;
    useFrame((state, delta) => {
      easing.damp3(state.camera.position, [-1 + (state.pointer.x * state.viewport.width) / (hasFocus ? 3 : 30), (1 + state.pointer.y) / (hasFocus ? 2 : 20), 5.5], 0.5, delta)
    //   state.camera.position.lerp({x: focus.x + 15, y: focus.y + 15, z: focus.z + 15}, 0.03);
      state.camera.lookAt(focus.x, focus.y, focus.z)
    })
}
