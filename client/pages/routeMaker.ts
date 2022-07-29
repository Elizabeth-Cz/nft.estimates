export class RouteMaker {
  public static makeAssetPagePath(
    contractAddress: string = "",
    tokenId: string = ""
  ) {
    return `/${contractAddress}/${tokenId}`;
  }
  public static makeCollectionPagePath(contractAddress: string = "") {
    return `/${contractAddress}`;
  }
}
