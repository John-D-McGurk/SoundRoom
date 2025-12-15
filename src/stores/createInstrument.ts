import { instruments, type InstrumentState } from "./instruments";
import { getInstrumentDefinition } from "../audio/instruments/getInstrumentDefinition";
import { nanoid } from "nanoid";

export function createInstrument(type: string) {
    const definition = getInstrumentDefinition(type);
    const params = Object.entries(definition.modules).reduce(
        (acc, [name, mod]) => ({ ...acc, [name]: mod.params }),
        {} as Record<string, Record<string, unknown>>
    );


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