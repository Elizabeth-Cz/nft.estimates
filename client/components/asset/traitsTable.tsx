import React, { FC } from "react";
import { buildColumn, Table } from "@UI/Table/Table";
import { Trait } from "@skeksify/nfte-common/dist/entities/Asset";

interface Props {
  traits?: Trait[];
}

export const TraitsTable: FC<Props> = ({ traits = [] }: Props) => {
  return (
    <Table
      columns={[
        buildColumn.text("Type"),
        buildColumn.text("Attribute"),
        buildColumn.text("Rarity"),
        buildColumn.percent("%"),
        buildColumn.text("Est. Trait Value"),
      ]}
      data={traits.map(({ name, value, rarity }) => [
        { value: name },
        { value },
        { value: 20 },
        { value: `${rarity || 0}/totalSupply` },
        { value: "-" },
      ])}
    />
  );
};
