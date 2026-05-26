import { useCallback, useEffect, useRef, useState } from "react";

const HISTORY_LIMIT = 50;

interface State<T> {
  past: T[];
  present: T;
  future: T[];
}

export interface UndoableState<T> {
  state: T;
  set: (next: Partial<T> | ((prev: T) => Partial<T>), label?: string) => void;
  replace: (next: T) => void;
  reset: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

/**
 * State manager with undo/redo and optional localStorage persistence.
 *
 * `set` patches a subset of fields and pushes a history entry. `replace` swaps
 * the whole value without recording history (used when restoring from storage).
 */
export function useUndoableState<T extends object>(
  defaultValue: T,
  storageKey?: string
): UndoableState<T> {
  const [history, setHistory] = useState<State<T>>(() => {
    if (storageKey && typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<T>;
          return {
            past: [],
            present: { ...defaultValue, ...parsed },
            future: [],
          };
        }
      } catch {
        // Ignore — fall back to defaults.
      }
    }
    return { past: [], present: defaultValue, future: [] };
  });

  const defaultRef = useRef(defaultValue);

  // Persist on present change.
  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(history.present));
    } catch {
      // Quota errors etc. — fine to ignore.
    }
  }, [history.present, storageKey]);

  const set = useCallback(
    (next: Partial<T> | ((prev: T) => Partial<T>)) => {
      setHistory((h) => {
        const patch = typeof next === "function" ? next(h.present) : next;
        const newPresent = { ...h.present, ...patch };
        const past = [...h.past, h.present];
        if (past.length > HISTORY_LIMIT) past.shift();
        return { past, present: newPresent, future: [] };
      });
    },
    []
  );

  const replace = useCallback((next: T) => {
    setHistory({ past: [], present: next, future: [] });
  }, []);

  const reset = useCallback(() => {
    setHistory((h) => ({
      past: [...h.past, h.present].slice(-HISTORY_LIMIT),
      present: defaultRef.current,
      future: [],
    }));
  }, []);

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.past.length === 0) return h;
      const previous = h.past[h.past.length - 1];
      const past = h.past.slice(0, -1);
      return { past, present: previous, future: [h.present, ...h.future] };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((h) => {
      if (h.future.length === 0) return h;
      const [next, ...rest] = h.future;
      return { past: [...h.past, h.present], present: next, future: rest };
    });
  }, []);

  return {
    state: history.present,
    set,
    replace,
    reset,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
}
