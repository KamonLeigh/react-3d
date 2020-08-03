import * as THREE from 'three';
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import {TextureLoader} from 'three'
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

const tempObject = new THREE.Object3D();

function Boxes() {

  const ref = useRef();

  useFrame(() => {
    let i = 0;
      for(let x = 0; x < 6; x++) {
        for(let y = 0; y < 6; y++) {
          for(let z = 0; z < 6; z++) {
            const id = i++;
            tempObject.position.set(3-x, 3-y, 3-z);
            // build out a grid
            tempObject.updateMatrix();
            ref.current.setMatrixAt(id, tempObject.matrix);
          }
        }
      }
  })

  return (
    <instancedMesh ref={ref} args={[null, null, 216]}>
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}/>
      <meshPhongMaterial attach="material" color="teal"/>
    </instancedMesh>
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
      <Boxes/>
      <OrbitControls/>
    </>
  )
}

function App() {
  return (
    <>
      <Canvas>
        <Scene/>
      </Canvas>
    </>
  );
}

export default App;
