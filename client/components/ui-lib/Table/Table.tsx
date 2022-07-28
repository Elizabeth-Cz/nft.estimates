import React, { CSSProperties, FC } from "react";
import {
  Paper,
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Text, TextFormatter } from "@UI/Text/Text";
import { Colors } from "@RESOURCES/colors";
import { Price } from "@UI/Financial/Price";
import _ from "lodash";
import { ChangeDir, ChangePercent } from "@UI/Financial/ChangePercent";
import { Property } from "csstype";
import moment from "moment";
import { DateFormat } from "@skeksify/nfte-common/dist/toolset/dateTime";
import TextAlign = Property.TextAlign;

interface CellComponentProps {
  data: CellData;
  textAlign?: TextAlign;
  formatter?: TextFormatter;
}

interface Column {
  label?: string;
  textAlign?: TextAlign;
  CellComponent?: FC<CellComponentProps>;
  cellStyle?: CSSProperties;
  formatter?: TextFormatter;
}

type CellData = {
  value?: string | number;
  image?: string;
  changeDir?: ChangeDir;
};

interface Props {
  columns: Column[] | null;
  data?: CellData[][];
}

const DefaultCell: FC<CellComponentProps> = ({
  data,
  textAlign,
  formatter,
}: CellComponentProps) => {
  return data.value ? (
    <Text
      size14
      colorEnum={Colors.BlueDark2}
      textAlign={textAlign}
      formatter={formatter}
    >
      {data.value}
    </Text>
  ) : (
    <></>
  );
};

type ColumnTypes =
  | "numeric"
  | "price"
  | "changePercent"
  | "text"
  | "percent"
  | "rank"
  | "date"
  | "dateTime";

const defaultColumnDefinition: Column = {
  label: "",
  textAlign: "start",
};

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
};

export const Table: FC<Props> = ({ columns, data }: Props) => {
  return (
    <TableContainer component={Paper} style={{}}>
      <MUITable sx={{}} size="small">
        {columns && (
          <TableHead>
            <TableRow>
              {columns.map(({ label, textAlign }, index) => (
                <TableCell align={index ? "right" : undefined} key={index}>
                  {label && (
                    <Text
                      colorEnum={Colors.BlueDark2}
                      fontWeight={600}
                      size12
                      textAlign={textAlign}
                    >
                      {label}
                    </Text>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data?.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {row.map((cellData, cellIndex) => {
                if (columns && !columns[cellIndex]) {
                  throw new Error("Undefined column index");
                }
                const { CellComponent, textAlign, cellStyle, formatter } =
                  columns ? columns[cellIndex] : defaultColumnDefinition;
                return (
                  <TableCell style={cellStyle || {}} key={cellIndex}>
                    {CellComponent ? (
                      <CellComponent data={cellData} formatter={formatter} />
                    ) : (
                      <DefaultCell
                        data={cellData}
                        textAlign={textAlign}
                        formatter={formatter}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};
