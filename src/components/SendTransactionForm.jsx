
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";

const SendTransactionForm = ({ selectedChain }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [solBalance, setSolBalance] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [btcBalance, setBtcBalance] = useState(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [balanceError, setBalanceError] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  // Fetch wallet address from selected wallet
  const fetchWalletAddress = async () => {
    try {
      if (selectedChain === "solana" && window.solana?.isConnected) {
        return window.solana.publicKey.toString();
      } else if (
        (selectedChain === "ethereum" || selectedChain === "bsc") &&
        window.ethereum
      ) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        return await signer.getAddress();
      } else if (selectedChain === "bitcoin" && window.unisat) {
        const accounts = await window.unisat.getAccounts();
        return accounts[0];
      }
    } catch (error) {
      console.error("Error fetching wallet address:", error);
    }
    return null;
  };

  const fetchBalance = async () => {
    setIsLoadingBalance(true);
    setBalanceError(null);
    try {
      const address = await fetchWalletAddress();
      setWalletAddress(address);

      if (selectedChain === "solana" && window.solana?.isConnected) {
        const connection = new Connection("https://api.devnet.solana.com");
        const balance = await connection.getBalance(window.solana.publicKey);
        setSolBalance(balance / LAMPORTS_PER_SOL);
        setEthBalance(null);
        setBtcBalance(null);
      } else if (
        (selectedChain === "ethereum" || selectedChain === "bsc") &&
        address
      ) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(address);
        setEthBalance(ethers.utils.formatEther(balance));
        setSolBalance(null);
        setBtcBalance(null);
      } else if (selectedChain === "bitcoin" && address) {
        const res = await fetch(
          `https://blockstream.info/testnet/api/address/${address}`
        );
        const data = await res.json();
        const sats =
          data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;
        setBtcBalance(sats / 1e8);
        setSolBalance(null);
        setEthBalance(null);
      }
    } catch (err) {
      console.error("Balance fetch failed:", err);
      setBalanceError("Balance fetch failed");
      setSolBalance(null);
      setEthBalance(null);
      setBtcBalance(null);
    }
    setIsLoadingBalance(false);
  };

  useEffect(() => {
    if (selectedChain) fetchBalance();
  }, [selectedChain]);

  const handleSend = async () => {
    try {
      if (!recipient || !amount) {
        toast.error("❌ Enter both recipient and amount");
        return;
      }

      if (selectedChain === "solana") {
        const connection = new Connection("https://api.devnet.solana.com");
        const sender = window.solana.publicKey;
        const tx = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: sender,
            toPubkey: new PublicKey(recipient),
            lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
          })
        );
        tx.feePayer = sender;
        const { blockhash } = await connection.getLatestBlockhash();
        tx.recentBlockhash = blockhash;

        const signed = await window.solana.signTransaction(tx);
        const sig = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction({ signature: sig, blockhash });

        toast.success(`✅ Sent ${amount} SOL`);
        fetchBalance();
      } else if (selectedChain === "ethereum" || selectedChain === "bsc") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const value = ethers.utils.parseEther(amount);
        const tx = await signer.sendTransaction({
          to: recipient,
          value,
        });
        toast.loading("⏳ Sending...", { id: "eth-tx" });
        await tx.wait();
        toast.success(`✅ Sent ${amount} ${selectedChain === "bsc" ? "BNB" : "ETH"}`, {
          id: "eth-tx",
        });
        fetchBalance();
      } else if (selectedChain === "bitcoin" && window.unisat) {
        const sats = Math.floor(Number(amount) * 1e8);
        toast.loading("⏳ Sending BTC...", { id: "btc-tx" });
        const txid = await window.unisat.sendBitcoin(recipient, sats);
        toast.success(`✅ Sent ${amount} BTC`, { id: "btc-tx" });
        fetchBalance();
      } else {
        toast.error("❌ Unsupported chain or wallet not connected");
      }

      setRecipient("");
      setAmount("");
    } catch (err) {
      console.error(err);
      toast.error("❌ Transaction failed: " + err.message);
    }
  };

  const renderBalance = () => {
    if (isLoadingBalance) {
      return (
        <p className="text-center text-gray-400 text-sm mb-4">⏳ Loading balance...</p>
      );
    }
    if (balanceError) {
      return (
        <p className="text-center text-red-400 text-sm mb-4">
          ❌ {balanceError}{" "}
          <button onClick={fetchBalance} className="text-lime-400 underline ml-1">
            Retry
          </button>
        </p>
      );
    }
    if (selectedChain === "solana" && solBalance !== null)
      return (
        <p className="text-center text-white text-lg mb-4">
          💰 Balance:{" "}
          <span className="text-lime-400 font-semibold">
            {solBalance.toFixed(4)} SOL
          </span>
        </p>
      );
    if ((selectedChain === "ethereum" || selectedChain === "bsc") && ethBalance !== null)
      return (
        <p className="text-center text-white text-lg mb-4">
          💰 Balance:{" "}
          <span className="text-lime-400 font-semibold">
            {parseFloat(ethBalance).toFixed(4)}{" "}
            {selectedChain === "bsc" ? "BNB" : "ETH"}
          </span>
        </p>
      );
    if (selectedChain === "bitcoin" && btcBalance !== null)
      return (
        <p className="text-center text-white text-lg mb-4">
          💰 Balance:{" "}
          <span className="text-lime-400 font-semibold">
            {btcBalance.toFixed(8)} BTC
          </span>
        </p>
      );
    return (
      <p className="text-center text-gray-400 text-sm mb-4">
        {walletAddress ? "Fetching balance..." : "Connect wallet to see balance"}{" "}
        {selectedChain && (
          <button onClick={fetchBalance} className="ml-1 text-lime-400 underline">
            Retry
          </button>
        )}
      </p>
    );
  };

  return (
    <div className="mt-20 max-w-lg mx-auto px-6 py-10 bg-[#181c24] rounded-2xl shadow-2xl border border-[#23272f]">
      <h2 className="text-3xl font-extrabold text-[#b0d357] mb-4 text-center tracking-wide drop-shadow-lg">
        Send Native Token
      </h2>

      {renderBalance()}

      <div className="flex flex-col gap-6">
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient Address"
          className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400"
        />

        <input
          type="number"
          step="0.00000001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Amount (${selectedChain?.toUpperCase() || "TOKEN"})`}
          className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400"
        />

        <button
          onClick={handleSend}
          disabled={!selectedChain || !walletAddress}
          className="bg-gradient-to-r from-[#b0d357] to-lime-400 text-black font-bold py-4 px-8 rounded-xl shadow-lg transition text-lg tracking-wide hover:from-lime-400 hover:to-[#b0d357] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendTransactionForm;
