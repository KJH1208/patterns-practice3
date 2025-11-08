// 빌드 대상 클래스
export class Computer {
    cpu: string = '';
    ram: string = '';
    storage: string = '';
    gpu: string = '';
    monitor: string = '';

    toString(): string {
        return `💻 Computer: CPU=${this.cpu}, RAM=${this.ram}, Storage=${this.storage}, GPU=${this.gpu}, Monitor=${this.monitor}`;
    }
}

// Builder 클래스
export class ComputerBuilder {
    private computer: Computer = new Computer();

    setCpu(cpu: string): this {
        this.computer.cpu = cpu;
        return this;
    }

    setRam(ram: string): this {
        this.computer.ram = ram;
        return this;
    }

    setStorage(storage: string): this {
        this.computer.storage = storage;
        return this;
    }

    setGpu(gpu: string): this {
        this.computer.gpu = gpu;
        return this;
    }

    setMonitor(monitor: string): this {
        this.computer.monitor = monitor;
        return this;
    }

    build(): Computer {
        return this.computer;
    }
}

// 사용 예제
export const builderExamples = {
    gamingPC: () => {
        return new ComputerBuilder()
            .setCpu('Intel i9-13900K')
            .setRam('32GB DDR5')
            .setStorage('2TB NVMe SSD')
            .setGpu('RTX 4090')
            .setMonitor('4K 144Hz')
            .build();
    },

    officePC: () => {
        return new ComputerBuilder()
            .setCpu('Intel i5-13600K')
            .setRam('16GB DDR4')
            .setStorage('512GB SSD')
            .setGpu('Integrated Graphics')
            .setMonitor('1080p 60Hz')
            .build();
    },

    workstationPC: () => {
        return new ComputerBuilder()
            .setCpu('AMD Ryzen 9 7950X')
            .setRam('64GB DDR5')
            .setStorage('4TB NVMe SSD')
            .setGpu('RTX 6000 Ada')
            .setMonitor('4K 60Hz Professional')
            .build();
    }
};