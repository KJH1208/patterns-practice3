<template>
  <div class="demo-card">
    <div class="card-header">
      <h2>Proxy Pattern</h2>
      <p>Control access and caching</p>
    </div>

    <div class="card-body">
      <div class="status-grid">
        <div class="status-box">
          <span class="status-label">Image</span>
          <span class="status-value">sample-photo.jpg</span>
        </div>
        <div class="status-box">
          <span class="status-label">Access Count</span>
          <span class="status-value">{{ accessCount }}/3</span>
        </div>
        <div class="status-box">
          <span class="status-label">Status</span>
          <span class="status-value" :class="statusClass">{{ statusText }}</span>
        </div>
      </div>

      <div class="button-group">
        <button class="apple-btn" @click="accessImage">Access</button>
        <button class="apple-btn" @click="showInfo">Info</button>
        <button class="apple-btn secondary" @click="resetImage">Reset</button>
      </div>

      <div class="log-section">
        <div class="log-header">Activity Log</div>
        <div class="log-container">
          <div v-if="logs.length === 0" class="log-empty">No activity yet</div>
          <div v-for="(log, index) in logs" :key="index" class="log-line" :class="log.type">
            {{ log.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ProxyImage } from '../../patterns/structural/Proxy';

const proxyImage = ref<ProxyImage>(new ProxyImage('sample-photo.jpg'));
const logs = ref<{ message: string; type: string }[]>([]);
const accessCount = ref(0);

const statusText = computed(() => {
  if (accessCount.value >= 3) return 'Denied';
  if (accessCount.value > 0) return 'Cached';
  return 'Waiting';
});

const statusClass = computed(() => {
  if (accessCount.value >= 3) return 'denied';
  if (accessCount.value > 0) return 'cached';
  return 'waiting';
});

const addLog = (message: string, type: string = 'info') => {
  logs.value.push({ message, type });
  if (logs.value.length > 5) {
    logs.value.shift();
  }
};

const accessImage = () => {
  addLog('Attempting to access image...');
  proxyImage.value.display();
  accessCount.value++;

  if (accessCount.value <= 3) {
    addLog(`✓ Access granted (${accessCount.value}/3)`, 'success');
  } else {
    addLog('✗ Access denied', 'error');
  }
};

const showInfo = () => {
  const info = proxyImage.value.getInfo();
  addLog(`${info}`, 'info');
};

const resetImage = () => {
  proxyImage.value = new ProxyImage('sample-photo.jpg');
  accessCount.value = 0;
  addLog('Image reset', 'info');
};
</script>

<style scoped>
.demo-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 28px 28px 24px 28px;
  border-bottom: 1px solid #f5f5f7;
}

.card-header h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
  letter-spacing: -0.3px;
}

.card-header p {
  font-size: 13px;
  color: #86868b;
  font-weight: 400;
  letter-spacing: 0.2px;
}

.card-body {
  padding: 24px 28px;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.status-box {
  background: #f5f5f7;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.status-label {
  font-size: 11px;
  color: #86868b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.status-value {
  font-size: 13px;
  font-weight: 500;
  color: #1d1d1f;
  letter-spacing: -0.2px;
}

.status-value.waiting {
  color: #f59e0b;
}

.status-value.cached {
  color: #10b981;
}

.status-value.denied {
  color: #ef4444;
}

.button-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.apple-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background: #f5f5f7;
  color: #1d1d1f;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.2px;
}

.apple-btn:hover {
  background: #e8e8ed;
}

.apple-btn:active {
  background: #d9d9dc;
}

.apple-btn.secondary {
  background: transparent;
  border: 1px solid #d2d2d7;
}

.apple-btn.secondary:hover {
  background: #f5f5f7;
  border-color: #a1a1a6;
}

.log-section {
  background: #f5f5f7;
  border-radius: 8px;
  padding: 12px;
}

.log-header {
  font-size: 11px;
  font-weight: 600;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
}

.log-container {
  background: #ffffff;
  border-radius: 6px;
  padding: 10px;
  min-height: 80px;
  max-height: 200px;
  overflow-y: auto;
}

.log-empty {
  text-align: center;
  color: #d2d2d7;
  font-size: 11px;
  padding: 20px 0;
}

.log-line {
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
  font-size: 11px;
  padding: 4px 0;
  color: #1d1d1f;
  line-height: 1.4;
}

.log-line.success {
  color: #10b981;
}

.log-line.error {
  color: #ef4444;
}

.log-line.info {
  color: #0071e3;
}

@media (max-width: 768px) {
  .status-grid {
    grid-template-columns: 1fr;
  }

  .button-group {
    grid-template-columns: 1fr;
  }

  .card-header {
    padding: 20px 20px 16px 20px;
  }

  .card-body {
    padding: 16px 20px;
  }
}
</style>