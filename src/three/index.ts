import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stars from "./stars";
import Plane from "./plane";
import { gsap } from "gsap";
import * as dat from "dat.gui";

export default class PlaneInSpace {
   private renderer: THREE.WebGLRenderer;
   private sizes: { h: number; w: number };
   private camera: THREE.PerspectiveCamera;
   private mousePos: { x: number; y: number } = { x: 0, y: 0 };
   // private currentCameraPos: { x: number; y: number; z: number } = { x: 3.5, y: 2.45, z: -0.5 };
   private currentCameraPos: { x: number; y: number; z: number } = { x: 0, y: 1.3, z: 3 };
   private scene: THREE.Scene;
   private pointLight1: THREE.PointLight;
   private hemisphereLight: THREE.HemisphereLight;
   private orbitControls: OrbitControls;
   private clock: THREE.Clock | false = false;
   private stars!: Stars;
   private plane!: Plane;
   private manager: THREE.LoadingManager;
   private mouseMoveAcceleration = 0.45;

   constructor(canvas: HTMLCanvasElement, manager: THREE.LoadingManager) {
      this.manager = manager;
      this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
      this.sizes = {
         h: window.innerHeight,
         w: window.innerWidth,
      };
      this.camera = new THREE.PerspectiveCamera(60, this.sizes.w / this.sizes.h, 0.5, 200);

      this.scene = new THREE.Scene();
      this.pointLight1 = new THREE.PointLight(0xffffff, 5);
      this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
      this.init();
      // this.initDatGui();
   }

   private initDatGui() {
      const gui = new dat.GUI();
      const cameraFolder = gui.addFolder("Camera");
      cameraFolder.add(this.camera.position, "x").min(-10).max(10).step(0.01).name("position.x");
      cameraFolder.add(this.camera.position, "y").min(-10).max(10).step(0.01).name("position.y");
      cameraFolder.add(this.camera.position, "z").min(-10).max(10).step(0.01).name("position.z");
   }

