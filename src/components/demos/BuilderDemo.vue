<template>
  <div class="demo-section">
    <h2>🔨 Builder Pattern Demo</h2>
    <p class="description">복잡한 객체를 단계별로 생성하는 Builder 패턴</p>

    <div class="controls">
      <button class="btn btn-gaming" @click="buildGamingPC">🎮 게이밍 PC</button>
      <button class="btn btn-office" @click="buildOfficePC">💼 사무용 PC</button>
      <button class="btn btn-workstation" @click="buildWorkstationPC">🖥️ 워크스테이션</button>
      <button class="btn btn-clear" @click="clearResults">🗑️ 초기화</button>
    </div>

    <div class="results">
      <div v-if="computers.length === 0" class="empty-state">
        위 버튼을 클릭하여 PC를 빌드하세요!
      </div>
      <div v-for="(computer, index) in computers" :key="index" class="computer-card">
        <div class="card-header">{{ index + 1 }}번 빌드된 PC</div>
        <div class="card-content">{{ computer.toString() }}</div>
      </div>
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
import { ref } from 'vue';
import { ComputerBuilder, builderExamples } from '../../patterns/creational/Builder';

const computers = ref<any[]>([]);

const buildGamingPC = () => {
  const pc = builderExamples.gamingPC();
  computers.value.push(pc);
};

const buildOfficePC = () => {
  const pc = builderExamples.officePC();
  computers.value.push(pc);
};

const buildWorkstationPC = () => {
  const pc = builderExamples.workstationPC();
  computers.value.push(pc);
};

const clearResults = () => {
  computers.value = [];
};

const codeExample = `const gamingPC = new ComputerBuilder()
  .setCpu('Intel i9-13900K')
  .setRam('32GB DDR5')
  .setStorage('2TB NVMe SSD')
  .setGpu('RTX 4090')
  .setMonitor('4K 144Hz')
  .build();`;
</script>

<style scoped>
.demo-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

.btn-gaming {
  background-color: #ff6b6b;
  color: white;
}

.btn-gaming:hover {
  background-color: #ff5252;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

.btn-office {
  background-color: #4ecdc4;
  color: white;
}

.btn-office:hover {
  background-color: #45b7aa;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(78, 205, 196, 0.4);
}

.btn-workstation {
  background-color: #ffd93d;
  color: #333;
}

.btn-workstation:hover {
  background-color: #ffc107;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 217, 61, 0.4);
}

.btn-clear {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.btn-clear:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.results {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  min-height: 100px;
}

.empty-state {
  text-align: center;
  opacity: 0.7;
  padding: 30px 0;
}

.computer-card {
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  border-left: 4px solid #ff6b6b;
}

.card-header {
  font-weight: 700;
  margin-bottom: 8px;
  color: #667eea;
}

.card-content {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.5;
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