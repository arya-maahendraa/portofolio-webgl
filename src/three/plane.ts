import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Plane {
   private scene: THREE.Scene;
   private mixer!: THREE.AnimationMixer;
   private model: THREE.Group | false = false;
   isModelReady = false;
   private manager: THREE.LoadingManager;
   constructor(scene: THREE.Scene, manager: THREE.LoadingManager) {
      this.scene = scene;
      this.manager = manager;
      this.init();
   }

   private init() {
      const loader = new GLTFLoader(this.manager);
      loader.load("./assets/stylized_ww1_plane/scene.gltf", (gltf) => {
         this.model = gltf.scene;
         // this.model.position.set(1.2, 1.95, 0);
         this.model.position.set(0, 0.75, 0);
         this.scene.add(this.model);
         this.mixer = new THREE.AnimationMixer(this.model);
         this.mixer.clipAction(gltf.animations[0]).play();
         this.isModelReady = true;
      });
   }

   getCurrentPosition() {
      if (this.model) {
         return {
            x: this.model.position.x,
            y: this.model.position.y,
            z: this.model.position.z,
         };
      }
      return {
         x: 0,
         y: 0,
         z: 0,
      };
   }

   setPosition(x: number, y: number, z: number) {
      if (this.model) {
         this.model.position.set(x, y, z);
      }
   }

   update(clock: THREE.Clock) {
      if (this.isModelReady) {
         this.mixer.update(clock.getDelta());
      }
   }
}
