import { useRef, useCallback } from "react";

export function useElementRef() {
  const elementRef = useRef<HTMLElement | null>(null);
  const setElementRef = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
  }, []);

  return [elementRef, setElementRef] as const;
}
