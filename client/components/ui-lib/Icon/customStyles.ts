import { CSSProperties } from "react";
import _ from "lodash";

type CustomStyle = [boolean | undefined, CSSProperties];
export const buildCustomStyles = (styles: CustomStyle[]) =>
  _.reduce(
    styles,
    (acc: any, [flag, rule]) => (flag ? { ...acc, ...rule } : acc),
    {}
  );
