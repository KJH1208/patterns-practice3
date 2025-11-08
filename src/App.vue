<template>
  <div id="app">
    <header class="app-header">
      <div class="header-content">
        <div class="logo">Design Patterns</div>
        <p class="subtitle">Pattern Recognition Made Simple</p>
      </div>
    </header>

    <nav class="nav-container">
      <div class="nav-wrapper">
        <button
            v-for="tab in tabs"
            :key="tab.id"
            class="nav-item"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
        >
          {{ tab.icon }} {{ tab.name }}
        </button>
      </div>
    </nav>

    <main class="main-content">
      <section v-show="activeTab === 'builder'" class="tab-section">
        <BuilderDemo />
      </section>

      <section v-show="activeTab === 'proxy'" class="tab-section">
        <ProxyDemo />
      </section>

      <section v-show="activeTab === 'strategy'" class="tab-section">
        <StrategyDemo />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BuilderDemo from './components/demos/BuilderDemo.vue';
import ProxyDemo from './components/demos/ProxyDemo.vue';
import StrategyDemo from './components/demos/StrategyDemo.vue';

const activeTab = ref('builder');

const tabs = [
  { id: 'builder', icon: '🔨', name: 'Builder' },
  { id: 'proxy', icon: '🛡️', name: 'Proxy' },
  { id: 'strategy', icon: '💳', name: 'Strategy' }
];
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  background: #f5f5f7;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  color: #1d1d1f;
}

/* Header */
.app-header {
  padding: 60px 20px 40px 20px;
  text-align: center;
  border-bottom: 1px solid #e5e5e7;
  background: #ffffff;
}

.logo {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 13px;
  color: #86868b;
  font-weight: 400;
  letter-spacing: 0.3px;
}

/* Navigation */
.nav-container {
  background: #ffffff;
  border-bottom: 1px solid #e5e5e7;
  padding: 0 20px;
}

.nav-wrapper {
  display: flex;
  justify-content: center;
  gap: 40px;
  max-width: 600px;
  margin: 0 auto;
  padding: 12px 0;
}

.nav-item {
  padding: 8px 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #86868b;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  letter-spacing: 0.2px;
}

.nav-item:hover {
  color: #1d1d1f;
}

.nav-item.active {
  color: #1d1d1f;
  border-bottom-color: #1d1d1f;
}

/* Main Content */
.main-content {
  flex: 1;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  padding: 40px 20px;
}

.tab-section {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .app-header {
    padding: 40px 20px 30px 20px;
  }

  .logo {
    font-size: 24px;
  }

  .nav-wrapper {
    gap: 20px;
  }

  .nav-item {
    font-size: 12px;
    padding: 6px 0;
  }

  .main-content {
    padding: 24px 16px;
  }
}

@media (max-width: 640px) {
  .nav-wrapper {
    gap: 12px;
  }

  .nav-item {
    font-size: 11px;
    padding: 4px 0;
  }
}
</style>