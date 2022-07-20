import { useEffect } from "react";

export const asyncUseEffect = (handler: () => Promise<void>, deps: any[]) => {
  useEffect(() => {
    handler();
  }, deps);
};
