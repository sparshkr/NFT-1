import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Num(props) {
  const [supply, setSupply] = useState("");

  useEffect(() => {
    const getTotalSupply = async () => {
      try {
        const num = await props.state.contract.totalSupply();
        setSupply(num.toString());
      } catch (error) {
        console.error("Error fetching total supply:", error);
      }
    };

    if (props.state.contract) {
      getTotalSupply();
    }
  }, [props.state.contract]);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          const numElement = document.createElement("div");
          numElement.id = "num";
          document.body.appendChild(numElement);
          document.querySelector("#num").innerHTML = `TotalSupply = ${supply}`;
        }}
      >
        Get Total supply
      </button>
    </>
  );
}
