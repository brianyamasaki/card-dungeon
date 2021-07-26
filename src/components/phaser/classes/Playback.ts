import { Turn } from './Recorder';

export class Playback {
  turns: Turn[] = [];

  async load(path: string) {
    const reader = new FileReader();
    // reader.readAsDataURL(path);
  }
}
