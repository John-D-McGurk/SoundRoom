import type { AudioModule } from "../audioModule";
import type { Voice } from "./voice";

export interface VoiceModule extends AudioModule {
    createVoice(): Voice;
}