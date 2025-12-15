<script>

    import Oscillator from "./audioModules/Oscillator.svelte";
    import { selectInstrument } from "../stores/selectInstrument";
    import { getInstrumentDefinition } from "../audio/instruments/getInstrumentDefinition";

    const { id } = $props();
    console.log("Instrument id:", id);
    const instrumentState = selectInstrument(id);
    console.log("Instrument state:", $instrumentState);

</script>

<Oscillator state={$instrumentState?.params.osc1} />

