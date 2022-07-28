import React, { FC } from "react";
import { Text, TextProps } from "@UI/Text/Text";
import _ from "lodash";

interface Props extends TextProps {
  amount: number;
}

const $currency = "$";
const ETHcurrency = "ETH";

export const Price: FC<Props> = ({ amount, ...textProps }: Props) => {
  const [integer, fraction] = amount.toString().split(".");
  const formattedAmount = _.chunk(integer.split("").reverse(), 3)
    .map((chunk) => chunk.join(""))
    .join(",")
    .split("")
    .reverse()
    .join("");
  return (
    <Text textAlign={"end"} size14 {...textProps}>{`${formattedAmount}${
      fraction ? `.${fraction}` : ".00"
    }${ETHcurrency}`}</Text>
  );
};
