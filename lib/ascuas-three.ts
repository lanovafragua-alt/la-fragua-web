import * as THREE from "three";

export function createAscuasEmbers(count = 88) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = THREE.MathUtils.randFloatSpread(8);
    positions[index * 3 + 1] = THREE.MathUtils.randFloatSpread(8);
    positions[index * 3 + 2] = THREE.MathUtils.randFloat(-4, 2);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: "#f59945",
    size: 0.028,
    transparent: true,
    opacity: 0.46,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}

export function centerAscuasModel(model: THREE.Object3D) {
  const bounds = new THREE.Box3().setFromObject(model);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());

  model.position.sub(center);

  return size;
}

export function styleAscuasModel(model: THREE.Object3D) {
  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const meshName = child.name.toLowerCase();
    const materials = Array.isArray(child.material) ? child.material : [child.material];

    for (const material of materials) {
      if (!(material instanceof THREE.MeshStandardMaterial)) continue;

      if (meshName.includes("single_color")) {
        material.color.set("#ec6526");
        material.emissive.set("#e84d1b");
        material.emissiveIntensity = 0.36;
        material.roughness = 0.3;
        continue;
      }

      if (meshName.includes("cubo")) {
        material.color.set("#f47a25");
        material.emissive.set("#ff6b1f");
        material.emissiveIntensity = 0.52;
        material.roughness = 0.34;
        continue;
      }

      if (meshName.includes("cilindro")) {
        material.color.set("#151313");
        material.roughness = 0.54;
        material.metalness = 0.35;
        continue;
      }

      const color = material.color;
      const isWarm = color.r > color.b * 1.28 && color.r > color.g * 1.02;
      material.roughness = Math.max(material.roughness, 0.28);

      if (isWarm) {
        material.emissive.copy(color).multiplyScalar(0.34);
        material.emissiveIntensity = 0.76;
      }
    }
  });
}
