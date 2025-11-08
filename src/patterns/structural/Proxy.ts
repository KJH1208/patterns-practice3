// 실제 객체 인터페이스
export interface ImageInterface {
    display(): void;
    getInfo(): string;
}

// 실제 이미지 클래스
export class RealImage implements ImageInterface {
    private filename: string;
    private loadTime: number = 2000; // 시뮬레이션: 2초 로딩

    constructor(filename: string) {
        this.filename = filename;
        this.loadImageFromDisk();
    }

    private loadImageFromDisk(): void {
        console.log(`🔄 Loading image from disk: ${this.filename}`);
    }

    display(): void {
        console.log(`🖼️ Displaying image: ${this.filename}`);
    }

    getInfo(): string {
        return `Real Image: ${this.filename} (loaded in ${this.loadTime}ms)`;
    }
}

// Proxy 클래스 - 캐싱 및 접근 제어
export class ProxyImage implements ImageInterface {
    private realImage: RealImage | null = null;
    private filename: string;
    private accessCount: number = 0;
    private maxAccessCount: number = 3; // 3번까지만 접근 가능

    constructor(filename: string) {
        this.filename = filename;
    }

    display(): void {
        if (this.accessCount >= this.maxAccessCount) {
            console.log(`❌ Access denied! Maximum access count (${this.maxAccessCount}) exceeded.`);
            return;
        }

        this.accessCount++;

        // 실제 객체가 없으면 생성 (Lazy Loading)
        if (this.realImage === null) {
            console.log(`⏳ First access - creating real image...`);
            this.realImage = new RealImage(this.filename);
        } else {
            console.log(`⚡ Using cached image (Access #${this.accessCount})`);
        }

        this.realImage.display();
    }

    getInfo(): string {
        return `Proxy Image: ${this.filename} (Access count: ${this.accessCount}/${this.maxAccessCount})`;
    }

    getAccessCount(): number {
        return this.accessCount;
    }
}

// 사용 예제
export const proxyExamples = {
    basicProxy: () => {
        return new ProxyImage('photo.jpg');
    },

    cachedImages: () => {
        const images: ProxyImage[] = [
            new ProxyImage('image1.png'),
            new ProxyImage('image2.png'),
            new ProxyImage('image3.png')
        ];
        return images;
    }
};