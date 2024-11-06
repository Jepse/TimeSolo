<template>
<div class="menu-container">
  <router-link to="/achievements">
      <button>
        <img src="../../assets/icons/Icon_Award.png" alt="Achievements" />
      </button>
    </router-link>
    <router-link to="/inventory">
      <button>
        <img src="../../assets/icons/Icon_BackPack.png" alt="Inventory" />
      </button>
    </router-link>
    <router-link to="/quests">
      <button>
        <img src="../../assets/icons/Icon_Exclamation.png" alt="Quests" />
      </button>
    </router-link>
    <router-link to="/socials">
      <button>
        <img src="../../assets/icons/Icon_Heart.png" alt="Socials" />
      </button>
    </router-link>
    <router-link to="/skills">
      <button>
        <img src="../../assets/icons/Icon_Key.png" alt="Skills" />
      </button>
    </router-link>
    <router-link to="/account">
      <button>
        <img src="../../assets/icons/Icon_Ghost.png" alt="Account" />
      </button>
    </router-link>
  </div>
  <div class="bottom-right-container">
    <button class="small-button">
      <img src="../../assets/icons/Icon_Settings.png" alt="Settings" />
    </button>
    <button class="small-button" @click="logout">
      <img src="../../assets/icons/Icon_Power.png" alt="Logout" />
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
    const pb = new PocketBase('http://127.0.0.1:8090');
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

.bottom-right-container {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 20px;
}

button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

button img {
  max-width: 128px; 
  height: 128px;
}

.small-button img {
  max-width: 64px; 
  height: 64px;
}
</style>