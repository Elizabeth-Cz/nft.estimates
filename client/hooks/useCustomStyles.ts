import { CSSProperties, useMemo } from "react";
import _ from "lodash";

type CustomStyle = [boolean | undefined, CSSProperties];
export const useCustomStyles = (
  styles: CustomStyle[],
  deps: any[] = []
): CSSProperties =>
  useMemo(
    () =>
      _.reduce(
        styles,
        (acc: any, [flag, rule]) => (flag ? { ...acc, ...rule } : acc),
        {}
      ),
    deps
  );
