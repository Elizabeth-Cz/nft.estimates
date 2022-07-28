import * as React from "react";
import { FC, useCallback, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  TextField,
} from "@mui/material";
import { Common } from "@RESOURCES/translations/english/common";
import { Colors } from "@RESOURCES/colors";
import { Icon } from "@UI/Icon/Icon";
import { MagnifyingGlass } from "@ICONS/icons";
import { RowView } from "@UI/View/RowView";
import { assetsChamber } from "../../../data-hall/assetsChamber";
import { asyncUseEffect } from "../../../hooks/asyncUseEffect";
import { Asset } from "@skeksify/nfte-common/dist/entities/Asset";
import { View } from "@UI/View/View";
import { Picture } from "@UI/Picture/picture";
import { buildAssetURL } from "../../../app-logic/navigation";
import _ from "lodash";

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& input::placeholder": {
      color: Colors.GrayLight1,
      opacity: 1,
      fontSize: 15,
    },
    "& fieldset": {
      border: 0,
    },
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {},
  },
});
export const SearchBox: FC = () => {
  const [query, setQuery] = useState<string>("");
  const [queryResults, setQueryResults] = useState<Asset[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const fetchHandler = useCallback(
    _.debounce(async (queryParam: string) => {
      if (queryParam) {
        let { data } = await assetsChamber.get({ filter_text: queryParam });
        data && setQueryResults(data);
        setShowResults(!!data);
      } else {
        setQueryResults([]);
        setShowResults(false);
      }
    }, 250),
    [setQueryResults]
  );

  asyncUseEffect(async () => await fetchHandler(query), [query]);

  return (
    <RowView verticalCentered justifyContent={"end"} relative>
      <CustomTextField
        autoComplete={"off"}
        style={{
          fontSize: 11,
          width: "100%",
        }}
        placeholder={Common.SearchNow}
        onChange={(event) => setQuery(event.target.value)}
        onBlur={() => setShowResults(false)}
        onFocus={() => setShowResults(true)}
      />
      <Icon Src={MagnifyingGlass} />
      {showResults && !_.isEmpty(queryResults) && (
        <View top={56} position={"absolute"}>
          <List
            disablePadding
            style={{
              maxHeight: 500,
              overflowY: "auto",
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          >
            {queryResults.map(
              (
                { collectionAddress, collectionName, tokenId, imageUrl },
                index
              ) => (
                <ListItem
                  key={index}
                  disablePadding
                  style={{
                    backgroundColor: Colors.White,
                    minHeight: 70,
                    borderBottom: `1px solid ${Colors.GrayLight2}`,
                  }}
                >
                  <ListItemButton
                    component="a"
                    href={
                      collectionAddress && tokenId
                        ? buildAssetURL(collectionAddress, tokenId)
                        : ""
                    }
                  >
                    {imageUrl && (
                      <View width={40} height={35} verticalCentered marginR>
                        <Picture src={imageUrl} imageBorderRadius={2} />
                      </View>
                    )}
                    <ListItemText
                      primary={`#${tokenId}`}
                      secondary={collectionName}
                    />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </View>
      )}
    </RowView>
  );
};
