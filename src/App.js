import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./Components/contractJson/MyToken.json";
import Num from "./Components/Num";
import PublicMint from "./Components/publicMint";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("");
  useEffect(() => {
    const template = async () => {
      const contractAddres = "0xD963807e9C5df25bB2F760c483aB457bCB05F1d3";
      const contractABI = abi.abi;
      //Metamask part
      //1. In order do transactions on goerli testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      console.log(window.ethereum);
      try {
        const { ethereum } = window;
        if (window.ethereum == undefined) {
          console.log("Metamask not found");
          throw new Error("Metamask not found");
        }

        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(account);

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        setAccount(account);
        let provider, signer;
        if (window.ethereum == undefined) {
          // If MetaMask is not installed, we use the default provider,
          // which is backed by a variety of third-party services (such
          // as INFURA). They do not have private keys installed,
          // so they only have read-only access
          console.log("MetaMask not installed; using read-only defaults");
          alert("MetaMask not installed");
          provider = ethers.getDefaultProvider();
        } else {
          // Connect to the MetaMask EIP-1193 object. This is a standard
          // protocol that allows Ethers access to make all read-only
          // requests through MetaMask.
          provider = new ethers.BrowserProvider(window.ethereum);

          // It also provides an opportunity to request access to write
          // operations, which will be performed by the private key
          // that MetaMask manages for the user.
          signer = await provider.getSigner();
        }

        // console.log(provider);
        // console.log(signer);
        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        );
        console.log(contract);
        setState({ provider, signer, contract });
      } catch (error) {
        alert(error);
      }
    };
    template();
  }, []);
  return (
    <>
      <div>
        Connected Account - {account}
        <Num state={state}></Num>
        <PublicMint state={state}></PublicMint>
      </div>
    </>
  );
}

export default App;
