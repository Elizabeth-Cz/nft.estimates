import React, { FC } from "react";
import { Grid, GridSizes } from "@UI/Grid/Grid";
import { IconBox } from "@UI/Box/IconBox";
import { IconComponent } from "@UI/Icon/Icon";

interface Datum {
  label: string;
  value?: string | number | FC;
  IconSrc: IconComponent;
  size?: "small";
}

interface Props {
  data: [Datum, Datum, Datum, Datum];
  miniMode?: boolean;
}

const normalSizes: GridSizes = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 6,
};

const miniSizes: GridSizes = {
  xs: 6,
  sm: 6,
  md: 3,
};

export const FinancialOverview: FC<Props> = ({ data, miniMode }: Props) => {
  return (
    <>
      {data.map(({ label, value = "-", IconSrc, size }, index) => (
        <Grid {...(miniMode ? miniSizes : normalSizes)} item key={index}>
          <IconBox.Light
            upperText={label}
            lowerText={value}
            IconSrc={IconSrc}
            miniMode={miniMode}
            smallText={size === "small"}
          />
        </Grid>
      ))}
    </>
  );
};
