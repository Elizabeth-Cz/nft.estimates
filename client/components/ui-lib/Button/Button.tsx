import React, { CSSProperties, PropsWithChildren } from "react";
import { Button as MUIButton } from "@mui/material";
import { FCC } from "@DEFS/types";
import { Text, TextProps } from "@UI/Text/Text";
import { Colors } from "@RESOURCES/colors";

interface Props {
  buttonStyle?: CSSProperties;
  textStyle?: TextProps;
  onClick?: () => void;
}

const defaultPadding: CSSProperties = {
  paddingRight: "12px",
  paddingLeft: "12px",
};

export const Button: FCC<Props> = ({
  onClick,
  buttonStyle,
  textStyle,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <MUIButton style={{ ...defaultPadding, ...buttonStyle }} onClick={onClick}>
      <Text {...textStyle}>{children}</Text>
    </MUIButton>
  );
};

export const RedButton: FCC<Props> = ({
  onClick,
  buttonStyle,
  textStyle,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Button
      buttonStyle={{
        backgroundColor: "#FF5252",
        color: "white",
        ...buttonStyle,
      }}
      textStyle={textStyle}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export const BlueButton: FCC<Props> = ({
  onClick,
  buttonStyle,
  textStyle,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Button
      buttonStyle={{
        backgroundColor: Colors.Blue1,
        height: 40,
        borderRadius: 8,
        ...buttonStyle,
      }}
      textStyle={{
        size14: true,
        color: "white",
        fontWeight: 500,
        marginRight: 20,
        marginLeft: 20,
        ...textStyle,
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
