import { instruments, type InstrumentState } from "../stores/instruments";
import { getInstrumentDefinition } from "../audio/instruments/getInstrumentDefinition";
import { getAudioEngine } from "../audio/AudioEngine";
import { nanoid } from "nanoid";
import { get } from "svelte/store";

export function createInstrument(type: string) {
    const definition = getInstrumentDefinition(type);
    const id = nanoid();

    // Create the instrument in the audio engine
    const audioEngine = getAudioEngine();
    if (audioEngine) {
        audioEngine.createInstrument(id, definition);
    } else {
        throw new Error("AudioEngine not initialized");
    }

    // Initialize instrument state in the store
    const params = Object.entries(definition.modules).reduce(
        (acc, [name, mod]) => ({ ...acc, [name]: mod.params }),
        {} as Record<string, Record<string, unknown>>
    );
    const isVoice = definition.input.type == 'TestKeyboard'

    const voice = Array(8).fill({ notes: new Set<number>() });

    const state: InstrumentState = {
        id,
        type,
        params,
        ...(isVoice && {voices: voice})
    };

    instruments.update((current) => {
        return {
            ...current,
            [id]: state,
        };
    });

    return { id, state, definition}
}