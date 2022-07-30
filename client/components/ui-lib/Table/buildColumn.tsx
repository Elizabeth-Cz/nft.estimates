import { Text, TextFormatter } from "@UI/Text/Text";
import _ from "lodash";
import { Price } from "@UI/Financial/Price";
import { ChangeDir, ChangePercent } from "@UI/Financial/ChangePercent";
import moment from "moment";
import { DateFormat } from "@skeksify/nfte-common/dist/toolset/dateTime";
import { RowView } from "@UI/View/RowView";
import { Picture } from "@UI/Picture/picture";
import React, { CSSProperties, FC } from "react";
import { Property } from "csstype";
import Link from "next/link";
import { View } from "@UI/View/View";
import TextAlign = Property.TextAlign;

export interface CellComponentProps {
  data: CellData;
  textAlign?: TextAlign;
  formatter?: TextFormatter;
}

export interface Column {
  label?: string;
  textAlign?: TextAlign;
  CellComponent?: FC<CellComponentProps>;
  cellStyle?: CSSProperties;
  formatter?: TextFormatter;
}

export type CellData = {
  value?: string | number;
  image?: string;
  changeDir?: ChangeDir;
  link?: string;
};

type ColumnTypes =
  | "numeric"
  | "price"
  | "changePercent"
  | "text"
  | "percent"
  | "rank"
  | "date"
  | "dateTime"
  | "textWithImage";

export const buildColumn: Record<ColumnTypes, (label?: string) => Column> = {
  text: (label) => ({
    label,
    textAlign: "start",
  }),
  numeric: (label) => ({
    label,
    textAlign: "end",
    formatter: (data) => `+${data}+`,
  }),
  price: (label) => ({
    label,
    textAlign: "end",
    CellComponent: ({ data }) =>
      _.isNumber(data.value) ? <Price amount={data.value} /> : null,
  }),
  changePercent: (label) => ({
    label,
    textAlign: "center",
    CellComponent: ({ data }) =>
      _.isNumber(data.value) && data.changeDir ? (
        <ChangePercent value={data.value} changeDir={data.changeDir} />
      ) : null,
  }),
  percent: (label) => ({
    label,
    textAlign: "center",
    formatter: (data) => `${data}%`,
  }),
  rank: (label) => ({
    label,
    textAlign: "center",
    formatter: (data) => `#${data}`,
  }),
  date: (label) => ({
    label,
    textAlign: "center",
    formatter: (data) => moment(data).format(DateFormat.DATE_LOCAL),
  }),
  dateTime: (label) => ({
    label,
    textAlign: "center",
    formatter: (data) => moment(data).format(DateFormat.DATE_TIME_LOCAL),
  }),
  textWithImage: (label) => ({
    label,
    textAlign: "left",
    CellComponent: ({ data }) => {
      return data.link ? (
        <RowView verticalCentered>
          <Link href={data.link}>
            {data.image ? (
              <Picture src={data.image} size={36} imageBorderRadius={10} />
            ) : (
              <View width={36} />
            )}
          </Link>
          <Text marginLeft={20} size14>
            <Link href={data.link}>{data.value}</Link>
          </Text>
        </RowView>
      ) : null;
    },
  }),
};
