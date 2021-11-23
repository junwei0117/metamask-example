
import { NFTContractABI, NFTContractAddress } from "../constants/NFT";

export const createNFTContractInstance = (web3) =>  {
  return web3
    ? new web3.eth.Contract(NFTContractABI, NFTContractAddress, {
        from: web3.eth.defaultAccount,
      })
    : null
}
