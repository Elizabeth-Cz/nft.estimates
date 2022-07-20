import React, { PropsWithChildren } from "react";
import { View, ViewProps } from "@UI/View/View";
import { FCC } from "@DEFS/types";
import { Colors } from "@RESOURCES/colors";

interface Props extends ViewProps {
  grey?: boolean;
  lightRounding?: boolean;
}

const boxShadow = "0px 4px 8px rgba(3, 32, 76, 0.04)";

export const Paper: FCC<Props> = ({
  grey,
  lightRounding,
  children,
  ...viewProps
}: PropsWithChildren<Props>) => {
  return (
    <View
      padding={20}
      borderRadius={lightRounding ? 6 : 12}
      boxShadow={boxShadow}
      background={grey ? Colors.BlueLight1 : Colors.White}
      {...viewProps}
    >
      {children}
    </View>
  );
};
