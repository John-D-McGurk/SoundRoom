import type { Voice } from "./voice";

export class OscillatorVoice implements Voice {
    active = false;
    startTime = 0;

    ctx: AudioContext;
    oscillator: OscillatorNode | null = null;
    output: GainNode;

    attack: number;
    decay: number;
    sustain: number;
    release: number;

    waveform: OscillatorType;

    constructor(params: Map<string, number | OscillatorType>, ctx: AudioContext) {
        this.ctx = ctx;
        this.output = ctx.createGain();

        const attack = params.get("attack") ?? 0.1;
        this.attack = typeof attack === "number" ? attack : 0.1;

        const decay = params.get("decay") ?? 0.1;
        this.decay = typeof decay === "number" ? decay : 0.1;

        const sustain = params.get("sustain") ?? 0.7;
        this.sustain = typeof sustain === "number" ? sustain : 0.7;

        const release = params.get("release") ?? 0.2;
        this.release = typeof release === "number" ? release : 0.2;

        const waveform = params.get("waveform");
        this.waveform = isOscillatorType(waveform) ? waveform : "sine";
    }

    setParam(param: string, value: number): void {
        switch (param) {
            case "attack":
                this.attack = value;
                break;
            case "decay":
                this.decay = value;
                break;
            case "sustain":
                this.sustain = value;
                break;
            case "release":
                this.release = value;
                break;
            default:
                break;
        }
    }

    setWaveform(waveform: OscillatorType): void {
        if (isOscillatorType(waveform)) {
            this.waveform = waveform;
        }
    }

    start(note: number, velocity: number): void {
        const now = this.ctx.currentTime;

        this.oscillator = this.ctx.createOscillator();
        this.oscillator.frequency.setValueAtTime(
            440 * Math.pow(2, (note - 69) / 12),
            now
        );

        this.oscillator.connect(this.output);

        const gain = this.output.gain;
        const peak = velocity / 127;

        gain.cancelScheduledValues(now);
        gain.setValueAtTime(0, now);
        gain.linearRampToValueAtTime(peak, now + this.attack);
        gain.linearRampToValueAtTime(
            peak * this.sustain,
            now + this.attack + this.decay
        );

        this.oscillator.start(now);

        this.active = true;
        this.startTime = now;
    }

    stop(): void {
        if (!this.oscillator) return;

        const now = this.ctx.currentTime;
        const gain = this.output.gain;

        gain.cancelScheduledValues(now);
        gain.setValueAtTime(gain.value, now);
        gain.linearRampToValueAtTime(0, now + this.release);

        this.oscillator.stop(now + this.release);
        this.oscillator.onended = () => {
            this.oscillator?.disconnect();
            this.oscillator = null;
        };

        this.active = false;
    }
}

function isOscillatorType(v: unknown): v is OscillatorType {
    return v === "sine" || v === "square" || v === "sawtooth" || v === "triangle" || v === "custom";
}