export interface Voice{
    start(note: number, velocity: number): void;
    stop(): void;
    active: boolean;
    startTime: number;
}