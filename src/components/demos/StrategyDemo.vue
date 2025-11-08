<template>
  <div class="demo-section">
    <h2>💳 Strategy Pattern Demo</h2>
    <p class="description">다양한 결제 방식을 동적으로 선택하는 Strategy 패턴</p>

    <div class="payment-selector">
      <div class="selector-group">
        <label>결제 방식 선택:</label>
        <div class="strategy-buttons">
          <button
              class="strategy-btn"
              :class="{ active: selectedStrategy === 'creditCard' }"
              @click="selectStrategy('creditCard')"
          >
            💳 신용카드
          </button>
          <button
              class="strategy-btn"
              :class="{ active: selectedStrategy === 'paypal' }"
              @click="selectStrategy('paypal')"
          >
            🅿️ PayPal
          </button>
          <button
              class="strategy-btn"
              :class="{ active: selectedStrategy === 'crypto' }"
              @click="selectStrategy('crypto')"
          >
            🪙 암호화폐
          </button>
        </div>
      </div>

      <div class="amount-input">
        <label>결제 금액:</label>
        <div class="input-group">
          <span>$</span>
          <input v-model.number="amount" type="number" min="1" placeholder="금액 입력" />
        </div>
      </div>

      <button class="btn btn-pay" @click="processPayment">💰 결제 처리</button>
    </div>

    <div class="current-strategy">
      <div class="strategy-card">
        <div class="strategy-header">선택된 전략</div>
        <div class="strategy-content">
          {{ currentStrategyInfo }}
        </div>
      </div>
    </div>

    <div class="payment-history">
      <h3>📊 결제 이력</h3>
      <div class="history-container">
        <div v-if="paymentHistory.length === 0" class="empty-history">
          아직 결제 이력이 없습니다
        </div>
        <div v-for="(payment, index) in paymentHistory" :key="index" class="history-item">
          <div class="history-item-header">
            <span class="history-index">{{ index + 1 }}</span>
            <span class="history-method">{{ payment.method }}</span>
            <span class="history-amount">${{ payment.amount }}</span>
            <span class="history-time">{{ payment.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="execution-log">
      <h3>📋 실행 로그</h3>
      <div class="log-container">
        <div v-if="logs.length === 0" class="empty-log">로그가 없습니다</div>
        <div v-for="(log, index) in logs" :key="index" class="log-item">
          {{ log }}
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
import {
  PaymentProcessor,
  strategyExamples,
  type PaymentStrategy
} from '../../patterns/behavioral/Strategy';

const processor = ref(new PaymentProcessor());
const selectedStrategy = ref<'creditCard' | 'paypal' | 'crypto'>('creditCard');
const amount = ref(100);
const logs = ref<string[]>([]);
const paymentHistory = ref<{ method: string; amount: number; time: string }[]>([]);

const strategies: Record<string, PaymentStrategy> = {
  creditCard: strategyExamples.creditCard(),
  paypal: strategyExamples.paypal(),
  crypto: strategyExamples.crypto()
};

const strategyNames: Record<string, string> = {
  creditCard: '💳 신용카드',
  paypal: '🅿️ PayPal',
  crypto: '🪙 Bitcoin'
};

const currentStrategyInfo = computed(() => {
  const strategy = strategies[selectedStrategy.value];
  return strategy.getPaymentMethod();
});

const selectStrategy = (strategy: 'creditCard' | 'paypal' | 'crypto') => {
  selectedStrategy.value = strategy;
  processor.value.setPaymentStrategy(strategies[strategy]);
  addLog(`✅ 결제 방식 변경: ${strategyNames[strategy]}`);
};

const addLog = (message: string) => {
  const timestamp = new Date().toLocaleTimeString('ko-KR');
  logs.value.push(`[${timestamp}] ${message}`);
  if (logs.value.length > 8) {
    logs.value.shift();
  }
};

const processPayment = () => {
  if (!amount.value || amount.value <= 0) {
    addLog('❌ 유효한 금액을 입력하세요');
    return;
  }

  addLog(`🔄 결제 처리 중... (${strategyNames[selectedStrategy.value]}, $${amount.value})`);

  // 결제 실행
  processor.value.processPayment(amount.value);

  // 이력에 추가
  paymentHistory.value.push({
    method: strategyNames[selectedStrategy.value],
    amount: amount.value,
    time: new Date().toLocaleTimeString('ko-KR')
  });

  addLog(`✅ 결제 완료: $${amount.value}`);
};

const clearLogs = () => {
  logs.value = [];
};

const codeExample = `const processor = new PaymentProcessor();

// 신용카드 결제
const creditCard = new CreditCardPayment('1234-5678-9012-3456', 'John Doe');
processor.setPaymentStrategy(creditCard);
processor.processPayment(100);

// PayPal 결제로 변경
const paypal = new PayPalPayment('user@example.com');
processor.setPaymentStrategy(paypal);
processor.processPayment(50);

// 암호화폐 결제로 변경
const crypto = new CryptoPayment('1A1z7agoat2wSW', 'Bitcoin');
processor.setPaymentStrategy(crypto);
processor.processPayment(0.002);`;
</script>

<style scoped>
.demo-section {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  padding: 30px;
  border-radius: 12px;
  color: #333;
  margin-bottom: 30px;
}

.demo-section h2 {
  margin: 0 0 10px 0;
  font-size: 28px;
  color: #333;
}

.description {
  margin: 5px 0 20px 0;
  opacity: 0.8;
  font-size: 14px;
  color: #333;
}

.payment-selector {
  background: rgba(255, 255, 255, 0.9);
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.selector-group {
  margin-bottom: 20px;
}

.selector-group label {
  display: block;
  font-weight: 700;
  margin-bottom: 12px;
  color: #333;
}

.strategy-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.strategy-btn {
  padding: 12px 18px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 14px;
}

.strategy-btn:hover {
  border-color: #fa709a;
  transform: translateY(-2px);
}

.strategy-btn.active {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
  border-color: #fa709a;
}

.amount-input {
  margin-bottom: 20px;
}

.amount-input label {
  display: block;
  font-weight: 700;
  margin-bottom: 8px;
  color: #333;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 200px;
}

.input-group span {
  font-weight: 700;
  font-size: 18px;
}

.input-group input {
  flex: 1;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.input-group input:focus {
  outline: none;
  border-color: #fa709a;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 14px;
}

.btn-pay {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
  width: 100%;
}

.btn-pay:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(250, 112, 154, 0.3);
}

.btn-small {
  padding: 6px 12px;
  font-size: 12px;
  background-color: rgba(250, 112, 154, 0.2);
  color: #333;
  margin-top: 10px;
}

.btn-small:hover {
  background-color: rgba(250, 112, 154, 0.4);
}

.current-strategy {
  margin-bottom: 20px;
}

.strategy-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #fa709a;
}

.strategy-header {
  font-weight: 700;
  color: #fa709a;
  margin-bottom: 8px;
  font-size: 12px;
  text-transform: uppercase;
}

.strategy-content {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #333;
}

.payment-history {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.payment-history h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.history-container {
  background: rgba(0, 0, 0, 0.05);
  padding: 15px;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
}

.empty-history {
  text-align: center;
  opacity: 0.6;
  padding: 20px;
  color: #333;
  font-size: 12px;
}

.history-item {
  padding: 10px;
  margin-bottom: 8px;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #fee140;
}

.history-item-header {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #333;
}

.history-index {
  font-weight: 700;
  background: #fee140;
  padding: 2px 6px;
  border-radius: 3px;
  min-width: 25px;
  text-align: center;
}

.history-method {
  flex: 1;
  font-weight: 600;
}

.history-amount {
  font-weight: 700;
  color: #fa709a;
}

.history-time {
  font-size: 10px;
  opacity: 0.6;
}

.execution-log {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.execution-log h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.log-container {
  background: #333;
  color: #0f0;
  padding: 15px;
  border-radius: 6px;
  max-height: 150px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 11px;
}

.empty-log {
  text-align: center;
  opacity: 0.6;
  padding: 20px;
}

.log-item {
  padding: 3px 0;
  line-height: 1.4;
}

.code-section {
  background: rgba(0, 0, 0, 0.1);
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
  color: #333;
}

.code-section pre {
  background: #333;
  color: #0f0;
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