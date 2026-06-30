'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useGLTF, Plane, Box, Cylinder, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// We will import MobileMockup and TabletMockup in the page, and pass them as children or props
// But to avoid circular dependencies, we can just export the Scene and take the UI as props

interface CafeSceneProps {
  step: number;
  mobileUI: React.ReactNode;
  tabletUI: React.ReactNode;
  kdsUI: React.ReactNode;
}

export function CafeScene({ step, mobileUI, tabletUI, kdsUI }: CafeSceneProps) {
  const dataPacketRef = useRef<THREE.Mesh>(null);

  // Camera animations based on step
  useFrame((state, delta) => {
    // Define target positions based on step
    let targetPos = new THREE.Vector3(0, 8, 12);
    let targetLook = new THREE.Vector3(0, 0, 0);

    if (step === 0) {
      // Wide shot of Table
      targetPos.set(-4.5, 4.5, 6);
      targetLook.set(-3, 3.0, 0);
    } else if (step === 1) {
      // Scan & Browse (Menu Push-in)
      targetPos.set(-3, 3.5, 4.5);
      targetLook.set(-3, 3.0, 0);
    } else if (step === 2) {
      // Scrolling & Customizing (Slight orbit)
      targetPos.set(-2.2, 3.8, 4.2);
      targetLook.set(-3, 3.0, 0);
    } else if (step === 3) {
      // Add to Cart (Close up)
      targetPos.set(-3, 3.0, 3.8);
      targetLook.set(-3, 3.0, 0);
    } else if (step === 4) {
      // Tap to Fire (Action angle for Data Packet)
      targetPos.set(-3.8, 2.2, 3.5);
      targetLook.set(-3, 3.0, 0);
    } else if (step === 5) {
      // KDS Monitor (Pushed back to fix scaling)
      // KDS Absolute: [3, 5.5, -1.89]
      targetPos.set(3, 5.5, 5.0);
      targetLook.set(3, 5.5, -1.89);
    } else if (step === 6) {
      // POS Tablet (Pushed back)
      // Tablet Absolute: [5.5, 3.2, -1]
      targetPos.set(5.5, 4.0, 3.5);
      targetLook.set(5.5, 3.2, -1);
    } else if (step === 7) {
      // Preparation (Wide Kitchen Shot)
      targetPos.set(4, 5.5, 6.0);
      targetLook.set(4, 4.5, -1);
    } else if (step === 8) {
      // Order Ready Push-in (Back to Phone)
      targetPos.set(-3, 3.5, 4.0);
      targetLook.set(-3, 3.0, 0);
    } else if (step === 9) {
      // Checkout Focus
      targetPos.set(-3, 3.0, 3.8);
      targetLook.set(-3, 2.0, 0);
    }

    // 📱 Mobile Viewport Optimization:
    // If the aspect ratio is portrait (mobile), push the camera Z-distance back by 40%
    // to prevent the narrow FOV from horizontally cropping the 3D models.
    if (state.viewport.aspect < 1) {
      targetPos.z *= 1.4;
    }

    // Smoothly interpolate camera
    state.camera.position.lerp(targetPos, 0.05);
    
    // Add subtle floating breathing effect
    const time = state.clock.getElapsedTime();
    state.camera.position.y += Math.sin(time * 0.5) * 0.005;
    state.camera.position.x += Math.cos(time * 0.3) * 0.005;

    // Smoothly interpolate look target
    // We'll use a ref for the lookAt target
    if (!state.scene.userData.lookAtTarget) {
      state.scene.userData.lookAtTarget = new THREE.Vector3(0, 0, 0);
    }
    state.scene.userData.lookAtTarget.lerp(targetLook, delta * 3);
    state.camera.lookAt(state.scene.userData.lookAtTarget);

    // Data packet animation (triggers exactly on Step 4: Tap to Fire)
    if (dataPacketRef.current) {
      if (step === 4) {
        dataPacketRef.current.visible = true;
        // Simple fly animation from table (-3, 1.5, 0) to kitchen (4, 1.5, 0)
        // using a sine wave or just lerping
        const speed = 2;
        const time = state.clock.getElapsedTime();
        // Reset time tracking for the animation
        if (!dataPacketRef.current.userData.startTime) {
          dataPacketRef.current.userData.startTime = time;
          dataPacketRef.current.position.set(-3, 1.5, 0);
        }
        
        const progress = (time - dataPacketRef.current.userData.startTime) * speed;
        
        if (progress < 1) {
          const x = THREE.MathUtils.lerp(-3, 5.5, progress);
          const y = THREE.MathUtils.lerp(3.0, 3.2, progress) + Math.sin(progress * Math.PI) * 2; // Arc
          const z = THREE.MathUtils.lerp(0, -1, progress);
          dataPacketRef.current.position.set(x, y, z);
          
          // Flash scale
          dataPacketRef.current.scale.setScalar(1 + Math.sin(progress * Math.PI * 4) * 0.5);
        } else {
          dataPacketRef.current.visible = false;
        }
      } else {
        dataPacketRef.current.visible = false;
        dataPacketRef.current.userData.startTime = null;
      }
    }
  });

  return (
    <>
      <color attach="background" args={['#030305']} />
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 10]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 5, 0]} intensity={2} distance={10} color="#f97316" />
      <pointLight position={[4, 5, 0]} intensity={2} distance={10} color="#f59e0b" />

      {/* Floor */}
      <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <meshStandardMaterial color="#08080a" roughness={0.1} metalness={0.8} />
      </Plane>
      <ContactShadows position={[0, -1.99, 0]} opacity={0.6} scale={50} blur={2.5} far={4} color="#000000" />
      <gridHelper args={[50, 50, '#1a1a24', '#0f0f16']} position={[0, -1.98, 0]} />

      {/* Back Wall */}
      <Plane args={[50, 20]} position={[0, 8, -5]} receiveShadow>
        <meshStandardMaterial color="#050508" roughness={0.9} />
      </Plane>

      {/* Glowing Neon Sign on Wall */}
      <Html position={[2, 8, -4.9]} transform distanceFactor={8} occlude="blending">
        <div className="font-black text-6xl tracking-widest text-brand-500" style={{ textShadow: '0 0 20px rgba(249,115,22,0.8), 0 0 40px rgba(249,115,22,0.4)' }}>
          QR DINE
        </div>
      </Html>

      {/* ================= TABLE AREA ================= */}
      <group position={[-3, -2, 0]}>
        {/* Table Base */}
        <Cylinder args={[0.5, 0.5, 1, 32]} position={[0, 0.05, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#2a1f1a" />
        </Cylinder>
        {/* Table Top */}
        <Cylinder args={[1.5, 1.5, 0.1, 32]} position={[0, 2.6, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#3f2e22" roughness={0.9} />
        </Cylinder>

        {/* Chair 1 */}
        <group position={[0, 0, 2.2]}>
          <Cylinder args={[0.6, 0.6, 0.1, 32]} position={[0, 1.5, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#111" />
          </Cylinder>
          <Cylinder args={[0.05, 0.05, 1.5, 8]} position={[0, 0.75, 0]} castShadow>
            <meshStandardMaterial color="#333" metalness={0.8} />
          </Cylinder>
        </group>

        {/* Chair 2 */}
        <group position={[0, 0, -2.2]}>
          <Cylinder args={[0.6, 0.6, 0.1, 32]} position={[0, 1.5, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#111" />
          </Cylinder>
          <Cylinder args={[0.05, 0.05, 1.5, 8]} position={[0, 0.75, 0]} castShadow>
            <meshStandardMaterial color="#333" metalness={0.8} />
          </Cylinder>
        </group>

        {/* Table Lamp */}
        <group position={[-0.8, 2.65, -0.8]}>
          <Cylinder args={[0.1, 0.1, 0.8, 16]} position={[0, 0.4, 0]} castShadow>
            <meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
          </Cylinder>
          <Cylinder args={[0.3, 0.4, 0.4, 32]} position={[0, 0.9, 0]} castShadow>
            <meshStandardMaterial color="#fff" emissive="#f97316" emissiveIntensity={0.2} transparent opacity={0.9} />
          </Cylinder>
          <pointLight position={[0, 0.7, 0]} color="#ffedd5" intensity={1} distance={4} />
        </group>

        <Html 
          position={[0, 5.0, 0]} 
          transform 
          distanceFactor={2.5}
          rotation={[-0.2, 0, 0]}
        >
          <div style={{ width: 300, height: 600 }} className="relative pointer-events-auto bg-[#111116] rounded-[3rem] border-[12px] border-[#2a2a35] shadow-2xl shadow-black/80 flex flex-col overflow-hidden">
            {/* Dynamic Notch */}
            <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
              <div className="w-32 h-6 bg-[#2a2a35] rounded-b-3xl"></div>
            </div>
            {mobileUI}
          </div>
        </Html>
      </group>


      {/* ================= KITCHEN AREA ================= */}
      <group position={[4, -2, -1]}>
        {/* Counter */}
        <Box args={[4, 3, 2]} position={[0, 1.5, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#1a1a24" roughness={0.7} />
        </Box>
        {/* Counter Top */}
        <Box args={[4.2, 0.1, 2.2]} position={[0, 3.05, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#2a2a35" roughness={0.4} />
        </Box>

        {/* Espresso Machine */}
        <group position={[-1.2, 3.1, 0.5]}>
          <Box args={[0.8, 0.8, 0.6]} position={[0, 0.4, 0]} castShadow>
            <meshStandardMaterial color="#0f0f14" metalness={0.8} />
          </Box>
          <Cylinder args={[0.05, 0.05, 0.3]} position={[0.3, 0.6, 0.4]} rotation={[Math.PI/2, 0, 0]} castShadow>
            <meshStandardMaterial color="#ccc" metalness={1} roughness={0.1} />
          </Cylinder>
          <Box args={[0.2, 0.2, 0.2]} position={[0.3, 0.3, 0.4]} castShadow>
            <meshStandardMaterial color="#fff" />
          </Box>
        </group>

        {/* Receipt Printer */}
        <Box args={[0.4, 0.3, 0.4]} position={[1, 3.25, 0.5]} castShadow>
          <meshStandardMaterial color="#0a0a0f" />
        </Box>
        <Plane args={[0.3, 0.4]} position={[1, 3.45, 0.5]} rotation={[-Math.PI / 4, 0, 0]}>
          <meshStandardMaterial color="white" />
        </Plane>

        <Html 
          position={[1.5, 5.2, 0]} 
          transform 
          distanceFactor={3.5}
          rotation={[-0.1, -0.2, 0]}
        >
          <div style={{ width: 600, height: 450 }} className="relative pointer-events-auto bg-[#0d0d12] rounded-[2rem] border-[16px] border-[#2a2a35] shadow-2xl shadow-black/80 flex flex-col overflow-hidden">
            {tabletUI}
          </div>
        </Html>

        {/* KDS Monitor Screen */}
        <Box args={[4.5, 2.5, 0.2]} position={[-1, 6.5, -1]} castShadow receiveShadow>
          <meshStandardMaterial color="#0a0a0f" roughness={0.1} metalness={0.9} />
        </Box>
        {/* Monitor Stand/Mount */}
        <Cylinder args={[0.05, 0.05, 1.5]} position={[-1, 5.5, -1]} castShadow>
          <meshStandardMaterial color="#333" metalness={0.8} />
        </Cylinder>

        {/* Floating KDS UI */}
        <Html 
          position={[-1, 7.5, -0.89]} 
          transform 
          distanceFactor={4}
          rotation={[0, 0, 0]}
        >
          <div style={{ width: 375, height: 208 }} className="relative pointer-events-auto overflow-hidden">
            {kdsUI}
          </div>
        </Html>
      </group>


      {/* ================= DATA PACKET (STEP 3) ================= */}
      <mesh ref={dataPacketRef} visible={false} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#f97316" />
        <pointLight color="#f97316" intensity={5} distance={5} />
      </mesh>

    </>
  );
}
