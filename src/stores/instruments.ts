import { writable } from "svelte/store";

export interface InstrumentState {
    id: string;
    type: string;
    params: Record<string, Record<string, any>>;
    voices?: Array<{
        notes?: Set<number>;
    }>;
}

export const instruments =
    writable<Record<string, InstrumentState>>({});{}