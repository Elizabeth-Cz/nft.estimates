export const BREAK_MAP = Symbol();

export const syncForEach = async <T>(
  collection: T[],
  callback: (item: T, index: number) => Promise<void | typeof BREAK_MAP>
) => {
  let index = 0;
  for (let item of collection) {
    const returnValue = await callback(item, index++);
    if (returnValue === BREAK_MAP) {
      break;
    }
  }
};

let breakNext = false;
let ongoingMapping = false;

export const breakSyncMap = () => {
  if (ongoingMapping) {
    breakNext = true;
  }
};

export const syncMap = async <T, NEW_T>(
  collection: T[],
  callback: (item: T, index: number) => Promise<NEW_T | typeof BREAK_MAP>
) => {
  let index = 0;
  ongoingMapping = true;
  const result: NEW_T[] = [];
  for (let item of collection) {
    const returnValue = await callback(item, index++);
    if (returnValue === BREAK_MAP || breakNext) {
      breakNext = false;
      break;
    } else {
      result.push(returnValue);
    }
  }
  ongoingMapping = false;
  return result;
};
