import { Box, Tab as MUITab, Tabs as MUITabs, useTheme } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import React, { FC } from "react";
import { View } from "@UI/View/View";

type TabView = [string | FC, FC];

interface Props {
  views: TabView[];
}

export const Tabs: FC<Props> = ({ views }: Props) => {
  const theme = useTheme();
  const [currentView, setCurrentView] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentView(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setCurrentView(index);
  };
  return (
    <Box sx={{}} width={"100%"}>
      <MUITabs
        value={currentView}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        variant={"scrollable"}
      >
        {views.map(([label], index) =>
          typeof label === "string" ? (
            <MUITab label={label} key={index} />
          ) : undefined
        )}
      </MUITabs>
      <View justifyContent={"center"}>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={currentView}
          onChangeIndex={handleChangeIndex}
        >
          {views.map(([, TabView], index) => (
            <View hide={currentView !== index} key={index}>
              <TabView />
            </View>
          ))}
        </SwipeableViews>
      </View>
    </Box>
  );
};
