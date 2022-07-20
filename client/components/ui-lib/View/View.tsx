import { CSSProperties, useMemo } from "react";
import { FCC } from "@DEFS/types";
import _ from "lodash";
import { useCustomStyles } from "../../../hooks/useCustomStyles";

const DEV_MODE: boolean = true;

const staticStyles: Record<"justifyCenter" | "alignCenter", CSSProperties> = {
  justifyCenter: { justifyContent: "center" },
  alignCenter: { alignItems: "center" },
};

const getNumber = (value: string | number | undefined): number => {
  if (typeof value === "number") {
    return value;
  } else {
    return parseInt(value || "0");
  }
};

interface PresetStyleProps {
  row?: boolean;
  autoWidth?: boolean;
  centered?: boolean;
  flex1?: boolean;
  pseudoHide?: boolean;
  marginB?: boolean;
  marginR?: boolean;
  marginL?: boolean;
  marginT?: boolean;
  alignStart?: boolean;
  verticalCentered?: boolean;
  size?: number;
  rounded?: boolean;
  relative?: boolean;
  overflowHidden?: boolean;
  fullHeight?: boolean;
  hideInXS?: boolean;
}

const defaultStyle: CSSProperties = {
  flexDirection: "column",
  display: "flex",
  width: "100%",
};

export interface ViewProps extends PresetStyleProps, CSSProperties {
  DEBUG?: boolean;
  tag?: string;
  hide?: boolean;
  classes?: string;
  onClick?: () => void;
  styleBySize?: {
    xs?: CSSProperties;
    sm?: CSSProperties;
    md?: CSSProperties;
    lg?: CSSProperties;
    xl?: CSSProperties;
  };
}

/*
 * xs --- Extra small devices (portrait phones, less than 576px)
 * No media query since this is the default in Bootstrap

 * sm --- Small devices (landscape phones, 576px and up)
 * @media (min-width: 576px) { ... }

 * md --- Medium devices (tablets, 768px and up)
 * @media (min-width: 768px) { ... }

 * lg --- Large devices (desktops, 992px and up)
 * @media (min-width: 992px) { ... }

 * xl --- Extra large devices (large desktops, 1200px and up)
 * @media (min-width: 1200px) { ... }
 */
const standardMargin = 12;
export const View: FCC<ViewProps> = ({
  DEBUG,
  tag,
  classes,
  onClick,
  row,
  autoWidth,
  centered,
  flex1,
  hide,
  pseudoHide,
  marginB,
  marginR,
  marginL,
  marginT,
  alignStart,
  verticalCentered,
  size,
  rounded,
  relative,
  overflowHidden,
  fullHeight,
  children,
  hideInXS,
  ...rest
}) => {
  const propOverrides = useCustomStyles(
    [
      [row, { flexDirection: "row" }],
      [autoWidth, { width: "auto" }],
      [centered, row ? staticStyles.justifyCenter : staticStyles.alignCenter],
      [alignStart, { alignItems: "start" }],
      [flex1, { flex: 1 }],
      [pseudoHide, { display: "none" }],
      [marginB, { marginBottom: standardMargin }],
      [marginR, { marginRight: standardMargin }],
      [marginL, { marginLeft: standardMargin }],
      [marginT, { marginTop: standardMargin }],
      [
        verticalCentered,
        row ? staticStyles.alignCenter : staticStyles.justifyCenter,
      ],
      [
        _.isNumber(size),
        {
          width: size,
          height: size,
        },
      ],
      [rounded, { borderRadius: 12 }],
      [relative, { position: "relative" }],
      [overflowHidden, { overflow: "hidden" }],
      [fullHeight, { height: "100%" }],
      [!!onClick, { cursor: "pointer" }],
    ],
    [pseudoHide, DEV_MODE ? Math.random() : 0]
  );

  const styleObject: CSSProperties = {
    ...defaultStyle,
    ...rest,
    ...propOverrides,
  };

  const calculatedClasses = useMemo<string>(() => {
    const classesResult = classes?.split(" ") || [];
    hideInXS && classesResult.push("non-xs");
    return [...new Set(classesResult)].join(" ");
  }, [classes, hideInXS]);

  const adjustedWidth = useMemo(() => {
    const right = rest.marginRight || (marginR ? standardMargin : 0);
    const left = rest.marginLeft || (marginL ? standardMargin : 0);
    if (right || left) {
      const totalMargins = getNumber(right) + getNumber(left);
      return `calc(100% - ${totalMargins}px)`;
    }
  }, []);

  const fullWidth = styleObject.width === "100%";

  const calculatedOverrides = useCustomStyles([
    [fullWidth && !!adjustedWidth, { width: adjustedWidth }],
    [flex1, { width: "auto" }],
  ]);

  DEBUG &&
    console.log({
      styleObject,
      calculatedOverrides,
    });

  return hide ? null : (
    <div
      style={{ ...styleObject, ...calculatedOverrides }}
      data-tag={tag}
      onClick={onClick}
      className={calculatedClasses}
    >
      {children}
    </div>
  );
};
