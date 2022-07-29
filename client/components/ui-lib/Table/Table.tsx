import React, { FC } from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Text } from "@UI/Text/Text";
import { Colors } from "@RESOURCES/colors";
import { CellComponentProps, CellData, Column } from "@UI/Table/buildColumn";

interface Props {
  columns: Column[] | null;
  data?: CellData[][];
  lineHeight?: number;
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

const defaultColumnDefinition: Column = {
  label: "",
  textAlign: "start",
};

export const Table: FC<Props> = ({ columns, data, lineHeight }: Props) => {
  return (
    <TableContainer>
      <MUITable sx={{}} size="small">
        {columns && (
          <TableHead>
            <TableRow>
              {columns.map(({ label, textAlign }, index) => (
                <TableCell
                  align={index ? "right" : undefined}
                  key={index}
                  style={{ border: 0 }}
                >
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
                const lineHeightObj = lineHeight
                  ? { height: lineHeight }
                  : undefined;
                if (columns && !columns[cellIndex]) {
                  throw new Error("Undefined column index");
                }
                const { CellComponent, textAlign, cellStyle, formatter } =
                  columns ? columns[cellIndex] : defaultColumnDefinition;
                return (
                  <TableCell
                    style={{ ...cellStyle, ...lineHeightObj, border: 0 }}
                    key={cellIndex}
                  >
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
