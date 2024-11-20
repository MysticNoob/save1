import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useThemeStore } from '../store/themeStore';

const Globe = ({ scale = 1, position = [0, 0, 0], isLanding = false }) => {
  const meshRef = useRef();
  const { currentTheme } = useThemeStore();

  const themeColors = {
    blue: '#3B82F6',
    purple: '#8B5CF6',
    gold: '#F59E0B'
  };

  // Create detailed globe geometry
  const globeGeometry = new THREE.IcosahedronGeometry(1, 16);
  const wireframe = new THREE.WireframeGeometry(globeGeometry);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: themeColors[currentTheme],
    transparent: true,
    opacity: 0.5
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      if (isLanding) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      }
    }
  });

  return (
    <group ref={meshRef} scale={scale} position={position}>
      {/* Base sphere with glowing material */}
      <Sphere args={[1, 64, 64]}>
        <meshPhongMaterial
          color={themeColors[currentTheme]}
          emissive={themeColors[currentTheme]}
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
          shininess={100}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <primitive object={new THREE.LineSegments(wireframe, lineMaterial)} />

      {/* Outer glow */}
      <Sphere args={[1.1, 64, 64]}>
        <meshPhongMaterial
          color={themeColors[currentTheme]}
          emissive={themeColors[currentTheme]}
          emissiveIntensity={0.1}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Inner core glow */}
      <Sphere args={[0.9, 32, 32]}>
        <meshPhongMaterial
          color={themeColors[currentTheme]}
          emissive={themeColors[currentTheme]}
          emissiveIntensity={0.4}
          transparent
          opacity={0.2}
        />
      </Sphere>
    </group>
  );
};

const SocialIcon = ({ position, delay = 0, isLanding = false }) => {
  const meshRef = useRef();
  const { currentTheme } = useThemeStore();

  const themeColors = {
    blue: '#60A5FA',
    purple: '#A78BFA',
    gold: '#FCD34D'
  };

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + delay;
      const radius = isLanding ? 3 : 2;
      meshRef.current.position.x = position[0] + Math.cos(time * 0.5) * radius;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * radius;
      meshRef.current.position.z = position[2] + Math.cos(time * 0.3) * radius;
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.2, 16, 16]} position={position}>
      <meshPhongMaterial
        color={themeColors[currentTheme]}
        emissive={themeColors[currentTheme]}
        emissiveIntensity={0.8}
        transparent
        opacity={0.9}
      />
    </Sphere>
  );
};

const OrbitingIcons = ({ isLanding = false }) => {
  const positions = [
    [2, 0, 0],
    [0, 2, 0],
    [-2, 0, 0],
    [0, -2, 0],
    [1.5, 1.5, 0],
  ];

  return (
    <>
      {positions.map((position, index) => (
        <SocialIcon
          key={index}
          position={position}
          delay={index}
          isLanding={isLanding}
        />
      ))}
    </>
  );
};

export const ThreeAnimation = ({ isLoading = false, isLanding = false }) => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{
          position: [0, 0, isLanding ? 8 : 6],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <spotLight
          position={[0, 0, 10]}
          angle={0.5}
          penumbra={1}
          intensity={1}
          castShadow
        />
        
        <Globe 
          scale={isLanding ? 2.5 : (isLoading ? 1.8 : 1.2)} 
          position={[0, 0, 0]}
          isLanding={isLanding}
        />
        <OrbitingIcons isLanding={isLanding} />
        
        <OrbitControls
          enableZoom={isLanding}
          enablePan={isLanding}
          autoRotate
          autoRotateSpeed={isLanding ? 0.5 : 0.3}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
};