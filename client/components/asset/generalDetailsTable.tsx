import React, { FC } from "react";
import { Table } from "@UI/Table/Table";
import {Asset} from "@skeksify/nfte-common/entities/Asset";

interface Props {
  asset: Asset;
}

export const GeneralDetailsTable: FC<Props> = ({ asset }: Props) => {
  return (
    <Table
      columns={null}
      data={[
        [{ value: "Token ID" }, { value: asset.tokenId }],
        [{ value: "Token Standard" }, { value: "-" }],
        [{ value: "Blockchain" }, { value: "-" }],
        [{ value: "Fees" }, { value: "-" }],
        [{ value: "Contract Address" }, { value: asset.collectionAddress }],
      ]}
    />
  );
};
