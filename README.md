# 🎯 Design Patterns Practice

Vue 3 + TypeScript를 사용한 객체지향 디자인 패턴 실습 프로젝트

## 📚 학습 목표

이 프로젝트는 다음 3가지 디자인 패턴을 실제로 구현하고 학습합니다:

### 1. 🔨 Builder Pattern (생성 패턴)
- **목적**: 복잡한 객체를 단계별로 생성
- **특징**: 메서드 체이닝, 유연한 객체 구성
- **예제**: 다양한 사양의 컴퓨터 빌드

### 2. 🛡️ Proxy Pattern (구조 패턴)
- **목적**: 객체 접근을 제어하고 캐싱
- **특징**: 지연 로딩(Lazy Loading), 접근 제어
- **예제**: 이미지 로딩 제어 및 캐싱

### 3. 💳 Strategy Pattern (행위 패턴)
- **목적**: 알고리즘을 동적으로 선택
- **특징**: 런타임 알고리즘 교환, 코드 유연성
- **예제**: 다양한 결제 방식 처리

## 🚀 프로젝트 실행

### 필수 요구사항
- Node.js (v14 이상)
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

개발 서버 실행 후 브라우저에서 `http://localhost:5173`에 접속하세요.

## 📁 프로젝트 구조

```
src/
├── patterns/
│   ├── creational/
│   │   └── Builder.ts           # Builder 패턴 구현
│   ├── structural/
│   │   └── Proxy.ts             # Proxy 패턴 구현
│   └── behavioral/
│       └── Strategy.ts          # Strategy 패턴 구현
├── components/
│   └── demos/
│       ├── BuilderDemo.vue      # Builder 데모 컴포넌트
│       ├── ProxyDemo.vue        # Proxy 데모 컴포넌트
│       └── StrategyDemo.vue     # Strategy 데모 컴포넌트
├── App.vue                       # 메인 앱 컴포넌트
└── main.ts                       # 진입점
```

## 🎯 주요 기능

### Builder Pattern
- 게이밍 PC, 사무용 PC, 워크스테이션 등 다양한 사양의 컴퓨터를 빌드
- 메서드 체이닝을 통한 직관적인 API

### Proxy Pattern
- 이미지 접근 횟수 제어 (최대 3회)
- 캐싱을 통한 성능 최적화
- 지연 로딩 구현

### Strategy Pattern
- 신용카드, PayPal, 암호화폐 등 다양한 결제 방식 지원
- 런타임에 결제 방식 변경 가능
- 결제 이력 관리 및 로깅

## 💻 코드 예제

### Builder 사용

```typescript
const gamingPC = new ComputerBuilder()
  .setCpu('Intel i9-13900K')
  .setRam('32GB DDR5')
  .setStorage('2TB NVMe SSD')
  .setGpu('RTX 4090')
  .setMonitor('4K 144Hz')
  .build();
```

### Proxy 사용

```typescript
const proxyImage = new ProxyImage('photo.jpg');
proxyImage.display(); // 첫 접근: 이미지 생성
proxyImage.display(); // 두 번째 접근: 캐시 사용
proxyImage.display(); // 세 번째 접근: 캐시 사용
proxyImage.display(); // 네 번째 접근: 거부 (최대 3회 초과)
```

### Strategy 사용

```typescript
const processor = new PaymentProcessor();

// 신용카드로 결제
const creditCard = new CreditCardPayment('1234-5678-9012-3456', 'John Doe');
processor.setPaymentStrategy(creditCard);
processor.processPayment(100);

// PayPal로 변경
const paypal = new PayPalPayment('user@example.com');
processor.setPaymentStrategy(paypal);
processor.processPayment(50);
```

## 📊 실행 화면

각 패턴별 데모는 다음과 같은 기능을 제공합니다:

- **인터랙티브 UI**: 버튼 클릭으로 패턴 실행
- **실행 결과 표시**: 콘솔 로그 시뮬레이션
- **상태 정보**: 현재 상태 및 통계
- **코드 뷰**: 구현 코드 확인 가능

## 🛠️ 기술 스택

- **프론트엔드**: Vue 3 (Composition API)
- **언어**: TypeScript
- **빌드 도구**: Vite
- **스타일링**: Scoped CSS

## 📝 학습 포인트

1. **Builder 패턴의 이점**
    - 복잡한 객체 생성의 단순화
    - 메서드 체이닝의 가독성
    - 유연한 객체 구성

2. **Proxy 패턴의 이점**
    - 접근 제어 및 보안
    - 성능 최적화 (캐싱)
    - 지연 로딩

3. **Strategy 패턴의 이점**
    - 알고리즘의 캡슐화
    - 런타임 동적 선택
    - 코드의 유연성 및 확장성

## 🎓 과제 요구사항

- ✅ Vue 3 + TypeScript로 구현
- ✅ 3가지 디자인 패턴 구현 (생성/구조/행위 각 1개)
- ✅ 인터랙티브한 데모 제공
- ✅ 깔끔한 UI/UX
- ✅ 코드 주석 및 설명 포함

## 📮 제출 정보

- **학생명**: [학생명]
- **제출일**: 2025년 11월 8일
- **GitHub Repository**: [저장소 링크]

## 📚 참고 자료

- [Vue 3 공식 문서](https://vuejs.org/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [Design Patterns: Elements of Reusable Object-Oriented Software](https://en.wikipedia.org/wiki/Design_Patterns)

## 📄 라이선스

이 프로젝트는 교육 목적으로 작성되었습니다.

---

**Happy Learning! 🚀**