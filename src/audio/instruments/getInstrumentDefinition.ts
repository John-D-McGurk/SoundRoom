import test from './test.json';

import type { InstrumentDefinition } from './InstrumentDefintion';

export const instrumentDefinitions = {
    test,
} as Record<string, InstrumentDefinition>;

export type InstrumentId = keyof typeof instrumentDefinitions;

export function getInstrumentDefinition(type: InstrumentId): InstrumentDefinition {
  return instrumentDefinitions[type];
}