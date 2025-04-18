// stars.js
import * as THREE from "three";

export function createStarField(count = 9000000) {
    const starGeometry = new THREE.SphereGeometry();
    const starVertices = [];

    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(starVertices, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.7,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    return stars;
}
