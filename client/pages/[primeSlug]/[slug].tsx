import type { NextPage } from "next";
import { useState } from "react";
import { asyncUseEffect } from "../../hooks/asyncUseEffect";
import { assetsChamber } from "../../data-hall/assetsChamber";
import { Asset } from "@skeksify/nfte-common/dist/entities/Asset";
import { useQuery } from "../../hooks/useQuery";
import { AssetOverview } from "@COMPONENTS/asset/assetOverview";
import { View } from "@UI/View/View";
import { Collection } from "@skeksify/nfte-common/dist/entities/Collection";
import { collectionsChamber } from "../../data-hall/collectionChamber";

const AssetPage: NextPage = () => {
  const [collectionData, setCollectionData] = useState<Collection | null>(null);
  const [assetData, setAssetData] = useState<Asset | null>(null);
  const { slug, primeSlug } = useQuery();
  asyncUseEffect(async () => {
    if (
      typeof primeSlug === "string" &&
      typeof slug === "string" &&
      primeSlug &&
      slug
    ) {
      const [asset, collection] = await Promise.all([
        assetsChamber.getOne({
          tokenId: slug,
          collectionId: primeSlug,
        }),
        collectionsChamber.getOne({
          collectionId: primeSlug,
        }),
      ]);
      setAssetData(asset);
      setCollectionData(collection);
    }
  }, [primeSlug, slug]);

  return assetData && collectionData ? (
    <AssetOverview asset={assetData} collection={collectionData} />
  ) : (
    <View height={200} centered verticalCentered>
      Loading
    </View>
  );
};

export default AssetPage;
