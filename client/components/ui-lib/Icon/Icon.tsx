import { FCC } from "@DEFS/types";
import { AutoView } from "@UI/View/AutoView";
import { ViewProps } from "@UI/View/View";
import React from "react";

export type IconComponent = React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
>;

interface Props {
  Src: IconComponent;
  marginR?: boolean;
  size?: number;
  style?: ViewProps;
  width?: number;
  height?: number;
}

export const Icon: FCC<Props> = ({
  Src,
  marginR,
  size,
  style,
  height,
  width,
}) => {
  return (
    <AutoView marginR={marginR} {...style}>
      {size || height || width ? (
        <Src width={size || width} height={size || height} />
      ) : (
        <Src />
      )}
    </AutoView>
  );
};
