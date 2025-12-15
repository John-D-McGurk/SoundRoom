export type ModuleDefinition = {
    type: string;
    pos: { x: number; y: number };
    params: Record<string, unknown>;
};

export type InstrumentDefinition = {
    meta: {
        name: string;
        author?: string;
        version: string;
    };
    input: Record<string, unknown>;
    grid: {
        rows: number;
        cols: number;
    };
    modules: Record<string, ModuleDefinition>;
    routing: string[][];
};