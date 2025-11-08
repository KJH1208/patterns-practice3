<template>
  <div class="demo-section">
    <h2>🛡️ Proxy Pattern Demo</h2>
    <p class="description">객체 접근을 제어하고 캐싱하는 Proxy 패턴</p>

    <div class="controls">
      <button class="btn btn-access" @click="accessImage">🖼️ 이미지 접근</button>
      <button class="btn btn-info" @click="showInfo">ℹ️ 정보 표시</button>
      <button class="btn btn-clear" @click="resetImage">🔄 초기화</button>
    </div>

    <div class="info-panel">
      <div class="info-item">
        <span class="label">현재 이미지:</span>
        <span class="value">{{ currentImage }}</span>
      </div>
      <div class="info-item">
        <span class="label">접근 횟수:</span>
        <span class="value">{{ accessCount }}/3</span>
      </div>
      <div class="info-item">
        <span class="label">상태:</span>
        <span class="value" :class="statusClass">{{ statusText }}</span>
      </div>
    </div>

    <div class="log-section">
      <h3>📋 실행 로그</h3>
      <div class="log-container">
        <div v-if="logs.length === 0" class="empty-log">로그가 없습니다</div>
        <div v-for="(log, index) in logs" :key="index" class="log-item" :class="log.type">
          {{ log.message }}
        </div>
      </div>
      <button v-if="logs.length > 0" class="btn btn-small" @click="clearLogs">로그 지우기</button>
    </div>

    <div class="code-section">
      <details>
        <summary>💻 코드 보기</summary>
        <pre><code>{{ codeExample }}</code></pre>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ProxyImage } from '../../patterns/structural/Proxy';

const proxyImage = ref<ProxyImage>(new ProxyImage('sample-photo.jpg'));
const logs = ref<{ message: string; type: string }[]>([]);
const accessCount = ref(0);
const currentImage = ref('sample-photo.jpg');

const statusText = computed(() => {
  if (accessCount.value >= 3) return '❌ 접근 제한됨';
  if (accessCount.value > 0) return '⚡ 캐시됨';
  return '🔄 대기 중';
});

const statusClass = computed(() => {
  if (accessCount.value >= 3) return 'denied';
  if (accessCount.value > 0) return 'cached';
  return 'waiting';
});

const addLog = (message: string, type: string = 'info') => {
  const timestamp = new Date().toLocaleTimeString('ko-KR');
  logs.value.push({
    message: `[${timestamp}] ${message}`,
    type
  });
  // 최대 10개까지만 표시
  if (logs.value.length > 10) {
    logs.value.shift();
  }
};

const accessImage = () => {
  addLog('🖼️ 이미지 접근 시도...');
  proxyImage.value.display();
  accessCount.value++;

  if (accessCount.value <= 3) {
    addLog(`✅ 접근 성공 (${accessCount.value}/3)`, 'success');
  } else {
    addLog('❌ 접근 제한됨', 'error');
  }
};

const showInfo = () => {
  const info = proxyImage.value.getInfo();
  addLog(`📊 ${info}`, 'info');
};

const resetImage = () => {
  proxyImage.value = new ProxyImage('sample-photo.jpg');
  accessCount.value = 0;
  addLog('🔄 이미지 초기화됨', 'info');
};

const clearLogs = () => {
  logs.value = [];
};

const codeExample = `// Proxy 패턴 사용
const proxy = new ProxyImage('photo.jpg');

// 3번까지 접근 가능
proxy.display(); // ✅ 접근 1
proxy.display(); // ⚡ 캐시 사용
proxy.display(); // ⚡ 캐시 사용
proxy.display(); // ❌ 접근 제한`;
</script>

<style scoped>
.demo-section {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding: 30px;
  border-radius: 12px;
  color: white;
  margin-bottom: 30px;
}

.demo-section h2 {
  margin: 0 0 10px 0;
  font-size: 28px;
}

.description {
  margin: 5px 0 20px 0;
  opacity: 0.9;
  font-size: 14px;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 14px;
}

.btn-access {
  background-color: #4ecdc4;
  color: white;
}

.btn-access:hover {
  background-color: #45b7aa;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(78, 205, 196, 0.4);
}

.btn-info {
  background-color: #95e1d3;
  color: #333;
}

.btn-info:hover {
  background-color: #7dd4c4;
  transform: translateY(-2px);
}

.btn-clear {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.btn-clear:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.btn-small {
  padding: 6px 12px;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.2);
}

.btn-small:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

.info-panel {
  background: rgba(255, 255, 255, 0.15);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: 600;
}

.value {
  font-family: 'Courier New', monospace;
  font-weight: 700;
  padding: 5px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.value.waiting {
  background-color: rgba(255, 193, 7, 0.4);
}

.value.cached {
  background-color: rgba(76, 175, 80, 0.4);
}

.value.denied {
  background-color: rgba(244, 67, 54, 0.4);
}

.log-section {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.log-section h3 {
  margin: 0 0 15px 0;
  font-size: 16px;
}

.log-container {
  background: rgba(0, 0, 0, 0.3);
  padding: 15px;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.empty-log {
  text-align: center;
  opacity: 0.6;
  padding: 20px;
  font-size: 12px;
}

.log-item {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  padding: 5px 0;
  opacity: 0.9;
}

.log-item.success {
  color: #7fff00;
}

.log-item.error {
  color: #ff6b6b;
}

.log-item.info {
  color: #87ceeb;
}

.code-section {
  background: rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 6px;
}

.code-section details {
  cursor: pointer;
}

.code-section summary {
  font-weight: 600;
  padding: 10px;
  user-select: none;
}

.code-section pre {
  background: rgba(0, 0, 0, 0.4);
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  margin-top: 10px;
}

.code-section code {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.6;
}
</style>