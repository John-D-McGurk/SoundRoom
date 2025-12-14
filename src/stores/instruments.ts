import { writable } from "svelte/store";

export interface InstrumentState {
  type: string;

  params: Record<string, any>;

  voice?: {
    notes?: Set<number>;
  };
}

export const instruments =
  writable<Record<string, InstrumentState>>({});