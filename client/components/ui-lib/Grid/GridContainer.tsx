import React, { FC, PropsWithChildren } from "react";
import { Grid } from "@UI/Grid/Grid";

interface Props {}

export const GridContainer: FC<Props> = ({
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      {children}
    </Grid>
  );
};
