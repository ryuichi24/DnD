export function removeAt<TData>(at: number, items: TData[]) {
  const copied = [...items];
  const [removed] = copied.splice(at, 1);
  return {
    removedList: copied,
    removed,
  };
}

export function insertAt<TData>(at: number, items: TData[], item: TData) {
  const copied = [...items];
  copied.splice(at, 0, item);
  return {
    insertList: copied,
    inserted: item,
  };
}

export function swap<TData>(arr: TData[], from: number, to: number) {
  arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
}
