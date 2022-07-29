import React, { FC } from "react";
import { Table } from "@UI/Table/Table";
import { Asset } from "@skeksify/nfte-common/dist/entities/Asset";
import { Common } from "@RESOURCES/translations/english/common";
import { buildColumn } from "@UI/Table/buildColumn";

interface Props {
  asset: Asset;
}

const columns = [
  buildColumn.text(Common.RankName),
  buildColumn.text(Common.RankValue),
  buildColumn.rank(Common.Collection),
  buildColumn.rank(Common.Overall),
];

export const RankingsTable: FC<Props> = ({ asset }: Props) => {
  return (
    <Table
      columns={columns}
      data={[
        // [
        //   { value: Common.EstValue },
        //   { value: "UNREADY" },
        //   { value: "UNREADY" },
        //   { value: "UNREADY" },
        // ],
        [
          { value: Common.LastSaleValue },
          { value: asset.calculatedData?.lastPrice?.selfValue?.value },
          { value: asset.calculatedData?.lastPrice?.collectionRank?.value },
          { value: asset.calculatedData?.lastPrice?.globalRank?.value },
        ],
        [
          { value: Common.AllSales },
          { value: asset.calculatedData?.salesSum?.selfValue?.value },
          { value: asset.calculatedData?.salesSum?.collectionRank?.value },
          { value: asset.calculatedData?.salesSum?.globalRank?.value },
        ],
        [
          { value: Common.POUNDSales },
          { value: asset.calculatedData?.salesAmount?.selfValue?.value },
          { value: asset.calculatedData?.salesAmount?.collectionRank?.value },
          { value: asset.calculatedData?.salesAmount?.globalRank?.value },
        ],
        // [
        //   { value: Common.RarityFactor },
        //   { value: "UNREADY" },
        //   { value: "UNREADY" },
        //   { value: "UNREADY" },
        // ],
      ]}
    />
  );
};
