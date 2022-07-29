import React, { FC } from "react";
import { Common } from "@RESOURCES/translations/english/common";
import { Table } from "@UI/Table/Table";
import { buildColumn } from "@UI/Table/buildColumn";
import { Asset } from "@skeksify/nfte-common/dist/entities/Asset";
import { RouteMaker } from "../../pages/routeMaker";

const columns = [
  buildColumn.textWithImage(Common.NFT),
  buildColumn.price(Common.LastSalePrice),
  buildColumn.text(Common.OnSale),
];

interface Props {
  assets: Asset[];
}

export const CollectionAssetsTable: FC<Props> = ({ assets }: Props) => {
  return (
    <Table
      lineHeight={56}
      columns={columns}
      data={assets.map((asset) => [
        {
          value: `#${asset.tokenId}`,
          image: asset.thumbnailImageUrl,
          link: RouteMaker.makeAssetPagePath(
            asset.collectionAddress,
            asset.tokenId
          ),
        },
        {
          value: asset.calculatedData?.lastPrice?.selfValue?.value,
        },
        {
          value: asset.liveData?.onSale ? Common.Yes : Common.No,
        },
      ])}
    />
  );
};
