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


function Scene() {

// ambientLight illumantes all light equally thus doesn't cast shadows
// pointLight is a light emitted from a single point in all directions like a light from a light bulb
// spotLight is light where the area in which the covers increases e.g. conical

  return (
    <>
      <ambientLight/>
      <pointLightintensity={0.6} position={[0, 10, 4]}/>
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
