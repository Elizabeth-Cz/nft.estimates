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
import { Text } from "@UI/Text/Text";
import { Colors } from "@RESOURCES/colors";
import { Price } from "@UI/Financial/Price";
import _ from "lodash";
import { ChangeDir, ChangePercent } from "@UI/Financial/ChangePercent";
import { Property } from "csstype";
import TextAlign = Property.TextAlign;

interface CellComponentProps {
  data: CellData;
  textAlign?: TextAlign;
}

interface Column {
  label?: string;
  textAlign?: TextAlign;
  CellComponent?: FC<CellComponentProps>;
  cellStyle?: CSSProperties;
  formatter?: (data: string | number) => string;
}

type CellData = {
  value?: string | number;
  image?: string;
  changeDir?: ChangeDir;
};

interface Props {
  columns: Column[] | null;
  data: CellData[][];
}

const DefaultCell: FC<CellComponentProps> = ({
  data,
  textAlign,
}: CellComponentProps) => {
  return data.value ? (
    <Text size14 colorEnum={Colors.BlueDark2} textAlign={textAlign}>
      {data.value}
    </Text>
  ) : (
    <></>
  );
};

type ColumnTypes = "numeric" | "price" | "changePercent" | "text" | "percent";
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
};

export const Table: FC<Props> = ({ columns, data }: Props) => {
  return (
    <TableContainer component={Paper} style={{}}>
      <MUITable sx={{}} size="small">
        {columns && (
          <TableHead>
            <TableRow>
              {columns.map(({ label }, index) => (
                <TableCell align={index ? "right" : undefined} key={index}>
                  {label && (
                    <Text colorEnum={Colors.BlueDark2} fontWeight={600} size12>
                      {label}
                    </Text>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {row.map((cellData, cellIndex) => {
                const { CellComponent, textAlign, cellStyle } = columns
                  ? columns[cellIndex]
                  : defaultColumnDefinition;
                return (
                  <TableCell style={cellStyle || {}} key={cellIndex}>
                    {CellComponent ? (
                      <CellComponent data={cellData} />
                    ) : (
                      <DefaultCell data={cellData} textAlign={textAlign} />
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
