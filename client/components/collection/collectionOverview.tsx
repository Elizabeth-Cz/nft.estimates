import React, { FC, useMemo } from "react";
import { View } from "@UI/View/View";
import { FlexView } from "@UI/View/FlexView";
import { Text } from "@UI/Text/Text";
import { Paper } from "@UI/Paper/Paper";
import { Colors } from "@RESOURCES/colors";
import { Breadcrumbs } from "@UI/Breadcrumbs/Breadcrumbs";
import { Pages } from "../../pages/pages.types";
import { maxPageWidth } from "@UI/Layout/Layout";
import { Picture } from "@UI/Picture/picture";
import { Grid } from "@UI/Grid/Grid";
import { Asset } from "@skeksify/nfte-common/dist/entities/Asset";
import { Collection } from "@skeksify/nfte-common/dist/entities/Collection";
import { FinancialOverview } from "@COMPONENTS/asset/financialOverview";
import { Common } from "@RESOURCES/translations/english/common";
import { TwoCoins } from "@ICONS/icons";
import { GridContainer } from "@UI/Grid/GridContainer";
import { Tabs } from "@UI/Tabs/Tabs";
import { CollectionAssetsTable } from "@COMPONENTS/collection/collectionAssetsTable";

interface Props {
  assets: Asset[];
  collection: Collection;
}

const tweakImageUrl = (url: string) => url.replace(/s\d\d\d$/, "s500");

export const CollectionOverview: FC<Props> = ({
  collection,
  assets,
}: Props) => {
  const onSaleAssets = useMemo(
    () => assets.filter((asset) => asset.liveData?.onSale),
    [assets]
  );
  return (
    <View centered>
      <View maxWidth={maxPageWidth} marginRight={30} marginLeft={30}>
        <View marginBottom={40} relative>
          <FlexView tag={"HERE"}>
            <Breadcrumbs page={Pages.Collection} />
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item xs={12} sm={3}>
                <View
                  centered
                  verticalCentered
                  marginB
                  fullHeight
                  borderRadius={12}
                  background={Colors.White}
                  boxShadow={"rgb(0 0 0 / 10%) 0px 4px 10px 0px"}
                >
                  {collection.imageUrl && (
                    <Picture
                      src={tweakImageUrl(collection.imageUrl)}
                      maxWidth={200}
                      imageMaxHeight={200}
                    />
                  )}
                </View>
              </Grid>
              <Grid item xs={12} sm={9}>
                <View marginL marginR fullHeight verticalCentered>
                  <View autoWidth>
                    <Text.Header
                      marginBottom={10}
                      fontWeight={600}
                      textAlign={"left"}
                      longText
                    >
                      {collection.name}
                    </Text.Header>
                    <Text.SubHeader
                      marginBottom={10}
                      longText
                      textAlign={"left"}
                    >
                      Lorem Ipsum
                    </Text.SubHeader>
                  </View>
                </View>
              </Grid>
            </Grid>
            <View marginTop={20}>
              <GridContainer>
                <FinancialOverview
                  gridSizes={{
                    xs: 12,
                    sm: 6,
                    md: 6,
                    lg: 3,
                  }}
                  data={[
                    {
                      label: Common.EstCollectionValue,
                      value: Common.NO_DATA_SIGN,
                      IconSrc: TwoCoins,
                    },
                    {
                      label: Common.CollectionVolume24h,
                      value: collection.calculatedData?.salesSum24h?.value,
                      IconSrc: TwoCoins,
                    },
                    {
                      label: Common.CollectionVolume7d,
                      value: collection.calculatedData?.salesSum7d?.value,
                      IconSrc: TwoCoins,
                    },
                    {
                      label: Common.OnSale,
                      value: collection.calculatedData?.onSaleAmount?.value,
                      IconSrc: TwoCoins,
                    },
                  ]}
                />
                <FinancialOverview
                  miniMode
                  gridSizes={{
                    xs: 6,
                    sm: 6,
                    md: 3,
                  }}
                  data={[
                    {
                      label: Common.NFTsSold24h,
                      value: collection.calculatedData?.salesAmount24h?.value,
                      IconSrc: TwoCoins,
                    },
                    {
                      label: Common.NFTsSold7d,
                      value: collection.calculatedData?.salesAmount7d?.value,
                      IconSrc: TwoCoins,
                    },
                    {
                      label: Common.FloorPrice,
                      value: collection.calculatedData?.floorPrice?.value,
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
            </View>
          </FlexView>
        </View>

        <Text.Header bold colorEnum={Colors.BlueDark2} textAlign={"left"}>
          NFTs in the Collection
        </Text.Header>

        <Text
          size14
          colorEnum={Colors.BlueDark2}
          textAlign={"left"}
          marginBottom={20}
          longText
        >
          This page lists the top NFT collections. They are listed by sales
          volume with the most valuable first and then in descending order.
        </Text>
        <Paper alignItems={"start"} paddingTop={10}>
          <Tabs
            views={[
              [Common.AllNFTs, () => <CollectionAssetsTable assets={assets} />],
              [
                Common.OnSale,
                () => <CollectionAssetsTable assets={onSaleAssets} />,
              ],
              [Common.Traits, () => <View />],
              [Common.Charts, () => <View />],
            ]}
          />
        </Paper>
      </View>
    </View>
  );
};
