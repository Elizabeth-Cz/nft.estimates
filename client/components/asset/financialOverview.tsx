import React, { FC } from "react";
import { Grid, GridSizes } from "@UI/Grid/Grid";
import { IconBox } from "@UI/Box/IconBox";
import { IconComponent } from "@UI/Icon/Icon";
import { Common } from "@RESOURCES/translations/english/common";

interface Datum {
  label: string;
  value?: string | number | FC;
  IconSrc: IconComponent;
  size?: "small";
}

interface Props {
  data: [Datum, Datum, Datum, Datum];
  miniMode?: boolean;
  gridSizes?: GridSizes;
}

const normalSizes: GridSizes = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 6,
};

export const FinancialOverview: FC<Props> = ({
  data,
  miniMode,
  gridSizes = normalSizes,
}: Props) => {
  return (
    <>
      {data.map(
        ({ label, value = Common.NO_DATA_SIGN, IconSrc, size }, index) => (
          <Grid {...gridSizes} item key={index}>
            <IconBox.Light
              upperText={label}
              lowerText={value}
              IconSrc={IconSrc}
              miniMode={miniMode}
              smallText={size === "small"}
            />
          </Grid>
        )
      )}
    </>
  );
};
