import React, { CSSProperties, FC } from "react";
import { Paper } from "@UI/Paper/Paper";
import { Colors } from "@RESOURCES/colors";
import { Icon, IconComponent } from "@UI/Icon/Icon";
import { AutoView } from "@UI/View/AutoView";
import { FlexView } from "@UI/View/FlexView";
import { RowView } from "@UI/View/RowView";
import { Text } from "@UI/Text/Text";
import { TripleCircleGrayLarge } from "@ICONS/icons";
import { View } from "@UI/View/View";
import _ from "lodash";

interface Props {
  upperText: string | number | FC;
  lowerText: string | number | FC;
  IconSrc: IconComponent;
  backgroundColor?: Colors;
  upperTextColor?: Colors;
  lowerTextColor?: Colors;
  miniMode?: boolean;
  smallText?: boolean;
}

interface IconBoxPermutations {
  Light: FC<Props>;
}

const ornamentsStyle: CSSProperties = {
  position: "absolute",
  marginRight: "auto",
  marginLeft: "auto",
  opacity: 1,
  right: -136,
  bottom: 15,
};

export const IconBox: FC<Props> & IconBoxPermutations = ({
  upperText,
  lowerText,
  IconSrc,
  backgroundColor = Colors.White,
  upperTextColor = Colors.BlueDark2,
  lowerTextColor = Colors.Blue1,
  miniMode,
  smallText,
}: Props) => {
  const textSize = miniMode || smallText ? { size12: true } : { size24: true };
  return (
    <Paper
      height={100}
      backgroundColor={backgroundColor}
      verticalCentered
      relative
      overflowHidden
      padding={miniMode ? 10 : 20}
    >
      <RowView>
        <AutoView
          marginRight={20}
          hide={miniMode}
          size={60}
          backgroundColor={Colors.BlueLight1}
          rounded
          verticalCentered
          centered
        >
          <Icon Src={IconSrc} />
        </AutoView>
        <FlexView verticalCentered alignItems={miniMode ? "center" : "start"}>
          {_.isString(upperText) || _.isNumber(upperText) ? (
            <Text size13 colorEnum={upperTextColor} longText>
              {upperText}
            </Text>
          ) : (
            upperText({})
          )}
          {_.isString(lowerText) || _.isNumber(lowerText) ? (
            <Text {...textSize} colorEnum={lowerTextColor} bold longText>
              {lowerText}
            </Text>
          ) : (
            lowerText({})
          )}
        </FlexView>
        <View {...ornamentsStyle} hide={miniMode}>
          <Icon Src={TripleCircleGrayLarge} />
        </View>
      </RowView>
    </Paper>
  );
};

IconBox.Light = ({ ...props }) => (
  <IconBox
    backgroundColor={Colors.White}
    upperTextColor={Colors.BlueDark2}
    lowerTextColor={Colors.BlueDark2}
    {...props}
  />
);
