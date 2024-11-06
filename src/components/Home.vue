<template>
  <div class="home-layout">
    <!-- Canvas section -->
    <div :class="['canvas-container', 'fade-in', expandedSection === 'canvas' ? 'full-view' : '']">
      <Canvas3D />
      <img
        v-if="expandedSection === 'canvas'"
        @click="toggleExpand('canvas')"
        src="../assets/icons/Icon_Exit.png"
        alt="Minimize"
        class="action-icon"
      />
      <img
        v-else
        @click="toggleExpand('canvas')"
        src="../assets/icons/Icon_Expand.png"
        alt="Expand"
        class="action-icon"
      />
    </div>

    <!-- Timeline section -->
    <div
      v-if="expandedSection !== 'canvas'"
      :class="['timeline-container', 'fade-in', expandedSection === 'timeline' ? 'full-view' : '']"
    >
      <Timeline />
      <img
        v-if="expandedSection === 'timeline'"
        @click="toggleExpand('timeline')"
        src="../assets/icons/Icon_Exit.png"
        alt="Minimize"
        class="action-icon"
      />
      <img
        v-else
        @click="toggleExpand('timeline')"
        src="../assets/icons/Icon_Expand.png"
        alt="Expand"
        class="action-icon"
      />
    </div>

    <!-- Menu section -->
    <div
      v-if="expandedSection !== 'canvas' && expandedSection !== 'timeline'"
      :class="['menu-container', 'fade-in']"
    >
      <Menu />
    </div>
  </div>
</template>

<script>
import Canvas3D from './canvas/canvas3D.vue';
import Timeline from './timeline/Timeline.vue';
import Menu from './menu/Menu.vue';

export default {
  components: {
    Canvas3D,
    Timeline,
    Menu,
  },
  data() {
    return {
      expandedSection: null, // Tracks which section is expanded
    };
  },
  methods: {
    toggleExpand(section) {
      this.expandedSection = this.expandedSection === section ? null : section;
    },
  },
  mounted() {
    // Add the fade-in class to the containers when the component is mounted
    const containers = this.$el.querySelectorAll('.canvas-container, .timeline-container, .menu-container');
    containers.forEach(container => {
      container.classList.add('fade-in');
    });
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 1s ease-in-out;
}

.home-layout {
  display: grid;
  grid-template-columns: 1fr 2fr; /* Canvas takes one-third, the others two-thirds */
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  height: 100vh;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.canvas-container {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  position: relative;
  border-radius: 10px;
  background-color: rgb(56, 56, 56);
  box-sizing: border-box;
}

.timeline-container {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  position: relative;
  border-radius: 10px;
  background-color: rgb(56, 56, 56);
  box-sizing: border-box;
}

.menu-container {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  position: relative;
  border-radius: 10px;
  background-color: rgb(56, 56, 56);
  box-sizing: border-box;
}

.full-view {
  grid-column: 1 / 3 !important; /* Full width */
  grid-row: 1 / 3 !important; /* Full height */
  z-index: 10;
  width: 100%;
  height: 100%;
}

button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.action-icon {
  cursor: pointer;
  width: 64px;
  height: 64px;
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.action-icon:hover {
  opacity: 0.3; /* Optional hover effect */
}

</style>