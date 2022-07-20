// import React, {CSSProperties, FC} from "react";
// import {View} from "@UI/View/View";
// import {RowView} from "@UI/View/RowView";
// import {FlexView} from "@UI/View/FlexView";
// import {Tabs} from "@UI/Tabs/Tabs";
// import {buildColumn, Table} from "@UI/Table/Table";
// import {Text} from "@UI/Text/Text";
// import {Paper} from "@UI/Paper/Paper";
// import {Common} from "@RESOURCES/translations/english/common";
// import {Colors} from "@RESOURCES/colors";
// import {Asset} from "@skeksify/nfte-common/entities/Asset";
// import {Breadcrumbs} from "@UI/Breadcrumbs/Breadcrumbs";
// import {Pages} from "../../pages/pages.types";
// import {maxPageWidth} from "@UI/Layout/Layout";
// import {FinancialOverview} from "@COMPONENTS/asset/financialOverview";
// import {TwoCoins} from "@ICONS/icons";
//
// const forSaleStyle: CSSProperties = {
//   width: 60,
//   padding: 0,
//   height: 60,
//   fontSize: 12,
//   lineHeight: 16,
//   color: "white",
//   marginRight: 10,
//   fontWeight: 700,
//   borderRadius: 50,
//   marginBottom: 10,
//   textTransform: "uppercase",
//   justifyContent: "center",
//   border: "6px solid white",
//   backgroundColor: "#FF5252",
// }
//
// const imageRange = {
//   min: 200,
//   max: 330
// }
//
// const topNegativeOffset = -100;
//
// const responsiveDimension = `max(${imageRange.min}px, min(40vw, ${imageRange.max}px))`;
// const imageWrapperHeight = `calc(${topNegativeOffset}px + ${responsiveDimension})`;
// const assetImageStyle: CSSProperties = {
//   top: topNegativeOffset,
//   borderRadius: 500,
//   position: "absolute",
//   backgroundSize: "contain",
//   border: "10px solid white",
//   backgroundPosition: "center",
//   width: responsiveDimension,
//   height: responsiveDimension,
// }
//
// interface Props {
//   asset: Asset;
//   collection: Asset;
// }
//
// export const AssetOverview: FC<Props> = ({
//   asset,
//   collection
// }: Props) => {
//   return (
//     <View centered>
//       <View backgroundImage={'url(/otherdeed-cover.png)'}
//             backgroundPosition={"center"} height={164} centered relative>
//         <View backgroundColor={"rgba(3,32,76,0.5)"} height={"100%"} centered>
//           <View maxWidth={maxPageWidth} marginLeft={40}>
//             <Breadcrumbs page={Pages.Asset} lightText/>
//           </View>
//         </View>
//       </View>
//       <View maxWidth={maxPageWidth}>
//         <View marginBottom={50} relative>
//           <View centered height={imageWrapperHeight}>
//             <View
//               backgroundImage={`url(${asset.imageUrl})`}
//               {...assetImageStyle}>
//               {true &&
// 								<View fullHeight alignItems={"end"} justifyContent={"end"}>
// 									<View {...forSaleStyle}>
// 										<Text colorEnum={Colors.White} size12 bold
// 													whiteSpace={"pre-wrap"}>{Common.ForSale}</Text>
// 									</View>
// 								</View>
//               }
//             </View>
//           </View>
//           <FlexView margin={30} tag={"HERE"}>
//             <RowView marginB>
//               <RowView>
//                 <View>
//                   <View>
//                     <Text.Header marginBottom={10}
//                                  fontWeight={600}>{collection.name}</Text.Header>
//                   </View>
//                   <View marginBottom={15}>
//                     <Text size32 bold
//                           colorEnum={Colors.BlueDark2}>#{asset.tokenId}</Text>
//                   </View>
//
//                   <FinancialOverview data={[
//                     {
//                       label: "Est. Value",
//                       value: "$2.5M",
//                       IconSrc: TwoCoins
//                     },
//                     {
//                       label: "Rarity Factor",
//                       value: "7.3",
//                       IconSrc: TwoCoins
//                     },
//                     {
//                       label: "Last Sale Price",
//                       value: asset.liveData?.lastSalePrice,
//                       IconSrc: TwoCoins
//                     },
//                     {
//                       label: "Last Sale Date",
//                       value: asset.liveData?.lastSaleDate,
//                       IconSrc: TwoCoins
//                     },
//                   ]}/>
//                   <FinancialOverview miniMode data={[
//                     {
//                       label: "Est. Value",
//                       value: "$2.5M",
//                       IconSrc: TwoCoins
//                     },
//                     {
//                       label: "Rarity Factor",
//                       value: "7.3",
//                       IconSrc: TwoCoins
//                     },
//                     {
//                       label: "Last Sale Price",
//                       value: asset.liveData?.lastSalePrice,
//                       IconSrc: TwoCoins
//                     },
//                     {
//                       label: "Last Sale Date",
//                       value: asset.liveData?.lastSaleDate,
//                       IconSrc: TwoCoins
//                     },
//                   ]}/>
//                 </View>
//               </RowView>
//             </RowView>
//           </FlexView>
//         </View>
//         <Paper alignItems={"start"}>
//           <Text size32 bold colorEnum={Colors.Blackish}>
//             First Main Header
//           </Text>
//
//           <View>
//             <Tabs views={[
//               [
//                 "Info", () =>
//                 <Table columns={[
//                   {label: "Name",},
//                   buildColumn.numeric("Volume"),
//                   buildColumn.price("Price"),
//                   buildColumn.changePercent("Change % (24h)"),
//                   buildColumn.changePercent("Total Change %"),
//                 ]} data={[
//                   [
//                     {value: "Test Row"},
//                     {value: 32892},
//                     {value: 2.495},
//                     {
//                       value: 2.1,
//                       changeDir: "up"
//                     },
//                     {
//                       value: 5,
//                       changeDir: "down"
//                     },
//                   ],
//                   [
//                     {value: "Test Row 2"},
//                     {value: 63532},
//                     {value: 2.495},
//                     {
//                       value: 2.1,
//                       changeDir: "up"
//                     },
//                     {
//                       value: 1,
//                       changeDir: "down"
//                     },
//                   ],
//                   [
//                     {value: "Test Row 3"},
//                     {value: 29},
//                     {value: 3.495},
//                     {
//                       value: 4.1,
//                       changeDir: "down"
//                     },
//                     {
//                       value: 0,
//                       changeDir: "down"
//                     },
//                   ],
//                 ]}/>
//               ],
//               ["Charts", () => <View centered>2</View>],
//               ["Ranking", () => <View centered>3</View>],
//               ["History", () => <View centered>4</View>],
//             ]}/>
//           </View>
//         </Paper>
//       </View>
//     </View>
//   )
// };

export const kljsdlskdjflskdjflskdjf = 4;