   private init() {
      this.camera.position.set(
         this.currentCameraPos.x,
         this.currentCameraPos.y,
         this.currentCameraPos.z
      );
      // Renderer
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.sizes.w, this.sizes.h);
      // Light
      this.pointLight1.position.set(2, 3, 4);
      this.scene.add(this.pointLight1);
      this.hemisphereLight.color.setHSL(0.6, 1, 0.6);
      this.hemisphereLight.groundColor.setHSL(0.095, 1, 0.75);
      this.hemisphereLight.position.set(0, 50, 0);
      this.scene.add(this.hemisphereLight);
      // Controls
      this.orbitControls.target.set(0, 1, 0);
      this.loadModel();
   }

   private loadModel() {
      this.stars = new Stars(this.scene);
      this.plane = new Plane(this.scene, this.manager);
   }

   animateHomeToAbout() {
      return new Promise<Boolean>((resolve, reject) => {
         const tl = gsap.timeline();
         const modelPos = this.plane.getCurrentPosition();
         this.mouseMoveAcceleration = 0.2;
         const updateCameraPos = () => {
            this.camera.position.set(
               this.currentCameraPos.x,
               this.currentCameraPos.y,
               this.currentCameraPos.z
            );
         };

         tl.to(this.currentCameraPos, {
            duration: 3,
            x: 1.5,
            y: 2.45,
            z: 4.2,
            ease: "power1.inOut",
            onUpdate: updateCameraPos,
         });
         tl.to(
            this.currentCameraPos,
            { duration: 3, z: 1.6, ease: "power1.inOut", onUpdate: updateCameraPos },
            ">-=1.15"
         );
         tl.to(
            modelPos,
            {
               duration: 3,
               x: 1.2,
               y: 1.2,
               ease: "power1.inOut",
               onUpdate: () => {
                  if (this.plane) {
                     this.plane.setPosition(modelPos.x, modelPos.y, modelPos.z);
                  }
               },
               onComplete: () => {
                  resolve(true);
               },
            },
            ">-=1.5"
         );
      });
   }
   animateAboutToHome() {
      return new Promise<Boolean>((resolve, reject) => {
         const tl = gsap.timeline();
         const modelPos = this.plane.getCurrentPosition();
         this.mouseMoveAcceleration = 0.45;
         const updateCameraPos = () => {
            this.camera.position.set(
               this.currentCameraPos.x,
               this.currentCameraPos.y,
               this.currentCameraPos.z
            );
         };

         tl.to(modelPos, {
            duration: 3,
            x: 0,
            y: 0.75,
            ease: "power1.inOut",
            onUpdate: () => {
               if (this.plane) {
                  this.plane.setPosition(modelPos.x, modelPos.y, modelPos.z);
               }
            },
         });
         tl.to(
            this.currentCameraPos,
            { duration: 3, z: 4.2, ease: "power1.inOut", onUpdate: updateCameraPos },
            ">-=1.45"
         );
         tl.to(
            this.currentCameraPos,
            {
               duration: 3,
               x: 0,
               y: 1.3,
               z: 3,
               ease: "power1.inOut",
               onUpdate: updateCameraPos,
               onComplete: () => {
                  resolve(true);
               },
            },
            ">-=2.75"
         );
      });
   }
   animateAboutToProject() {
      return new Promise<Boolean>((resolve, reject) => {
         const tl = gsap.timeline();
         const modelPos = this.plane.getCurrentPosition();
         const updateCameraPos = () => {
            this.camera.position.set(
               this.currentCameraPos.x,
               this.currentCameraPos.y,
               this.currentCameraPos.z
            );
         };
         tl.to(this.currentCameraPos, {
            duration: 5,
            z: -0.15,
            x: 4.2,
            ease: "power3.inOut",
            onUpdate: updateCameraPos,
         });
         tl.to(
            modelPos,
            {
               duration: 2,
               y: 1.95,
               ease: "power1.inOut",
               onUpdate: () => {
                  if (this.plane) {
                     this.plane.setPosition(modelPos.x, modelPos.y, modelPos.z);
                  }
               },
            },
            ">-=2.5"
         );
         tl.to(
            this.currentCameraPos,
            {
               duration: 2,
               x: 3.5,
               ease: "power3.inOut",
               onUpdate: updateCameraPos,
               onComplete: () => {
                  resolve(true);
               },
            },
            ">-=0.95"
         );
      });
   }
   animateProjectToAbout() {
      return new Promise<Boolean>((resolve, reject) => {
         const tl = gsap.timeline();
         const modelPos = this.plane.getCurrentPosition();
         this.mouseMoveAcceleration = 0.2;
         const updateCameraPos = () => {
            this.camera.position.set(
               this.currentCameraPos.x,
               this.currentCameraPos.y,
               this.currentCameraPos.z
            );
         };

         tl.to(this.currentCameraPos, {
            duration: 3,
            x: 1.5,
            y: 2.45,
            z: 4.2,
            ease: "power1.inOut",
            onUpdate: updateCameraPos,
         });
         tl.to(
            this.currentCameraPos,
            { duration: 3, z: 1.6, ease: "power1.inOut", onUpdate: updateCameraPos },
            ">-=1.15"
         );
         tl.to(
            modelPos,
            {
               duration: 3,
               x: 1.2,
               y: 1.2,
               ease: "power1.inOut",
               onUpdate: () => {
                  if (this.plane) {
                     this.plane.setPosition(modelPos.x, modelPos.y, modelPos.z);
                  }
               },
               onComplete: () => {
                  resolve(true);
               },
            },
            ">-=1.5"
         );
      });
   }
   animateProjectToConect() {
      return new Promise<Boolean>((resolve, reject) => {
         const tl = gsap.timeline();
         const modelPos = this.plane.getCurrentPosition();
         this.mouseMoveAcceleration = 0.01;
         const updateCameraPos = () => {
            this.camera.position.set(
               this.currentCameraPos.x,
               this.currentCameraPos.y,
               this.currentCameraPos.z
            );
         };

         tl.to(this.currentCameraPos, {
            duration: 5,
            x: 0,
            y: 6,
            ease: "power1.inOut",
            onUpdate: updateCameraPos,
         });
         tl.to(
            this.currentCameraPos,
            {
               duration: 4,
               y: 4.3,
               ease: "power1.inOut",
               onUpdate: updateCameraPos,
            },
            ">-=0.95"
         );
         tl.to(
            modelPos,
            {
               duration: 2,
               x: 0.9,
               ease: "power1.inOut",
               onUpdate: () => {
                  if (this.plane) {
                     this.plane.setPosition(modelPos.x, modelPos.y, modelPos.z);
                  }
               },
               onComplete: () => {
                  resolve(true);
               },
            },
            ">-=2.5"
         );
      });
   }

   async playAnimation(from: String, to: String) {
      if (from === "Home" && to === "About") {
         return await this.animateHomeToAbout();
      }
      if (from === "About" && to === "Home") {
         return await this.animateAboutToHome();
      }
      if (from === "About" && to === "Projects") {
         return await this.animateAboutToProject();
      }
      if (from === "Projects" && to === "About") {
         return await this.animateProjectToAbout();
      }
      if (from === "Projects" && to === "Connect") {
         return await this.animateProjectToConect();
      }
   }

   setMousePos(x: number, y: number) {
      this.mousePos = { x: x, y: y };
   }

   setStarsSpeed(starsSpeed: "fast" | "slow") {
      this.stars.setSpeed(starsSpeed);
   }

   isReady() {
      return this.plane.isModelReady;
   }

   onWindowResize() {
      // Update sizes
      this.sizes.w = window.innerWidth;
      this.sizes.h = window.innerHeight;
      // Update camera
      this.camera.aspect = this.sizes.w / this.sizes.h;
      this.camera.updateProjectionMatrix();
      // Update renderer
      this.renderer.setSize(this.sizes.w, this.sizes.h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
   }

   private updateOrbitControlPos() {
      const newX = ((this.mousePos.x / this.sizes.w) * 2 - 1) * this.mouseMoveAcceleration;
      const newy = (-(this.mousePos.y / this.sizes.h) * 2 + 1) * this.mouseMoveAcceleration;
      this.camera.position.x = this.currentCameraPos.x + newX;
      this.camera.position.y = this.currentCameraPos.y + newy;
   }

   render() {
      if (this.clock === false) this.clock = new THREE.Clock();
      this.updateOrbitControlPos();
      this.orbitControls.update();
      this.stars.update();
      this.plane.update(this.clock);
      this.renderer.render(this.scene, this.camera);
   }
}
