import React, { CSSProperties, FC } from "react";
import { View } from "@UI/View/View";
import { FlexView } from "@UI/View/FlexView";
import { Tabs } from "@UI/Tabs/Tabs";
import { Text } from "@UI/Text/Text";
import { Paper } from "@UI/Paper/Paper";
import { Colors } from "@RESOURCES/colors";
import { Breadcrumbs } from "@UI/Breadcrumbs/Breadcrumbs";
import { Pages } from "../../pages/pages.types";
import { maxPageWidth } from "@UI/Layout/Layout";
import { FinancialOverview } from "@COMPONENTS/asset/financialOverview";
import { TwoCoins } from "@ICONS/icons";
import { Picture } from "@UI/Picture/picture";
import { TraitsTable } from "@COMPONENTS/asset/traitsTable";
import { GeneralDetailsTable } from "@COMPONENTS/asset/generalDetailsTable";
import { makeDateTime } from "../../app-logic/datetime";
import { Grid } from "@UI/Grid/Grid";
import { useScreenSize } from "../../hooks/useMediaQuery";
import {Asset} from "@skeksify/nfte-common/entities/Asset";

const forSaleStyle: CSSProperties = {
  width: 60,
  padding: 0,
  height: 60,
  fontSize: 12,
  lineHeight: 16,
  color: "white",
  marginRight: 10,
  fontWeight: 700,
  borderRadius: 50,
  marginBottom: 10,
  textTransform: "uppercase",
  justifyContent: "center",
  border: "6px solid white",
  backgroundColor: "#FF5252",
};

const imageRange = {
  min: 200,
  max: 330,
};

const topNegativeOffset = -100;

const responsiveDimension = `max(${imageRange.min}px, min(40vw, ${imageRange.max}px))`;
const imageWrapperHeight = `calc(${topNegativeOffset}px + ${responsiveDimension})`;
const assetImageStyle: CSSProperties = {
  top: topNegativeOffset,
  borderRadius: 500,
  position: "absolute",
  backgroundSize: "contain",
  border: "10px solid white",
  backgroundPosition: "center",
  width: responsiveDimension,
  height: responsiveDimension,
};
const summaryStyle: CSSProperties = {
  // position: "sticky",
  // top: 80,
  // zIndex: 10
};

interface Props {
  asset: Asset;
  collection: Asset;
}

const updateTitle = (newVal: string) => {
  if (typeof document !== "undefined") {
    document.title = newVal;
  }
};
export const AssetOverview: FC<Props> = ({ asset, collection }: Props) => {
  const size = useScreenSize();
  updateTitle(size.toUpperCase());
  return (
    <View centered>
      <View maxWidth={maxPageWidth} marginRight={30} marginLeft={30}>
        <View marginBottom={50} relative>
          <FlexView tag={"HERE"}>
            <Breadcrumbs page={Pages.Asset} />
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item xs={12} sm={6}>
                <View
                  verticalCentered
                  marginB
                  fullHeight
                  {...summaryStyle}
                  borderRadius={12}
                  background={Colors.White}
                  boxShadow={"rgb(0 0 0 / 10%) 0px 4px 10px 0px"}
                >
                  <View
                    border={"0px solid white"}
                    centered
                    marginT
                    marginR
                    marginL
                  >
                    {asset.imageUrl && (
                      <Picture src={asset.imageUrl} maxWidth={352} />
                    )}
                  </View>
                  <View marginL marginR fullHeight verticalCentered>
                    <View autoWidth>
                      <Text.SubHeader
                        bold
                        colorEnum={Colors.BlueDark2}
                        textAlign={"left"}
                      >
                        #{asset.tokenId}
                      </Text.SubHeader>
                    </View>
                    <View autoWidth>
                      <Text.Header
                        marginBottom={10}
                        fontWeight={600}
                        textAlign={"left"}
                        long
                      >
                        {collection.name}
                      </Text.Header>
                    </View>
                  </View>
                </View>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FinancialOverview
                  data={[
                    {
                      label: "Est. Value",
                      value: "$2.5M",
                      IconSrc: TwoCoins,
                    },
                    {
                      label: "Rarity Factor",
                      value: "7.3",
                      IconSrc: TwoCoins,
                    },
                    {
                      label: "Last Sale Price",
                      value: asset.liveData?.lastSalePrice,
                      IconSrc: TwoCoins,
                    },
                    {
                      label: "Last Sale Date",
                      value: asset.liveData?.lastSaleDate
                        ? makeDateTime(asset.liveData.lastSaleDate)
                        : "",
                      IconSrc: TwoCoins,
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FinancialOverview
                  miniMode
                  data={[
                    {
                      label: "Est. Value",
                      value: "$2.5M",
                      IconSrc: TwoCoins,
                    },
                    {
                      label: "Rarity Factor",
                      value: "7.3",
                      IconSrc: TwoCoins,
                    },
                    {
                      label: "Last Sale Price",
                      value: asset.liveData?.lastSalePrice,
                      IconSrc: TwoCoins,
                    },
                    {
                      label: "Last Sale Date",
                      value: asset.liveData?.lastSaleDate
                        ? makeDateTime(asset.liveData.lastSaleDate)
                        : "",
                      IconSrc: TwoCoins,
                    },
                  ]}
                />
              </Grid>
            </Grid>
          </FlexView>
        </View>
        <Paper alignItems={"start"}>
          <Text size32 bold colorEnum={Colors.Blackish}>
            First Main Header
          </Text>
          <View>
            <Tabs
              views={[
                ["Details", () => <GeneralDetailsTable asset={asset} />],
                ["Traits", () => <TraitsTable traits={asset.traits} />],
                ["Charts", () => <View centered>Graph Charts</View>],
                ["Ranking", () => <View centered>3</View>],
                ["History", () => <View centered>4</View>],
              ]}
            />
          </View>
        </Paper>
      </View>
    </View>
  );
};
