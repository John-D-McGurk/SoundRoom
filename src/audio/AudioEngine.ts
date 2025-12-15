import { InstrumentRuntime } from "./InstrumentRuntime.ts";
import { selectInstrument } from "../stores/selectInstrument";
import { getInstrumentDefinition } from "./instruments/getInstrumentDefinition";

export class AudioEngine {
    readonly context: AudioContext;

    runtimes: Map<string, InstrumentRuntime>;
    unsubscribes: Map<string, () => void>;

    constructor() {
        this.context = new AudioContext();
        this.runtimes = new Map();
        this.unsubscribes = new Map();  
    }

    createInstrument(id: string, defintionId: string, ctx: AudioContext) {
        const defintion = getInstrumentDefinition(defintionId);
        const runtime = new InstrumentRuntime(id, this.context, defintion);

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
        if (instrument) {
            instrument.outputs[0].connect(this.context.destination);
        } else {
            throw new Error(`Instrument with ID ${instrumentId} not found.`);
        }
    }

}