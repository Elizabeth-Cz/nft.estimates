import React, { FC } from "react";
import { Text, TextProps } from "@UI/Text/Text";
import _ from "lodash";

interface Props extends TextProps {
  amount: number;
}

const $currency = "$";
const ETHCurrency = "ETH";

export const formatPrice = _.memoize(
  (price: number = 0, currency: string = ETHCurrency) => {
    const [integer, fraction] = price.toString().split(".");
    const trimmedFraction = fraction ? +fraction.substring(0, 2) : "";
    const formattedAmount = _.chunk(integer.split("").reverse(), 3)
      .map((chunk) => chunk.join(""))
      .join(",")
      .split("")
      .reverse()
      .join("");
    return `${formattedAmount}${
      trimmedFraction ? `.${trimmedFraction}` : ""
    } ${currency}`;
  }
);

export const Price: FC<Props> = ({ amount, ...textProps }: Props) => {
  const formattedPrice = formatPrice(amount);
  return (
    <Text textAlign={"end"} size14 {...textProps}>
      {formattedPrice}
    </Text>
  );
};
