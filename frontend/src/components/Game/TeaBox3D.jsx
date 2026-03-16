import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Decal, useTexture, Environment, ContactShadows, Text } from "@react-three/drei";
import * as THREE from "three";

/**
 * Box model details based on the selected template
 */
const BOX_PROPERTIES = {
  classic: {
    color: "#e6d5b8",
    roughness: 0.8,
    metalness: 0.1,
  },
  nature: {
    color: "#d0e0c0",
    roughness: 0.9,
    metalness: 0.05,
  },
  luxury: {
    color: "#1a1a2e",
    roughness: 0.3,
    metalness: 0.8, // More metallic for luxury look
  },
};

/**
 * 3D Model of the Tea Box using primitive geometry (Placeholder for real .glb)
 */
function TeaBoxModel({ activeBox, selectedDecors }) {
  const meshRef = useRef();
  const boxProps = BOX_PROPERTIES[activeBox] || BOX_PROPERTIES.classic;

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Hộp hình chữ nhật đứng (rộng 2, cao 3, sâu 1.5) */}
        <boxGeometry args={[2, 3, 1.5]} />
        <meshStandardMaterial 
          color={boxProps.color} 
          roughness={boxProps.roughness} 
          metalness={boxProps.metalness} 
        />

        {/* --- Nhãn nền (Label Background) --- */}
        <Decal 
          position={[0, 0.2, 0.76]} // Mặt trước (z = 0.75 + epsilon)
          rotation={[0, 0, 0]} 
          scale={[1.4, 1.8, 1]}
        >
          <meshStandardMaterial 
            color="#ffffff" 
            polygonOffset 
            polygonOffsetFactor={-1} 
            roughness={1} 
          />
        </Decal>

        {/* Label Text - MEDI-TEA */}
        <Text
          position={[0, 0.8, 0.78]}
          fontSize={0.25}
          color={activeBox === "luxury" ? "#e0c068" : "#2d3a1e"}
          font="/fonts/PlayfairDisplay-Bold.ttf" // Fallback to default if not found
          anchorX="center"
          anchorY="middle"
        >
          MEDI-TEA
        </Text>

        <Text
          position={[0, 0.5, 0.78]}
          fontSize={0.12}
          color="#5a6b4a"
          anchorX="center"
          anchorY="middle"
        >
          PREMIUM BLEND
        </Text>

        {/* --- Custom Decorations using Text/Sprites as placeholders --- */}
        {/* Ribbon */}
        {selectedDecors.has("ribbon-gold") && (
          <Decal position={[0, 1.2, 0.76]} rotation={[0, 0, 0]} scale={[2.1, 0.2, 1]}>
            <meshStandardMaterial color="#d4a017" polygonOffset polygonOffsetFactor={-2} />
          </Decal>
        )}
        {selectedDecors.has("ribbon-red") && (
          <Decal position={[0, 1.2, 0.76]} rotation={[0, 0, 0]} scale={[2.1, 0.2, 1]}>
            <meshStandardMaterial color="#c44536" polygonOffset polygonOffsetFactor={-2} />
          </Decal>
        )}
        {selectedDecors.has("ribbon-green") && (
          <Decal position={[0, 1.2, 0.76]} rotation={[0, 0, 0]} scale={[2.1, 0.2, 1]}>
            <meshStandardMaterial color="#6a9e35" polygonOffset polygonOffsetFactor={-2} />
          </Decal>
        )}

        {/* Stamps & Stickers as Floating Emojis (Simulation) */}
        {selectedDecors.has("stamp-seal") && (
          <Text position={[0.5, 0.8, 0.78]} fontSize={0.2} anchorX="center" anchorY="middle">
            🔴
          </Text>
        )}
        {selectedDecors.has("sticker-flower") && (
          <Text position={[-0.5, -0.2, 0.78]} fontSize={0.25} anchorX="center" anchorY="middle">
            🌸
          </Text>
        )}
        {selectedDecors.has("sticker-butterfly") && (
          <Text position={[0.4, -0.4, 0.78]} fontSize={0.25} anchorX="center" anchorY="middle" rotation={[0, 0, 0.2]}>
            🦋
          </Text>
        )}
        {selectedDecors.has("msg-love") && (
          <Text position={[0, -0.4, 0.78]} fontSize={0.15} color="#c44536" anchorX="center" anchorY="middle">
            Made with Love 💕
          </Text>
        )}
        {selectedDecors.has("msg-health") && (
          <Text position={[0, -0.4, 0.78]} fontSize={0.15} color="#2d3a1e" anchorX="center" anchorY="middle">
            Chúc Sức Khoẻ 💪
          </Text>
        )}

      </mesh>
    </group>
  );
}

/**
 * 3D Canvas Scene
 */
export default function TeaBox3D({ activeBox, selectedDecors }) {
  return (
    <div style={{ width: "100%", height: "100%", cursor: "grab" }}>
      <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
        {/* Ánh sáng */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        
        {/* Phản chiếu môi trường giúp hộp (đặc biệt là hộp luxury) trông đẹp hơn */}
        <Environment preset="city" />

        {/* Model */}
        <TeaBoxModel activeBox={activeBox} selectedDecors={selectedDecors} />

        {/* Đổ bóng trên mặt phẳng */}
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4} 
        />

        {/* Điều khiển xoay 360 độ */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={3} 
          maxDistance={6}
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2 + 0.1} // Hạn chế lật đáy quá nhiều
        />
      </Canvas>
      
      {/* Hướng dẫn tương tác */}
      <div style={{ 
        position: 'absolute', 
        bottom: '10px', 
        width: '100%', 
        textAlign: 'center', 
        fontSize: '0.8rem', 
        color: '#8fa89a',
        pointerEvents: 'none'
      }}>
        👆 Kéo chuột để xoay 360° hộp trà
      </div>
    </div>
  );
}
