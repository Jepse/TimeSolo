<template>
    <div class="menu-container">
      <!-- Placeholder buttons -->
      <button-component>
        <img src="../../assets/images/AchievementsPng.png" alt="Achievements" />
      </button-component>
      <button-component>
        <img src="../../assets/images/InventoryPng.png" alt="Inventory" />
      </button-component>
      <button-component>
        <img src="../../assets/images/QuestsPng.png" alt="Quests" />
      </button-component>
      <button-component>
        <img src="../../assets/images/SocialsPng.png" alt="Socials" />
      </button-component>
      <button-component>
        <img src="../../assets/images/SkillsPng.png" alt="Skills" />
      </button-component>
      <button-component>
        <img src="../../assets/images/SettingsPng.png" alt="Settings" />
      </button-component>
    </div>
  </template>
  
  <script>
  import Achievements from './buttons/Achievements.vue';
  import Inventory from './buttons/Inventory.vue';
  import Quests from './buttons/Quests.vue';
  import Socials from './buttons/Socials.vue';
  import Skills from './buttons/Skills.vue';
  import Settings from './buttons/Settings.vue';
  
  export default {
    components: {
      Achievements,
      Inventory,
      Quests,
      Settings,
      Skills,
      Socials,
    },
  };
  </script>
  
  <style scoped>
.menu-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* This will ensure it takes the full viewport height when expanded */
  flex-direction: row;
  gap: 50px;
}
  button-component {
    background: none;
    border: none;
    cursor: pointer;
  }
  </style>
  
  