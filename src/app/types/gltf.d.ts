declare module '*.glb' {
    const value: string;
    export default value;
  }
  
  export type GLTFResult = {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
  };
  