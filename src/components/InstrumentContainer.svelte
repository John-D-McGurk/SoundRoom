<script lang="ts">
    import { createInstrument } from "../controllers/createInstrument";
    import { getAudioEngine } from "../audio/AudioEngine";
    import { instruments as instrumentsStore } from "../stores/instruments";

    import Instrument from "./Instrument.svelte";

    function handleAddInstrument() {
        const { id, state, definition } = createInstrument("test");
        const engine = getAudioEngine();
        if (engine) {
            engine.createInstrument(id, definition);
        } else {
            console.error("Audio engine is not available.");
        }
    }
</script>

<button on:click={handleAddInstrument}> Add Instrument </button>

{#each Object.values($instrumentsStore) as instrument (instrument.id)}
    <Instrument id={instrument.id} />
{/each}

