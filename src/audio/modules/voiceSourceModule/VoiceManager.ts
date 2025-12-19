import type { Voice } from "./voice";
import type { VoiceFactory } from "./createVoice";

export class VoiceManager {
  private voices: Voice[] = [];
  private activeNotes = new Map<number, Voice>();

  constructor(
    voiceCount: number,
    private factory: VoiceFactory
  ) {
    for (let i = 0; i < voiceCount; i++) {
      this.voices.push(factory.createVoice());
    }
  }

  noteOn(note: number, velocity: number) {
    const voice = this.allocateVoice();
    if (!voice) return;

    voice.startTime = performance.now(); // or audio time
    voice.start(note, velocity);
    this.activeNotes.set(note, voice);
  }

  noteOff(note: number) {
    const voice = this.activeNotes.get(note);
    if (!voice) return;

    voice.stop();
    this.activeNotes.delete(note);
  }

  private allocateVoice(): Voice | undefined {
    return (
      this.voices.find(v => !v.active) ??
      this.stealVoice()
    );
  }

  private stealVoice(): Voice | undefined {
    return this.voices.reduce((oldest, v) =>
      v.startTime < oldest.startTime ? v : oldest
    );
  }
}
