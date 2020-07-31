import React, { useState } from 'react';
import { Canvas, useThree, extend } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';


// Need to run this outside of react component inorder to use OrbitControl
extend({ OrbitControls });

function Cube(props) {

  const [isBig, setIsBig ] = useState(false);
  const [ isHovered, setIsHovered] = useState(false);

  const size = isBig ? 2 : 1;
  const colour = isHovered ? 'pink' : 'salmon'

  return (
    <mesh 
      {...props}
      onClick={() => setIsBig(!isBig)}
      onPointerOut={() => setIsHovered(false)}
      onPointerOver={() => setIsHovered(true)}

    >
      <boxBufferGeometry attach="geometry" args={[size, size, size]}/>
      <meshStandardMaterial attach="material" color={colour}/>
    </mesh>
  )
}

function Scene() {
  // domElemnt refers to the canvas
  const {
    camera,
    gl: {
      domElement
    }
  } = useThree();


  return (
    <>
      <ambientLight/>
      <pointLight position={[-1, 2, 4]}/>
      <Cube rotation={[10, 20, 0]} position={[2, 2, 0]}/>
      <Cube rotation={[10, 10, 0]} position={[0, 0, 0]}/>

      <orbitControls args={[camera, domElement]}/>
    </>
  )
}

function App() {
  return (
    <Canvas>
      <Scene/>
    </Canvas>
  );
}

export default App;
