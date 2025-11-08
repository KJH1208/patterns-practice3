// Strategy 인터페이스
export interface PaymentStrategy {
    pay(amount: number): void;
    getPaymentMethod(): string;
}

// 신용카드 결제 전략
export class CreditCardPayment implements PaymentStrategy {
    private cardNumber: string;
    private cardHolder: string;

    constructor(cardNumber: string, cardHolder: string) {
        this.cardNumber = cardNumber;
        this.cardHolder = cardHolder;
    }

    pay(amount: number): void {
        console.log(`💳 Credit Card Payment`);
        console.log(`   Card: ${this.cardNumber.slice(-4).padStart(this.cardNumber.length, '*')}`);
        console.log(`   Holder: ${this.cardHolder}`);
        console.log(`   Amount: $${amount}`);
        console.log(`   Status: ✅ Payment successful`);
    }

    getPaymentMethod(): string {
        return `Credit Card (${this.cardNumber.slice(-4)})`;
    }
}

// PayPal 결제 전략
export class PayPalPayment implements PaymentStrategy {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    pay(amount: number): void {
        console.log(`🅿️ PayPal Payment`);
        console.log(`   Email: ${this.email}`);
        console.log(`   Amount: $${amount}`);
        console.log(`   Status: ✅ Payment successful`);
    }

    getPaymentMethod(): string {
        return `PayPal (${this.email})`;
    }
}

// 암호화폐 결제 전략
export class CryptoPayment implements PaymentStrategy {
    private walletAddress: string;
    private cryptocurrency: string;

    constructor(walletAddress: string, cryptocurrency: string) {
        this.walletAddress = walletAddress;
        this.cryptocurrency = cryptocurrency;
    }

    pay(amount: number): void {
        console.log(`🪙 Cryptocurrency Payment`);
        console.log(`   Wallet: ${this.walletAddress.slice(0, 10)}...`);
        console.log(`   Type: ${this.cryptocurrency}`);
        console.log(`   Amount: ${amount} ${this.cryptocurrency}`);
        console.log(`   Status: ✅ Transaction confirmed on blockchain`);
    }

    getPaymentMethod(): string {
        return `${this.cryptocurrency} (${this.walletAddress.slice(0, 10)}...)`;
    }
}

// Context 클래스 - 결제 처리
export class PaymentProcessor {
    private strategy: PaymentStrategy | null = null;

    setPaymentStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
        console.log(`Strategy changed to: ${strategy.getPaymentMethod()}`);
    }

    processPayment(amount: number): void {
        if (!this.strategy) {
            console.log('❌ No payment strategy selected!');
            return;
        }

        console.log(`\n${'='.repeat(50)}`);
        console.log(`Processing payment of $${amount}`);
        console.log(`${'='.repeat(50)}`);
        this.strategy.pay(amount);
        console.log(`${'='.repeat(50)}\n`);
    }

    getCurrentStrategy(): string {
        return this.strategy ? this.strategy.getPaymentMethod() : 'None selected';
    }
}

// 사용 예제
export const strategyExamples = {
    creditCard: () => new CreditCardPayment('1234-5678-9012-3456', 'John Doe'),
    paypal: () => new PayPalPayment('user@example.com'),
    crypto: () => new CryptoPayment('1A1z7agoat2wSW', 'Bitcoin')
};