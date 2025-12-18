import { InstrumentRuntime } from "./InstrumentRuntime.ts";
import type { InstrumentDefinition } from "./instruments/InstrumentDefintion.ts";

import { browser } from '$app/environment';


export class AudioEngine {
    context: AudioContext | null;

    runtimes: Map<string, InstrumentRuntime>;

    constructor() {
        this.context = null;
        this.runtimes = new Map();
    }

    init() {
        if (!browser) return;

        if (!this.context) {
            this.context = new AudioContext();
        }

        if (this.context.state === "suspended") {
            this.context.resume();
        }
    }

    private requireContext(): AudioContext {
        if (!this.context) {
            throw new Error("AudioEngine not initialized. Call init() from a user gesture.");
        }
        return this.context;
    }

    createInstrument(id: string, definition: InstrumentDefinition) {
        this.init();
        
        const context = this.requireContext();

        const runtime = new InstrumentRuntime(id, context, definition);

        this.runtimes.set(id, runtime);
    }

    destroyInstrument(id: string) {
        const runtime = this.runtimes.get(id);
        if (runtime) {
            runtime.destroy();
            this.runtimes.delete(id);
        }
    }

    connectInstrumentToOutput(instrumentId: string) {
        const instrument = this.runtimes.get(instrumentId);
        const context = this.requireContext();
        if (instrument) {
            instrument.outputs[0].connect(context.destination);
        } else {
            throw new Error(`Instrument with ID ${instrumentId} not found.`);
        }
    }

    setParam(instrumentId: string, moduleId: string, param: string, value: number) {
        this.runtimes.get(instrumentId)?.setParam(moduleId, param, value);
    }

    playNote(instrumentId: string, note: number, velocity: number) {
        this.runtimes.get(instrumentId)?.playNote(note, velocity);
    }
}

let engine: AudioEngine | null = null;

export function getAudioEngine() {
    if (!browser) return null;

    if (!engine) {
        engine = new AudioEngine();
    }

    return engine;
}