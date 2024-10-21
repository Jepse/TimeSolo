<template>
  <div class="canvas-container" ref="canvasContainer">
    <!-- Three.js canvas will be here -->
  </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default {
  name: 'Canvas3D',
  mounted() {
    this.initThreeJS();
    window.addEventListener('resize', this.onWindowResize); // Add listener for window resizing
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize); // Clean up the event listener when component is destroyed
  },
  methods: {
    initThreeJS() {
      // Set up scene, camera, and renderer
const container = this.$refs.canvasContainer;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Set background color
scene.background = new THREE.Color(0x383838);

// Add a simple ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// Add a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // white light
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Add a point light
const pointLight = new THREE.PointLight(0xffffff, 1, 100); // white light
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// Position the camera
camera.position.z = 1.5;
camera.position.y = 1;


      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      // Drag and drop functionality
      const loader = new GLTFLoader();
      const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const arrayBuffer = e.target.result;
          loader.parse(arrayBuffer, '', (gltf) => {
            scene.add(gltf.scene);
          });
        };
        reader.readAsArrayBuffer(file);
      };

      const handleDragOver = (event) => {
        event.preventDefault();
      };

      container.addEventListener('dragover', handleDragOver);
      container.addEventListener('drop', handleDrop);

      // Store references to camera and renderer for resizing
      this.camera = camera;
      this.renderer = renderer;
    },
    onWindowResize() {
      const container = this.$refs.canvasContainer;
      if (this.camera && this.renderer) {
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
      }
    }
  }
};
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
