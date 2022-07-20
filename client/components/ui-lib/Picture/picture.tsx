import React, { CSSProperties, FC } from "react";
import { View, ViewProps } from "@UI/View/View";
import { useCustomStyles } from "../../../hooks/useCustomStyles";

interface Props extends ViewProps {
  src: string;
  imageBorderRadius?: number;
}

const defaultImageStyling: CSSProperties = {
  // maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
};

export const Picture: FC<Props> = ({
  src,
  imageBorderRadius = 0,
  ...styleProps
}: Props) => {
  const imageStyleOverrides = useCustomStyles([
    [!!imageBorderRadius, { borderRadius: imageBorderRadius }],
  ]);
  return (
    <View {...styleProps}>
      <img
        src={src}
        style={{ ...defaultImageStyling, ...imageStyleOverrides }}
        alt={""}
      />
    </View>
  );
};
