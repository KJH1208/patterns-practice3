<template>
  <div id="app">
    <header class="app-header">
      <div class="header-content">
        <h1>🎯 Design Patterns Practice</h1>
        <p>Vue 3 + TypeScript로 배우는 객체지향 디자인 패턴</p>
      </div>
    </header>

    <nav class="nav-tabs">
      <button
          v-for="tab in tabs"
          :key="tab.id"
          class="nav-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </nav>

    <main class="main-content">
      <div class="tab-content">
        <!-- Builder 탭 -->
        <section v-show="activeTab === 'builder'" class="tab-section">
          <BuilderDemo />
        </section>

        <!-- Proxy 탭 -->
        <section v-show="activeTab === 'proxy'" class="tab-section">
          <ProxyDemo />
        </section>

        <!-- Strategy 탭 -->
        <section v-show="activeTab === 'strategy'" class="tab-section">
          <StrategyDemo />
        </section>

        <!-- 정보 탭 -->
        <section v-show="activeTab === 'info'" class="tab-section">
          <div class="info-section">
            <h2>📖 디자인 패턴 소개</h2>

            <div class="pattern-card">
              <h3>🔨 Builder Pattern (생성 패턴)</h3>
              <p class="pattern-purpose"><strong>목적:</strong> 복잡한 객체를 단계별로 생성</p>
              <p class="pattern-description">
                복잡한 객체의 생성 과정을 단순화합니다. 빌더 클래스를 통해 메서드 체이닝으로 객체를 구성할 수
                있어 코드가 더 읽기 좋고 유지보수하기 쉬워집니다.
              </p>
              <p class="pattern-example"><strong>예시:</strong> 컴퓨터, 집, 자동차 등 여러 부품으로 이루어진
                복잡한 객체 생성</p>
            </div>

            <div class="pattern-card">
              <h3>🛡️ Proxy Pattern (구조 패턴)</h3>
              <p class="pattern-purpose"><strong>목적:</strong> 객체 접근을 제어하고 캐싱</p>
              <p class="pattern-description">
                실제 객체 대신 대리 객체(Proxy)를 사용하여 접근을 제어합니다. 지연 로딩(Lazy Loading),
                캐싱, 접근 제어 등을 구현할 수 있습니다.
              </p>
              <p class="pattern-example"><strong>예시:</strong> 이미지 로딩, 데이터베이스 연결, 권한 확인</p>
            </div>

            <div class="pattern-card">
              <h3>💳 Strategy Pattern (행위 패턴)</h3>
              <p class="pattern-purpose"><strong>목적:</strong> 알고리즘을 동적으로 선택</p>
              <p class="pattern-description">
                다양한 알고리즘을 캡슐화하여 상호 교환 가능하게 만듭니다. 런타임에 원하는 알고리즘을 선택할
                수 있어 코드 유연성이 높아집니다.
              </p>
              <p class="pattern-example"><strong>예시:</strong> 결제 방식 선택, 정렬 방식 선택, 필터링 알고리즘</p>
            </div>
          </div>
        </section>
      </div>
    </main>

    <footer class="app-footer">
      <p>📚 객체지향 디자인 패턴 실습 | Vue 3 + TypeScript | 2025</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BuilderDemo from './components/demos/BuilderDemo.vue';
import ProxyDemo from './components/demos/ProxyDemo.vue';
import StrategyDemo from './components/demos/StrategyDemo.vue';

const activeTab = ref('builder');

const tabs = [
  { id: 'builder', label: '🔨 Builder Pattern' },
  { id: 'proxy', label: '🛡️ Proxy Pattern' },
  { id: 'strategy', label: '💳 Strategy Pattern' },
  { id: 'info', label: '📖 정보' }
];
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95));
  padding: 40px 20px;
  text-align: center;
  color: white;
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
}

.header-content h1 {
  margin: 0 0 10px 0;
  font-size: 42px;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.header-content p {
  margin: 0;
  font-size: 16px;
  opacity: 0.95;
}

.nav-tabs {
  display: flex;
  gap: 0;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  overflow-x: auto;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.nav-tab {
  padding: 12px 20px;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
  white-space: nowrap;
}

.nav-tab:hover {
  background: rgba(255, 255, 255, 0.1);
  border-bottom-color: rgba(255, 255, 255, 0.5);
}

.nav-tab.active {
  background: rgba(255, 255, 255, 0.2);
  border-bottom-color: white;
}

.main-content {
  flex: 1;
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.tab-content {
  min-height: 500px;
}

.tab-section {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-section {
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 12px;
}

.info-section h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.pattern-card {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 8px;
  border-left: 5px solid #667eea;
}

.pattern-card h3 {
  color: #333;
  margin: 0 0 10px 0;
  font-size: 18px;
}

.pattern-purpose {
  color: #667eea;
  font-size: 14px;
  margin: 8px 0;
}

.pattern-description {
  color: #555;
  font-size: 14px;
  line-height: 1.6;
  margin: 8px 0;
}

.pattern-example {
  color: #777;
  font-size: 13px;
  margin: 8px 0;
  font-style: italic;
}

.app-footer {
  background: rgba(0, 0, 0, 0.3);
  color: white;
  text-align: center;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.app-footer p {
  margin: 0;
  font-size: 12px;
}

@media (max-width: 768px) {
  .app-header {
    padding: 30px 15px;
  }

  .header-content h1 {
    font-size: 28px;
  }

  .header-content p {
    font-size: 14px;
  }

  .nav-tabs {
    padding: 10px 15px;
  }

  .nav-tab {
    padding: 10px 15px;
    font-size: 12px;
  }

  .main-content {
    padding: 20px 15px;
  }

  .info-section {
    padding: 20px;
  }

  .pattern-card {
    padding: 15px;
  }
}
</style>