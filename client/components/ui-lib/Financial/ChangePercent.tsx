import React, { FC, useMemo } from "react";
import { Text, TextProps } from "@UI/Text/Text";
import { RowView } from "@UI/View/RowView";
import { Icon } from "@UI/Icon/Icon";
import { GreenUpArrow, RedDownArrow } from "@ICONS/icons";
import { Colors } from "@RESOURCES/colors";
import { View } from "@UI/View/View";

interface Props extends ChangePercentCell, TextProps {}

export type ChangeDir = "up" | "down";

export interface ChangePercentCell {
  value: number;
  changeDir: ChangeDir;
}

export const ChangePercent: FC<Props> = ({
  value,
  changeDir,
  ...textProps
}: Props) => {
  const color: Colors = useMemo(
    () => (changeDir === "up" ? Colors.Green : Colors.Red),
    [changeDir]
  );
  return (
    <RowView verticalCentered centered>
      <View width={20} height={20} centered verticalCentered>
        <Icon Src={changeDir === "up" ? GreenUpArrow : RedDownArrow} />
      </View>
      <Text
        textAlign={"end"}
        size14
        fontWeight={500}
        colorEnum={color}
        {...textProps}
      >
        {value}%
      </Text>
    </RowView>
  );
};
