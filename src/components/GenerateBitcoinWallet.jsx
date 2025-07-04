import React from "react";
import { generateBTCWallet } from "../utils/generateBTCWallet";

const GenerateBitcoinWallet = () => {
  const handleGenerate = () => {
    const { address, wif } = generateBTCWallet();
    alert(`🎉 BTC Testnet Wallet:\n\nAddress: ${address}\nPrivate Key: ${wif}`);
  };

  return (
    <button
      onClick={handleGenerate}
      className="bg-[#b0d357] text-black px-6 py-3 rounded-full font-semibold hover:bg-lime-400 transition"
    >
      Generate BTC Wallet
    </button>
  );
};

export default GenerateBitcoinWallet;
