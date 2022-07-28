import { CSSProperties } from "react";
import { FCC } from "@DEFS/types";
import { Typography } from "@mui/material";
import { Colors } from "@RESOURCES/colors";
import { useCustomStyles } from "../../../hooks/useCustomStyles";
import _ from "lodash";

export interface TextFormatter {
  (data: string | number): string;
}

export interface TextProps extends CSSProperties {
  DEBUG?: boolean;
  subtext?: boolean;
  bold?: boolean;
  size12?: boolean;
  size13?: boolean;
  size14?: boolean;
  size18?: boolean;
  size20?: boolean;
  size24?: boolean;
  size32?: boolean;
  colorEnum?: Colors;
  longText?: boolean;
  formatter?: TextFormatter;
}

const defaultStyle: CSSProperties = {
  textAlign: "center",
  margin: 0,
  whiteSpace: "nowrap",
};

const getFontSize = (...headerSizes: (boolean | undefined)[]) =>
  `${
    [0.75, 0.813, 0.875, 1.125, 1.25, 1.5, 2][headerSizes.indexOf(true)] || 1
  }rem`;

const getInREM = (pixelValue: number): string => `${pixelValue / 16}rem`;

interface TextPermutations {
  Header: FCC<TextProps>;
  SubHeader: FCC<TextProps>;
}

export const Text: FCC<TextProps> & TextPermutations = ({
  DEBUG,
  fontSize,
  subtext,
  bold,
  size12,
  size13,
  size14,
  size18,
  size20,
  size24,
  size32,
  colorEnum,
  longText,
  formatter,
  children,
  ...rest
}) => {
  const overrideStyle = useCustomStyles([
    [!!colorEnum, { color: colorEnum }],
    [!!longText, { whiteSpace: "normal" }],
  ]);
  DEBUG && console.log(overrideStyle);
  return (
    <Typography
      fontSize={
        _.isNumber(fontSize)
          ? getInREM(fontSize)
          : getFontSize(size12, size13, size14, size18, size20, size24, size32)
      }
      fontWeight={bold ? 600 : 400}
      variant={subtext ? "subtitle1" : "body1"}
      style={{ ...defaultStyle, ...rest, ...overrideStyle }}
    >
      {formatter && (_.isString(children) || _.isNumber(children))
        ? formatter(children)
        : children}
    </Typography>
  );
};

Text.Header = ({ children, ...props }) => {
  return (
    <Text size24 bold colorEnum={Colors.Blue1} {...props}>
      {children}
    </Text>
  );
};
Text.SubHeader = ({ children, ...props }) => {
  return (
    <Text size18 bold {...props}>
      {children}
    </Text>
  );
};
