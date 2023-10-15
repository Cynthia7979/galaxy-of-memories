import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';

export default function SkyBox() {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    const texture = loader.load([
        '/front.png',
        '/back.png',
        '/top.png',
        '/bottom.png',
        '/left.png',
        '/right.png'
    ])
    scene.background = texture;
}