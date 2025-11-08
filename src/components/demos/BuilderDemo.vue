<template>
  <div class="demo-card">
    <div class="card-header">
      <h2>Builder Pattern</h2>
      <p>Create complex objects step by step</p>
    </div>

    <div class="card-body">
      <div class="button-group">
        <button class="apple-btn" @click="buildGamingPC">Gaming</button>
        <button class="apple-btn" @click="buildOfficePC">Office</button>
        <button class="apple-btn" @click="buildWorkstationPC">Workstation</button>
        <button class="apple-btn secondary" @click="clearResults">Clear</button>
      </div>

      <div class="results-section">
        <div v-if="computers.length === 0" class="empty-state">
          <p>Click a button to build a PC</p>
        </div>
        <div v-else class="results-list">
          <div v-for="(computer, index) in computers" :key="index" class="result-row">
            <span class="result-number">{{ index + 1 }}</span>
            <span class="result-text">{{ computer.toString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { builderExamples } from '../../patterns/creational/Builder';

const computers = ref<any[]>([]);

const buildGamingPC = () => {
  computers.value.push(builderExamples.gamingPC());
};

const buildOfficePC = () => {
  computers.value.push(builderExamples.officePC());
};

const buildWorkstationPC = () => {
  computers.value.push(builderExamples.workstationPC());
};

const clearResults = () => {
  computers.value = [];
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

.button-group {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

.results-section {
  background: #f5f5f7;
  border-radius: 8px;
  padding: 16px;
  min-height: 120px;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: #a1a1a6;
  font-size: 13px;
  font-weight: 400;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-row {
  display: flex;
  gap: 12px;
  align-items: center;
  background: #ffffff;
  padding: 12px;
  border-radius: 6px;
  border-left: 3px solid #0071e3;
}

.result-number {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background: #0071e3;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
}

.result-text {
  flex: 1;
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
  font-size: 11px;
  color: #1d1d1f;
  line-height: 1.4;
  word-break: break-word;
}

@media (max-width: 768px) {
  .button-group {
    grid-template-columns: repeat(2, 1fr);
  }

  .card-header {
    padding: 20px 20px 16px 20px;
  }

  .card-body {
    padding: 16px 20px;
  }
}

@media (max-width: 480px) {
  .button-group {
    grid-template-columns: 1fr;
  }
}
</style>