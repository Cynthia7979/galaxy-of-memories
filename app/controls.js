import * as THREE from 'three';
import { useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import CameraControls from 'camera-controls';

CameraControls.install({ THREE });

function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3}) {
    const camera = useThree((state) => state.camera)
    const gl = useThree((state) => state.gl)
    const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
    return useFrame((state, delta) => {
        zoom ? pos.set(focus.x, focus.y, focus.z + 2.2) : pos.set(0, 0, 10)
        zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, 0)

        state.camera.position.lerp(pos, 0.5)
        state.camera.updateProjectionMatrix()

        controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
        return controls.update(delta)
    })
}

export default Controls;