import type { NextPage } from "next";
import { useState } from "react";
import { asyncUseEffect } from "../hooks/asyncUseEffect";
import { assetsChamber } from "../data-hall/assetsChamber";
import { useQuery } from "../hooks/useQuery";
import { View } from "@UI/View/View";
import { Collection } from "@skeksify/nfte-common/dist/entities/Collection";
import { collectionsChamber } from "../data-hall/collectionChamber";
import { Asset } from "@skeksify/nfte-common/dist/entities/Asset";
import { CollectionOverview } from "@COMPONENTS/collection/collectionOverview";

const CollectionPage: NextPage = () => {
  const [collectionData, setCollectionData] = useState<Collection | null>(null);
  const [assetsData, setAssetsData] = useState<Asset[]>([]);
  const { primeSlug } = useQuery();
  asyncUseEffect(async () => {
    if (typeof primeSlug === "string" && primeSlug) {
      const [asset, collection] = await Promise.all([
        assetsChamber.get({
          collectionId: primeSlug,
        }),
        collectionsChamber.getOne({
          collectionId: primeSlug,
        }),
      ]);
      setAssetsData(asset.data);
      setCollectionData(collection);
    }
  }, [primeSlug]);

  return collectionData && assetsData ? (
    <CollectionOverview assets={assetsData} collection={collectionData} />
  ) : (
    <View height={200} centered verticalCentered>
      Loading
    </View>
  );
};

export default CollectionPage;
