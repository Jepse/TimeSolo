<template>
  <div class="menu-container">
    <button>
      <img src="../../assets/images/AchievementsPng.png" alt="Achievements" />
    </button>
    <button>
      <img src="../../assets/images/InventoryPng.png" alt="Inventory" />
    </button>
    <button>
      <img src="../../assets/images/QuestsPng.png" alt="Quests" />
    </button>
    <button>
      <img src="../../assets/images/SocialsPng.png" alt="Socials" />
    </button>
    <button>
      <img src="../../assets/images/SkillsPng.png" alt="Skills" />
    </button>
    <button @click="logout">
      <img src="../../assets/images/SettingsPng.png" alt="Settings" />
    </button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import PocketBase from 'pocketbase';

export default {
  name: 'Menu',
  setup() {
    const router = useRouter();
    const pb = new PocketBase('http://127.0.0.1:8090'); // Adjust the URL as needed

    const logout = async () => {
      try {
        await pb.authStore.clear();
        router.push({ name: 'Login' });
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
.menu-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: row;
  gap: 50px;
}

button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

button img {
  width: 128px; 
  height: auto;
}
</style>