import React, { FC } from "react";
import { buildColumn, Table } from "@UI/Table/Table";
import { Trait } from "@skeksify/nfte-common/dist/entities/Asset";
import { Common } from "@RESOURCES/translations/english/common";

interface Props {
  traits?: Trait[];
  supply: number;
}

const getRarityString = (sharersCount: number, supply: number) => {
  const rarity = (sharersCount / supply) * 100;
  if (rarity <= 0.2) {
    return Common.Mythic;
  } else if (rarity <= 1) {
    return Common.UltraRare;
  } else if (rarity <= 10) {
    return Common.Rare;
  } else if (rarity <= 20) {
    return Common.Uncommon;
  } else if (rarity <= 25) {
    return Common.Common;
  } else {
    return Common.VeryCommon;
  }
};

const getFormattedPercent = (sharersCount: number, supply: number) =>
  `${+((sharersCount / supply) * 100).toFixed(1)}`;

export const TraitsTable: FC<Props> = ({ traits = [], supply }: Props) => {
  return (
    <Table
      columns={[
        buildColumn.text(Common.Type),
        buildColumn.text(Common.Attribute),
        buildColumn.text(Common.Rarity),
        buildColumn.percent("%"),
        // buildColumn.text("Est. Trait Value"),
      ]}
      data={traits.map(({ name, value, sharersCount = 0 }) => [
        { value: name },
        { value },
        { value: getRarityString(sharersCount, supply) },
        { value: getFormattedPercent(sharersCount, supply) },
        // { value: "UNREADY" },
      ])}
    />
  );
};
