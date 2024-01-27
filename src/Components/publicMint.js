import { ethers } from "ethers";

export default function PublicMint(props) {
  async function sendTransaction() {
    try {
      const tx = await props.state.contract.publicMint({
        value: ethers.parseEther("0.01"),
      });
      await tx.wait();
      console.log("Transaction is Successful");
      window.location.reload();
    } catch (error) {
      const errorMessage = error.message;
      const startIndex = errorMessage.indexOf("execution reverted: ");
      const endIndex = errorMessage.indexOf("{code:");
      const extractedErrorMessage = errorMessage
        .substring(startIndex + "execution reverted: ".length, endIndex)
        .trim();

      console.error("Transaction failed:", extractedErrorMessage);
      alert("Transaction failed: " + extractedErrorMessage);
    }
  }

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          sendTransaction();
        }}
      >
        Mint NFT
      </button>
    </>
  );
}
