import * as THREE from 'three';
import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './App.css';


/**
 * BufferGeometry vs Geometry
 *
 * BG is a more efficent representation of a G
 * G has more features
 *
 * <boxBufferGeometry/> is an example of a primitive
 */


/**
 * You can use different types of material
 * like <meshStandardMaterial/> <meshPhysicalMaterial/>
 *
 */

// look on three.js for more details
// box args = [ width, height, depth]
// sphere args [radius, widthSegments, heightSegmentx]
// cylinder args [radiusTop, radiusBottom, height, radial segments]


function Plant() {

  const ref = useRef();
  const gltf = useLoader(GLTFLoader, '/scene.gltf');

  useFrame(() => {
    ref.current.rotation.y += 0.01;
  })

  return (
    <primitive ref={ref} object={gltf.scene} position={[0,0,0]}/>
  )
}


function Scene() {

// ambientLight illumantes all light equally thus doesn't cast shadows
// pointLight is a light emitted from a single point in all directions like a light from a light bulb
// spotLight is light where the area in which the covers increases e.g. conical

  return (
    <>
      <ambientLight/>
      <pointLight intensity={0.6} position={[0, 10, 4]}/>
      <Suspense fallback={null}>
        <Plant/>
      </Suspense>
      <OrbitControls/>
    </>
  )
}

function App() {
  return (
    <>
      <Canvas style={{ position: 'absolute'}}>
        <Scene/>
      </Canvas>
      <h1>Plant</h1>
      <div>
        <h3>You can buy plant</h3>
        <button>Buy Plant</button>
      </div>
    </>
  );
}

/**
 * near and far is the range which is viewable from the camera
 */

export default App;
