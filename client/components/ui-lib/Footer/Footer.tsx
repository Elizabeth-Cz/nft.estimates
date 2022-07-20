import React, { CSSProperties, FC } from "react";
import { View } from "@UI/View/View";
import { Colors } from "@RESOURCES/colors";
import { Text } from "@UI/Text/Text";
import { DigestInput } from "@UI/TextInput/DigestInput";
import { Common } from "@RESOURCES/translations/english/common";
import { Icon } from "@UI/Icon/Icon";
import { FooterEllipse, FooterTripleCircle } from "@ICONS/icons";

interface Props {}

const ornamentsStyle: CSSProperties = {
  position: "absolute",
  width: 1300,
  height: 600,
  top: 0,
  opacity: 1,
  marginLeft: "auto",
  marginRight: "auto",
  pointerEvents: "none",
};

export const Footer: FC<Props> = ({}: Props) => {
  return (
    <View
      marginTop={80}
      height={326}
      backgroundColor={Colors.Blue1}
      centered
      verticalCentered
      relative
      overflowHidden
    >
      <Text fontSize={40} colorEnum={Colors.White} bold>
        {Common.DailyEstimates}
      </Text>
      <Text colorEnum={Colors.White} opacity={0.7} marginBottom={30}>
        {Common.HottestNFTDealsDesc}
      </Text>
      <DigestInput />
      <View {...ornamentsStyle}>
        <Icon Src={FooterEllipse} />
        <Icon Src={FooterTripleCircle} style={{ alignItems: "end" }} />
      </View>
    </View>
  );
};
