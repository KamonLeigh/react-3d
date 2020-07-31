import React, { useState, useRef } from 'react';
import { Canvas, useThree, extend, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {a, useSpring } from 'react-spring/three'
import './App.css';


// Need to run this outside of react component inorder to use OrbitControl
extend({ OrbitControls });

function Cube(props) {

  const [isBig, setIsBig ] = useState(false);
  const [ isHovered, setIsHovered] = useState(false);
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  // we want change the value of somthing without causing a rerender

  const size = isBig ? 2 : 1;
  const colour = isHovered ? 'pink' : 'salmon'

  return ( 
    <mesh 
      ref={ref}
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
