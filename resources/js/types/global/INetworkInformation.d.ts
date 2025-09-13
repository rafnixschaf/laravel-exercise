export {};
interface NetworkInformation extends EventTarget {
    downlink: number;
    effectiveType: string;
    rtt: number;
    saveData: boolean;
}

declare global {
    interface Navigator {
        connection?: NetworkInformation;
    }
}
