export function makeListenerManager(targetEl: EventTarget | null) {
  const listeners: [
    keyof DocumentEventMap,
    EventListenerOrEventListenerObject,
    AddEventListenerOptions | boolean | undefined
  ][] = [];

  const add = <T extends Event>(
    eventName: keyof DocumentEventMap,
    handler: (event: T) => void,
    options?: AddEventListenerOptions | boolean
  ) => {
    targetEl?.addEventListener(eventName, handler as EventListener, options);
    listeners.push([eventName, handler as EventListener, options]);
  };

  const removeAll = () => {
    listeners.forEach((li) => targetEl?.removeEventListener(...li));
  };

  return {
    add,
    removeAll,
  };
}
