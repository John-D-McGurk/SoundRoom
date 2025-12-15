import { instruments, type InstrumentState } from "./instruments";
import { getInstrumentDefinition } from "../audio/instruments/getInstrumentDefinition";
import { nanoid } from "nanoid";

export function createInstrument(type: string) {
    const definition = getInstrumentDefinition(type);
    const params = Object.values(definition.modules)
        .map((mod) => mod.params)
        .reduce((acc, params) => ({ ...acc, ...params }), {});


    const id = nanoid();
    const state: InstrumentState = {
        id,
        type,
        params,
    };

    instruments.update((current) => {
        return {
            ...current,
            [id]: state,
        };
    });

    return { id, state, definition}
}