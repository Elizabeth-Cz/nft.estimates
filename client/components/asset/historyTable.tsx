import React, { FC } from "react";
import { buildColumn, Table } from "@UI/Table/Table";
import { Asset } from "@skeksify/nfte-common/dist/entities/Asset";
import { Common } from "@RESOURCES/translations/english/common";

interface Props {
  asset: Asset;
}

enum AssetEventTypes {
  CREATION = "CREATION",
  SALE = "SALE",
  BID = "BID",
}

const eventTypeToLabel: Record<AssetEventTypes, string> = {
  [AssetEventTypes.CREATION]: "Minted - deprecated likely",
  [AssetEventTypes.SALE]: Common.Sale,
  [AssetEventTypes.BID]: Common.Bid,
};

export const HistoryTable: FC<Props> = ({ asset }: Props) => {
  const sales = asset.events?.sales?.history || [];
  return (
    <Table
      columns={[
        buildColumn.text(Common.Event),
        buildColumn.price(Common.Price),
        buildColumn.date(Common.Date),
        // buildColumn.percent(Common.ChangePERCENT),
      ]}
      data={[
        ...sales
          .map(({ eventType, price, eventTime }) => [
            { value: eventType ? eventTypeToLabel[eventType] : "" },
            { value: price },
            { value: eventTime },
            // { value: "UNREADY" },
          ])
          .reverse(),
        [
          { value: Common.Minted },
          { value: Common.NO_DATA_SIGN },
          { value: asset.mintingDate },
          // { value: Common.NO_DATA_SIGN },
        ],
      ]}
    />
  );
};
