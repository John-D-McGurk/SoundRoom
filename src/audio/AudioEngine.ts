import { InstrumentRuntime } from "./InstrumentRuntime.ts";
import { selectInstrument } from "../stores/selectInstrument";
import type { InstrumentDefinition } from "./instruments/InstrumentDefintion.ts";

import { browser } from '$app/environment';


export class AudioEngine {
    context: AudioContext | null;

    runtimes: Map<string, InstrumentRuntime>;
    unsubscribes: Map<string, () => void>;

    constructor() {
        this.context = null;
        this.runtimes = new Map();
        this.unsubscribes = new Map();
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
        // Consider initializing on a load screen user gesture
        this.init();
        
        const context = this.requireContext();

        const runtime = new InstrumentRuntime(id, context, definition);

        const unsubscribe = selectInstrument(id).subscribe((state) => {
            if (!state) return;
            runtime.updateParams(state.params);
        });

        this.runtimes.set(id, runtime);
        this.unsubscribes.set(id, unsubscribe);
    }

    destroyInstrument(id: string) {
        const runtime = this.runtimes.get(id);
        const unsubscribe = this.unsubscribes.get(id);
        if (unsubscribe) {
            unsubscribe();
            this.unsubscribes.delete(id);
        }
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
}

let engine: AudioEngine | null = null;

export function getAudioEngine() {
    if (!browser) return null;

    if (!engine) {
        engine = new AudioEngine();
    }

    return engine;
}