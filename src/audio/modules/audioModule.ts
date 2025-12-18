export interface AudioModule {
    id: string;
    inputs: AudioNode[];
    outputs: AudioNode[];
    params: Record<string, number>;
    setParam(param: string, value: number): void;
}