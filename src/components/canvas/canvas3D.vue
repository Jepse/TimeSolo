<template>
  <div ref="container" class="canvas-container">
    <!-- Three.js canvas will be here -->
  </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default {
  name: 'Canvas3D',
  mounted() {
    const container = this.$refs.container;

    if (container) {
      this.initThreeJS(container);
      window.addEventListener('resize', this.onWindowResize);
    } else {
      console.error('Container element not found');
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  },
  methods: {
    initThreeJS(container) {
      // Set up scene, camera, and renderer
      const scene = new THREE.Scene();

      // Set background color
      scene.background = new THREE.Color(0x383838);

      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // Add a directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5).normalize();
      scene.add(directionalLight);

      // Add a point light
      const pointLight = new THREE.PointLight(0xffffff, 1, 100);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);

      // Add a hemisphere light
      const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
      scene.add(hemisphereLight);

      // Position the camera
      camera.position.z = 1.5;
      camera.position.y = 1.2;

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

      // Store references to camera and renderer
      this.camera = camera;
      this.renderer = renderer;
    },
    onWindowResize() {
      const container = this.$refs.container;

      if (container && this.camera && this.renderer) {
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
      } else {
        console.error('Container element or Three.js components not found');
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