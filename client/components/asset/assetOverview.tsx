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
import { makeCalendarDateTime } from "../../app-logic/datetime";
import { Grid } from "@UI/Grid/Grid";
import { Asset } from "@skeksify/nfte-common/dist/entities/Asset";
import { GridContainer } from "@UI/Grid/GridContainer";
import { Common } from "@RESOURCES/translations/english/common";
import { Collection } from "@skeksify/nfte-common/dist/entities/Collection";
import { RankingsTable } from "@COMPONENTS/asset/rankingsTable";
import { HistoryTable } from "@COMPONENTS/asset/historyTable";

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
  collection: Collection;
}

const updateTitle = (newVal: string) => {
  if (typeof document !== "undefined") {
    document.title = newVal;
  }
};
export const AssetOverview: FC<Props> = ({ asset, collection }: Props) => {
  // const size = useScreenSize();
  // updateTitle(size.toUpperCase());
  return (
    <View centered>
      <View maxWidth={maxPageWidth} marginRight={30} marginLeft={30}>
        <View marginBottom={20} relative>
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
                        longText
                      >
                        {collection.name}
                      </Text.Header>
                    </View>
                  </View>
                </View>
              </Grid>
              <Grid item xs={12} sm={6}>
                <GridContainer>
                  <FinancialOverview
                    data={[
                      {
                        label: Common.EstValue,
                        value: "-",
                        IconSrc: TwoCoins,
                      },
                      {
                        label: Common.RarityFactor,
                        value: "-",
                        IconSrc: TwoCoins,
                      },
                      {
                        label: Common.LastSalePrice,
                        value: asset.liveData?.lastSalePrice,
                        IconSrc: TwoCoins,
                      },
                      {
                        label: Common.LastSaleDate,
                        value: asset.liveData?.lastSaleDate
                          ? makeCalendarDateTime(asset.liveData.lastSaleDate)
                          : "",
                        IconSrc: TwoCoins,
                      },
                    ]}
                  />
                  <FinancialOverview
                    miniMode
                    data={[
                      {
                        label: Common.CollectionValue,
                        value:
                          collection.calculatedData?.totalValue?.value + " ETH",
                        IconSrc: TwoCoins,
                      },
                      {
                        label: Common.CollectionVolume24h,
                        value:
                          collection.calculatedData?.volume24h?.value + " ETH",

                        IconSrc: TwoCoins,
                      },
                      {
                        label: Common.AssetVolume1y,
                        value: "?",
                        IconSrc: TwoCoins,
                      },
                      {
                        label: Common.CollectionSupply,
                        value: collection.supply,
                        IconSrc: TwoCoins,
                        size: "small",
                      },
                    ]}
                  />
                </GridContainer>
              </Grid>
            </Grid>
          </FlexView>
        </View>
        <Paper alignItems={"start"} paddingTop={10}>
          <View>
            <Tabs
              views={[
                [
                  "Traits",
                  () => (
                    <TraitsTable
                      traits={asset.traits}
                      supply={collection.supply || 1}
                    />
                  ),
                ],
                [
                  "Charts",
                  () => (
                    <View centered marginT>
                      Only thing currently missing from Tabs!
                    </View>
                  ),
                ],
                ["Ranking", () => <RankingsTable asset={asset} />],
                ["History", () => <HistoryTable asset={asset} />],
                ["Details", () => <GeneralDetailsTable asset={asset} />],
              ]}
            />
          </View>
        </Paper>
      </View>
    </View>
  );
};
