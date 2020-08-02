import React, { useState, useRef } from 'react';
import { Canvas, useThree, extend, useFrame } from 'react-three-fiber';
import { OrbitControls, Torus } from 'drei';
import {a, useSpring } from 'react-spring/three'
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
 *  In order the cast a shadow we need to tell the object to receive and cast
 *  a shadow
 */

// a means animation wrapper

function Cube(props) {

  const [isBig, setIsBig ] = useState(false);
  const [ isHovered, setIsHovered] = useState(false);
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  // we want change the value of something without causing a rerender

  const { size, x } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    x: isBig ? 2 : 0
  })

  const colour = isHovered ? 'pink' : 'salmon'

  return (
    <a.mesh
      ref={ref}
      {...props}
      scale={size}
      position-x={x}
      onClick={() => setIsBig(!isBig)}
      onPointerOut={() => setIsHovered(false)}
      onPointerOver={() => setIsHovered(true)}
      castShadow={true}
      receiveShadow={true}
    >
      <sphereBufferGeometry attach="geometry" args={[1, 8, 6]}/>
      <meshPhongMaterial
        roughness={0}
        metalness={0.5}
        attach="material"
        color={colour}
        clearcoat={1}
        flatShading={true}
        shininess={150}
        />
    </a.mesh>
  )
}

/**
 * You can use different types of material
 * like <meshStandardMaterial/> <meshPhysicalMaterial/>
 *
 */

// look on three.js for more details
// box args = [ width, height, depth]
// sphere args [radius, widthSegments, heightSegmentx]
// cylinder args [radiusTop, radiusBottom, height, radial segments]

function Plane() {
  return (
    <mesh
      receiveShadow={true}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, -5]}
    >
      <planeBufferGeometry attach="geometry" args={[15, 15]}/>
      <meshStandardMaterial attach="material" color="#d3d3d3"/>,
    </mesh>
  )
}

function Scene() {

// ambientLight illumantes all light equally thus doesn't cast shadows
// pointLight is a light emitted from a single point in all directions like a light from a light bulb
// spotLight is light where the area in which the covers increases e.g. conical

  return (
    <>
      <ambientLight/>
      <spotLight castShadow={true} intensity={0.6} position={[0, 10, 4]}/>
      <Cube rotation={[10, 20, 0]} position={[2, 2, 0]}/>
      <Cube rotation={[10, 10, 0]} position={[0, 0, 0]}/>
      <Torus args={[1, 0.2, 10, 30]} position={[-2, 1, -1]}>
        <meshPhongMaterial
          roughness={1}
          metalness={0.5}
          attach="material"
          color={"gold"}
          shininess={150}
          />
      </Torus>

      <Plane/>
      <OrbitControls/>
    </>
  )
}

function App() {
  return (
    <Canvas shadowMap={true}>
      <Scene/>
    </Canvas>
  );
}

export default App;
