<template>
  <div class="demo-card">
    <div class="card-header">
      <h2>Strategy Pattern</h2>
      <p>Dynamically select payment methods</p>
    </div>

    <div class="card-body">
      <div class="section">
        <div class="section-title">Payment Method</div>
        <div class="method-grid">
          <button
              v-for="(strategy, key) in strategyList"
              :key="key"
              class="method-card"
              :class="{ active: selectedStrategy === key }"
              @click="selectStrategy(key)"
          >
            <span class="method-icon">{{ strategy.icon }}</span>
            <span class="method-name">{{ strategy.name }}</span>
          </button>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Amount</div>
        <div class="amount-input-wrapper">
          <span class="currency">$</span>
          <input v-model.number="amount" type="number" min="1" placeholder="100" />
        </div>
      </div>

      <button class="apple-btn-primary" @click="processPayment">Pay Now</button>

      <div v-if="paymentHistory.length > 0" class="section">
        <div class="section-title">Transaction History</div>
        <div class="history-list">
          <div v-for="(payment, index) in paymentHistory" :key="index" class="history-row">
            <span class="history-badge">{{ index + 1 }}</span>
            <span class="history-method">{{ payment.method }}</span>
            <span class="history-amount">${{ payment.amount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  PaymentProcessor,
  strategyExamples,
  type PaymentStrategy
} from '../../patterns/behavioral/Strategy';

const processor = ref(new PaymentProcessor());
const selectedStrategy = ref<'creditCard' | 'paypal' | 'crypto'>('creditCard');
const amount = ref(100);
const paymentHistory = ref<{ method: string; amount: number }[]>([]);

const strategies: Record<string, PaymentStrategy> = {
  creditCard: strategyExamples.creditCard(),
  paypal: strategyExamples.paypal(),
  crypto: strategyExamples.crypto()
};

const strategyList = {
  creditCard: { icon: '💳', name: 'Credit Card' },
  paypal: { icon: '🅿️', name: 'PayPal' },
  crypto: { icon: '🪙', name: 'Crypto' }
};

const strategyNames: Record<string, string> = {
  creditCard: '💳 Credit Card',
  paypal: '🅿️ PayPal',
  crypto: '🪙 Crypto'
};

const selectStrategy = (strategy: 'creditCard' | 'paypal' | 'crypto') => {
  selectedStrategy.value = strategy;
  processor.value.setPaymentStrategy(strategies[strategy]);
};

const processPayment = () => {
  if (!amount.value || amount.value <= 0) {
    return;
  }

  processor.value.processPayment(amount.value);

  paymentHistory.value.push({
    method: strategyNames[selectedStrategy.value],
    amount: amount.value
  });

  if (paymentHistory.value.length > 5) {
    paymentHistory.value.shift();
  }
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

.section {
  margin-bottom: 24px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 11px;
  font-weight: 600;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 12px;
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.method-card {
  background: #f5f5f7;
  border: 2px solid #f5f5f7;
  border-radius: 8px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  color: #1d1d1f;
}

.method-card:hover {
  border-color: #d2d2d7;
  background: #ffffff;
}

.method-card.active {
  background: #0071e3;
  border-color: #0071e3;
  color: #ffffff;
}

.method-icon {
  font-size: 22px;
}

.method-name {
  font-size: 12px;
  letter-spacing: -0.2px;
}

.amount-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f7;
  border-radius: 8px;
  padding: 10px 12px;
}

.currency {
  font-weight: 600;
  color: #1d1d1f;
  font-size: 14px;
}

.amount-input-wrapper input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1f;
  outline: none;
}

.amount-input-wrapper input::placeholder {
  color: #a1a1a6;
}

.apple-btn-primary {
  width: 100%;
  padding: 12px;
  background: #0071e3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.2px;
}

.apple-btn-primary:hover {
  background: #0077ed;
}

.apple-btn-primary:active {
  background: #0066cc;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.history-row {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f5f5f7;
  padding: 10px;
  border-radius: 6px;
  font-size: 12px;
}

.history-badge {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background: #0071e3;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 10px;
}

.history-method {
  flex: 1;
  color: #1d1d1f;
  font-weight: 500;
}

.history-amount {
  font-weight: 600;
  color: #0071e3;
}

@media (max-width: 768px) {
  .method-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .card-header {
    padding: 20px 20px 16px 20px;
  }

  .card-body {
    padding: 16px 20px;
  }
}

@media (max-width: 480px) {
  .method-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .method-icon {
    font-size: 18px;
  }

  .method-name {
    font-size: 10px;
  }
}
</style>