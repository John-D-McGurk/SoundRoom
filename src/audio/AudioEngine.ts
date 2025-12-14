import { InstrumentRuntime } from "./InstrumentRuntime.ts";

export class AudioEngine {
    context: AudioContext;
    instruments: Map<string, InstrumentRuntime>;
    constructor() {
        this.context = new AudioContext();
        this.instruments = new Map();
    }

    connectInstrumentToOutput(instrumentId: string) {
        const instrument = this.instruments.get(instrumentId);
        if (instrument) {
            instrument.outputs[0].connect(this.context.destination);
        } else {
            throw new Error(`Instrument with ID ${instrumentId} not found.`);
        }
    }

}