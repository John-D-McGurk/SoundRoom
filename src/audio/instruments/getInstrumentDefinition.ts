import test from './test.json';

import type { InstrumentDefinition } from './InstrumentDefintion';

export const instrumentDefinitions = {
    test,
} as Record<string, InstrumentDefinition>;

export type InstrumentId = keyof typeof instrumentDefinitions;

export function getInstrumentDefinition(id: InstrumentId): InstrumentDefinition {
  return instrumentDefinitions[id];
}