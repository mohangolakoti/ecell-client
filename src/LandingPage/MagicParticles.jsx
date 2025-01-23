import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const MagicParticles = () => {
  const particlesRef = useRef(null);
  const particlesCount = 1000;

  // Create positions array
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10; // X
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
  }

  // Update particles' rotation
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="white"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export default MagicParticles;
