<script>
    import { createInstrument as createInstrumentStore } from "../stores/createInstrument";
    import { getAudioEngine } from "../audio/AudioEngine";

    function handleAddInstrument() {
        const { id, state, definition } = createInstrumentStore("test");
        const engine = getAudioEngine();
        if (engine) {
            engine.createInstrument(id, definition);
        }
        
    }
</script>

<button on:click={handleAddInstrument}>
    Add Instrument
</button>