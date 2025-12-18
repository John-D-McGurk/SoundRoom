import type { InstrumentDefinition } from "./instruments/InstrumentDefintion";
import type { AudioModule } from "./modules/audioModule";

export class InstrumentRuntime {
    readonly id: string;
    readonly context: AudioContext;

    inputs: AudioNode[];
    outputs: AudioNode[];
    modules: Map<string, AudioModule>;
    route: string[][];

    constructor(id: string, ctx: AudioContext, definition: InstrumentDefinition) {
        this.id = id;
        this.context = ctx;
        this.inputs = [];
        this.outputs = [ctx.createGain()];
        this.modules = new Map();
        this.route = definition.routing;
    }

    connect(from: AudioNode, to: AudioNode) {
        from.connect(to);
    }

    createRoute() {
        for (const routeStep of this.route) {
            const [fromId, toId] = routeStep;
            const fromModule = this.modules.get(fromId);
            const toModule = this.modules.get(toId);
            if (fromModule && toModule) {
                this.connect(fromModule.outputs[0], toModule.inputs[0]);
            }
        }
    }

    createModule(moduleId: string, module: AudioModule) {
        this.modules.set(moduleId, module);
    }

    createModules(definition: InstrumentDefinition) {
        for (const [moduleId, moduleDef] of Object.entries(definition.modules)) {

        }
    }

    setParam(moduleId: string, param: string, value: number): void {
        this.modules.get(moduleId)?.setParam(param, value);
    }

    playNote(note: number, velocity: number): void {

    }

    destroy(): void {
        this.modules.forEach((module) => {
            module.inputs.forEach((input: AudioNode) => input.disconnect());
            module.outputs.forEach((output: AudioNode) => output.disconnect());
        });
        this.modules.clear();
    }

}