<script lang="ts">

    import Oscillator from "./audioModules/Oscillator.svelte";
    import { selectInstrument } from "../stores/selectInstrument";
    import { getInstrumentDefinition } from "../audio/instruments/getInstrumentDefinition";
    import { moduleComponents } from "./audioModules";
    import { inputComponents } from "./inputs";


    const { id } = $props();
    console.log("Instrument id:", id);
    const instrumentState = selectInstrument(id);
    console.log("Instrument state:", $instrumentState);
    const instrumentDefinition = getInstrumentDefinition('test');
    console.log("Instrument definition:", instrumentDefinition);

    const inputType = instrumentDefinition?.input?.type;

</script>

{#if instrumentDefinition && $instrumentState}
  {#each Object.entries(instrumentDefinition.modules) as [moduleId, moduleDef]}
    {#if moduleComponents[moduleDef.type]}
      {@const Component = moduleComponents[moduleDef.type]}
      <Component
        instanceId={id}
        moduleId={moduleId}
        state={$instrumentState.params.osc1}
        definition={moduleDef}
      />
    {/if}
  {/each}
  {#if inputType && inputComponents[inputType]}
    {@const InputComponent = inputComponents[inputType]}
    <InputComponent instanceId={id} />
  {/if}

  


{/if}
