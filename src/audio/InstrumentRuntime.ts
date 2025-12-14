import { selectInstrument } from "../stores/selectInstrument";

export class InstrumentRuntime {
    unsubscribe: () => void;
    id: string;
    context: AudioContext;
    inputs: AudioNode[];
    outputs: AudioNode[];

    constructor(id: string, ctx: AudioContext) {
        this.id = id;
        this.context = ctx;
        this.inputs = [];
        this.outputs = [ctx.createGain()];
        this.unsubscribe = selectInstrument(id).subscribe((state) => {
            if (!state) return;
        });
    }
    destroy() {
        this.unsubscribe();
    }
}