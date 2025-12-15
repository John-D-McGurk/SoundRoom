import type { AudioModule } from "./modules/AudioModule";

export class InstrumentRuntime {
    readonly id: string;
    readonly context: AudioContext;
    
    inputs: AudioNode[];
    outputs: AudioNode[];
    modules: Map<AudioModule, any>;
    route: AudioNode[];

    constructor(id: string, ctx: AudioContext, definition: any) {
        this.id = id;
        this.context = ctx;
        this.inputs = [];
        this.outputs = [ctx.createGain()];
        this.modules = new Map();
        this.route = [];
    }

    updateParams(params: Record<string, any>) {
        // GPT code, check it out
        this.modules.forEach((module, audioModule) => {
            for (const [key, value] of Object.entries(params)) {
                if (key in module) {
                    (module as any)[key] = value;
                }
            }
        });
    }

    destroy() :void {
        this.modules.forEach((module) => {
            module.inputs.forEach((input: AudioNode) => input.disconnect());
            module.outputs.forEach((output: AudioNode) => output.disconnect());
        });
        this.modules.clear();
    }

}