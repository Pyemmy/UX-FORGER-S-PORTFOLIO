import { useEffect } from 'react';

// Ref-counted so stacked dialogs (e.g. résumé opened from the console) never
// unlock the page too early or leave it locked.
let lockCount = 0;
let savedPaddingRight = '';

const lock = () => {
  if (lockCount === 0) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    savedPaddingRight = document.body.style.paddingRight;
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    document.documentElement.style.overflow = 'hidden';
  }
  lockCount += 1;
};

const unlock = () => {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.documentElement.style.overflow = '';
    document.body.style.paddingRight = savedPaddingRight;
  }
};

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lock();
    return unlock;
  }, [active]);
}
