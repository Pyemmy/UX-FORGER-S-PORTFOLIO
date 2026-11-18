import { useSyncExternalStore } from 'react';
import { sounds } from '../utils/audio';

/** Live mute state shared by every sound toggle on the page. */
export function useSoundMuted() {
  return useSyncExternalStore(
    (onChange) => sounds.subscribe(onChange),
    () => sounds.isMuted,
    () => false,
  );
}
