import * as THREE from "three";
import discPNG from "../assets/objects/disc.png";

export default class Stars {
   private scene: THREE.Scene;
   acceleration = 0.0005;
   private stars!: THREE.Points;
   private velocity: number[] = [];
   totalStars = 6000;
   constructor(scene: THREE.Scene) {
      this.scene = scene;
      this.init();
   }

   private init() {
      const geometry = new THREE.BufferGeometry();
      const textureLoader = new THREE.TextureLoader();
      const positions: number[] = [];
      const disc = textureLoader.load(discPNG);
      for (let index = 0; index < this.totalStars; index++) {
         const x = Math.random() * 100 - 50;
         const y = Math.random() * 100 - 50;
         const z = Math.random() * 200 - 100;
         positions.push(x, y, z);
         this.velocity.push(0);
      }
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
         color: 0xffffff,
         size: 0.35,
         map: disc,
      });
      this.stars = new THREE.Points(geometry, material);
      this.stars.position.z = -20;
      this.scene.add(this.stars);
   }

   setSpeed(speed: "fast" | "slow" = "slow") {
      if (speed === "slow") {
         this.acceleration = 0.0005;
      } else {
         this.acceleration = 0.0035;
      }
   }

   update() {
      for (let i = 0; i < this.totalStars; i++) {
         const z = this.stars.geometry.attributes.position.getZ(i);
         this.velocity[i] += this.acceleration;
         this.stars.geometry.attributes.position.setZ(i, z - this.velocity[i]);
         if (z < -100) {
            this.stars.geometry.attributes.position.setZ(i, 75 + Math.random() * 25);
            this.velocity[i] = 0;
         }
      }
      this.stars.geometry.attributes.position.needsUpdate = true;
      this.stars.rotation.z += 0.002;
   }
}
