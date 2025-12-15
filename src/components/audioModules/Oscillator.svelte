<script>
    import Knob from "../common/Knob.svelte";
    const { state } = $props();
    console.log("Oscillator state:", state);
</script>

<div class="oscillator-module">
    <h3>Oscillator</h3>
    <div class="controls">
        <label>
            Frequency
            <!-- need to get value from state -->
            <Knob min="20" max="20000" value={state.frequency} />
        </label>
        <label>
            Waveform
            <select>
                <option value="sine">Sine</option>
                <option value="square">Square</option>
                <option value="sawtooth">Sawtooth</option>
                <option value="triangle">Triangle</option>
            </select>
        </label>
    </div>
</div>
