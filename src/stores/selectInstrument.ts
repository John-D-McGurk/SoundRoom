import { derived } from 'svelte/store';
import { instruments } from './instruments';

export function selectInstrument(id: string) {
  return derived(instruments, ($instruments) => $instruments[id]);
}