import { extend, useThree } from "@react-three/fiber";
import { FlyControls } from "three/addons/controls/FlyControls";

extend({ FlyControls })

export default function Controls() {
    const { camera, gl } = useThree();
    return <flyControls
        attach={"flyControls"}
        args={[camera, gl.domElement]}
        movementSpeed={1}
        rollSpeed={Math.PI / 6}
        autoForward={false}
        dragToLook={true}
    />
}