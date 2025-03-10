import { useGLTF } from '@react-three/drei';
import { GLTFResult } from '@/app/types/gltf';

export default function CardMesh() {
  const { nodes } = useGLTF('/card.glb') as GLTFResult;
  
  return (
    <mesh geometry={nodes.Card.geometry}>
      <meshPhysicalMaterial
        roughness={0.1}
        metalness={0.9}
        clearcoat={1}
        transmission={0.8}
      />
    </mesh>
  );
}
