import { RowView } from "@UI/View/RowView";
import React, { FC } from "react";
import { Grid, GridSizes } from "@UI/Grid/Grid";
import { IconBox } from "@UI/Box/IconBox";
import { IconComponent } from "@UI/Icon/Icon";

interface Datum {
  label: string;
  value?: string | number | FC;
  IconSrc: IconComponent;
}

interface Props {
  data: [Datum, Datum, Datum, Datum];
  miniMode?: boolean;
}

const normalSizes: GridSizes = {
  xs: 12,
  sm: 12,
  md: 12,
};

const miniSizes: GridSizes = {
  xs: 6,
  sm: 3,
  md: 3,
};

export const FinancialOverview: FC<Props> = ({ data, miniMode }: Props) => {
  return (
    <RowView verticalCentered centered relative fullHeight>
      <Grid container columnSpacing={2} rowSpacing={2}>
        {data.map(({ label, value = "-", IconSrc }, index) => (
          <Grid {...(miniMode ? miniSizes : normalSizes)} item key={index}>
            <IconBox.Light
              upperText={label}
              lowerText={value}
              IconSrc={IconSrc}
              miniMode={miniMode}
            />
          </Grid>
        ))}
      </Grid>
    </RowView>
  );
};
