import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { styled } from "@mui/material";
import { BlueCircles } from "@ICONS/icons";
import { Icon } from "@UI/Icon/Icon";
import { RowView } from "@UI/View/RowView";
import { Text } from "@UI/Text/Text";
import { AutoView } from "@UI/View/AutoView";
import { Common } from "@RESOURCES/translations/english/common";
import { SearchBox } from "@UI/TextInput/SearchBox";
import { BlueButton } from "@UI/Button/Button";
import { dailyDigestId } from "@UI/TextInput/DigestInput";

const scrollToBottom = () => document.getElementById(dailyDigestId)?.focus();

const BarOffset = styled("div")(({ theme }) => theme.mixins.toolbar);
export const TopBar = () => {
  return (
    <>
      <AppBar
        position={"fixed"}
        style={{
          backgroundColor: "#fff",
          boxShadow: "0px 1px 3px rgba(46, 78, 111, 0.06)",
        }}
      >
        <Container maxWidth={"xl"}>
          <Toolbar disableGutters>
            <RowView verticalCentered>
              <Icon Src={BlueCircles} marginR />
              <AutoView marginRight={32}>
                <Text bold size18>
                  {Common.NftEstimates}
                </Text>
              </AutoView>
              <SearchBox />
              <AutoView hideInXS marginLeft={40}>
                <BlueButton onClick={scrollToBottom}>Subscribe</BlueButton>
              </AutoView>
            </RowView>
          </Toolbar>
        </Container>
      </AppBar>
      <BarOffset />
    </>
  );
};
