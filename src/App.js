import React from 'react';
import { Canvas, useThree, extend } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';


// Need to run this outside of react component inorder to use OrbitControl
extend({ OrbitControls });

function Cube(props) {
  return (
    <mesh {...props}>
      <boxBufferGeometry attach="geometry" args={[2, 2, 1]}/>
      <meshStandardMaterial attach="material" color="orangered"/>
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
