import axios from "axios";
import _ from "lodash";

export const getDetails = async (contractAddress: string, tokenId: string) => {
  console.log(contractAddress, tokenId);
  const res = await axios.get(`https://api.etherscan.io/api`, {
    params: {
      module: "account",
      action: "tokennfttx",
      contractaddress: contractAddress,
      page: 1,
      offset: 1000,
      startblock: 0,
      endblock: 27025780,
      sort: "asc",
      apikey: "7C3HX8SSDQTFEEZH7R5HE6RMVYYWMVKXY6",
    },
  });

  const targetToken = _.find(res.data.result, (nft) => nft.tokenID === tokenId);

  console.log("Found Asset:", targetToken);
};

// getDetails("0xd4e4078ca3495de5b1d4db434bebc5a986197782", "114");
