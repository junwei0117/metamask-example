import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injected } from "../components/wallet/connectors";
import { createNFTContractInstance } from "./contract";

export default function Home() {
  const { active, chainId, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [NFTBalance, setNFTBalance] = useState("0");
  const [chainName, setChainName] = useState("");

  useEffect(() => {
    const updateChainName = () => {
      if (chainId == 1) {
        setChainName("Mainnet");
      } else if (chainId == 4) {
        setChainName("Rinkeby");
      } else {
        setChainName("unsupport chain");
      }
    };

    const getNFTBalance = async (address) => {
      const contract = createNFTContractInstance(library);
      const balance = await contract?.methods.balanceOf(address).call();
      setNFTBalance(balance);
    };

    getNFTBalance(account);
    updateChainName();
  });

  const connect = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="py-2 mt-20 mb-4 text-lg font-bold w-56 hover:bg-blue-800">
        Mazinger NFT Demo Page
      </h1>
      <p></p>
      {!active ? (
        <button
          onClick={connect}
          className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
        >
          Connect to MetaMask
        </button>
      ) : (
        <button
          onClick={disconnect}
          className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
        >
          Disconnect
        </button>
      )}
      {active ? (
        <span>
          You are connect at <b>{chainName}</b> with <b>{account}</b>
          {NFTBalance !== "0" ? (
            <div>
              <p>
                Congratulations, you have the right to redeem physical dolls -
                please click the link below to fill in the shipping form
              </p>
              <button className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">
                Go
              </button>
            </div>
          ) : (
            <p>Sorry, you don't have any Mazinget NFT :(</p>
          )}
        </span>
      ) : (
        <span>Not connected</span>
      )}
    </div>
  );
}
