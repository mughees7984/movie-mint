
import React from "react";
import SendTransactionForm from "./SendTransactionForm";

const Hero = ({ selectedChain }) => {
  return (
    <div className="text-white ml-14 mb-10">
      <h3 className="text-5xl font-bold">Movie Mint</h3>
      <p className="text-xl mt-5">
        Buy stakes of the movies and play a vital role in their development
      </p>

      <div className="flex items-center justify-between gap-3 mt-10">
        <h4 className="text-[#b0d357] text-4xl">Button</h4>
        <button
          type="button"
          className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold hover:bg-lime-400 transition whitespace-nowrap"
        >
          Explore Projects
        </button>
      </div>

      <SendTransactionForm selectedChain={selectedChain} />
    </div>
  );
};

export default Hero;
