// import { useState } from "react";
// import { ethers } from "ethers";

// const SendTransactionForm = () => {
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");

//   const handleSend = async () => {
//     try {
//       if (!window.ethereum) {
//         alert("MetaMask is not installed");
//         return;
//       }
//       if (!recipient || !amount) {
//         alert("Please enter both address and amount");
//         return;
//       }
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();

//       const tx = await signer.sendTransaction({
//         to: recipient,
//         value: ethers.utils.parseEther(amount),
//       });

//       await tx.wait();

//       alert("✅ Transaction successful!");
//     } catch (error) {
//       console.error(error);
//       alert("Transaction failed");
//     }
//   };

//   return (
//     <div className="mt-20 max-w-lg mx-auto px-6 py-10 bg-[#181c24] rounded-2xl shadow-2xl border border-[#23272f]">
//       <h2 className="text-3xl font-extrabold text-[#b0d357] mb-8 text-center tracking-wide drop-shadow-lg">
//         Send Native Token
//       </h2>

//       <div className="flex flex-col gap-6">
//         <input
//           type="text"
//           value={recipient}
//           onChange={(e) => setRecipient(e.target.value)}
//           placeholder="Recipient Address"
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#b0d357]/30 transition"
//         />

//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Amount (ETH, BNB or SOL)"
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#b0d357]/30 transition"
//         />

//         <button
//           onClick={handleSend}
//           className="bg-gradient-to-r from-[#b0d357] to-lime-400 hover:from-lime-400 hover:to-[#b0d357] text-black font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 text-lg tracking-wide"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SendTransactionForm;

// 2

// import { useState, useEffect } from "react";
// import { ethers } from "ethers";

// const SendTransactionForm = () => {
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");
//   const [balance, setBalance] = useState("0.0");
//   const [isSending, setIsSending] = useState(false);

//   const GAS_BUFFER = 0.003; // 0.003 ETH/BNB reserved for gas

// //   useEffect(() => {
// //     const fetchBalance = async () => {
// //       if (!window.ethereum) return;
// //       try {
// //         const provider = new ethers.providers.Web3Provider(window.ethereum);
// //         const signer = provider.getSigner();
// //         const address = await signer.getAddress();
// //         const rawBalance = await provider.getBalance(address);
// //         const formatted = ethers.utils.formatEther(rawBalance);
// //         setBalance(formatted);
// //         console.log(balance);
// //       } catch (err) {
// //         console.error("Balance fetch error", err);
// //       }
// //     };

// //     fetchBalance();
// //   }, []);
// useEffect(() => {
//   const fetchBalance = async () => {
//     try {
//       if (!window.ethereum) return;

//       // ✅ Request account access if not already connected
//       await window.ethereum.request({ method: "eth_requestAccounts" });

//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       const address = await signer.getAddress();

//       const rawBalance = await provider.getBalance(address);
//       const formatted = ethers.utils.formatEther(rawBalance);
//       setBalance(formatted);

//       console.log("✅ Wallet Address:", address);
//       console.log("✅ Fetched Balance:", formatted);
//     } catch (err) {
//       console.error("❌ Failed to fetch balance", err);
//     }
//   };

//   fetchBalance();
// }, []);

//   const handleSend = async () => {
//     if (!window.ethereum) {
//       alert("MetaMask is not installed");
//       return;
//     }

//     if (!recipient || !amount) {
//       alert("Please enter both address and amount");
//       return;
//     }

//     const parsedAmount = parseFloat(amount);
//     const available = parseFloat(balance) - GAS_BUFFER;

//     if (parsedAmount > available) {
//       alert(`Amount exceeds balance after gas fees. Max: ${available.toFixed(5)} ETH`);
//       return;
//     }

//     try {
//       setIsSending(true);
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();

//       const tx = await signer.sendTransaction({
//         to: recipient,
//         value: ethers.utils.parseEther(amount),
//       });

//       await tx.wait();
//       alert("✅ Transaction successful!");
//       setAmount(""); // Reset amount field
//     } catch (error) {
//       console.error(error);
//       alert("❌ Transaction failed");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   return (
//     <div className="mt-20 max-w-lg mx-auto px-6 py-10 bg-[#181c24] rounded-2xl shadow-2xl border border-[#23272f] text-white">
//       <h2 className="text-3xl font-extrabold text-[#b0d357] mb-8 text-center tracking-wide drop-shadow-lg">
//         Send Native Token
//       </h2>

//       <p className="text-center mb-6 text-sm text-gray-400">
//         💰 Balance:{" "}
//         <span className="text-[#b0d357]">
//           {parseFloat(balance).toFixed(5)} ETH
//         </span>
//       </p>

//       <div className="flex flex-col gap-6">
//         <input
//           type="text"
//           value={recipient}
//           onChange={(e) => setRecipient(e.target.value)}
//           placeholder="Recipient Address"
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400"
//         />

//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder={`Amount (max ~${(parseFloat(balance) - GAS_BUFFER).toFixed(5)} ETH)`}
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400"
//         />

//         <button
//           onClick={handleSend}
//           disabled={isSending}
//           className="bg-gradient-to-r from-[#b0d357] to-lime-400 hover:from-lime-400 hover:to-[#b0d357] text-black font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 text-lg tracking-wide"
//         >
//           {isSending ? "Sending..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SendTransactionForm;

// 3

// import { useState, useEffect } from "react";
// import { ethers } from "ethers";

// const networkConfigs = {
//   ethereum: {
//     chainId: "0xaa36a7", // Sepolia
//     rpcUrl: "https://sepolia.infura.io/v3/",
//     nativeSymbol: "ETH",
//   },
//   bsc: {
//     chainId: "0x38",
//     rpcUrl: "https://bsc-dataseed.binance.org/",
//     nativeSymbol: "BNB",
//   },
// };

// const SendTransactionForm = ({ selectedChain, connectedAddress }) => {
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");
//   const [balance, setBalance] = useState("0.0");
//   const [isSending, setIsSending] = useState(false);

//   const GAS_BUFFER = 0.0003;

//   const switchNetwork = async (chainKey) => {
//     const config = networkConfigs[chainKey];
//     if (!config) throw new Error("Unsupported chain");

//     try {
//       await window.ethereum.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: config.chainId }],
//       });
//     } catch (switchError) {
//       if (switchError.code === 4902 && chainKey === "bsc") {
//         // Add BSC if not added
//         await window.ethereum.request({
//           method: "wallet_addEthereumChain",
//           params: [
//             {
//               chainId: config.chainId,
//               chainName: "BNB Smart Chain",
//               nativeCurrency: {
//                 name: "BNB",
//                 symbol: "BNB",
//                 decimals: 18,
//               },
//               rpcUrls: [config.rpcUrl],
//               blockExplorerUrls: ["https://bscscan.com"],
//             },
//           ],
//         });
//       } else {
//         throw switchError;
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchBalance = async () => {
//       if (!window.ethereum || !selectedChain) return;

//       try {
//         await switchNetwork(selectedChain);
//         await window.ethereum.request({ method: "eth_requestAccounts" });

//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const address = await signer.getAddress();
//         const rawBalance = await provider.getBalance(address);
//         const formatted = ethers.utils.formatEther(rawBalance);

//         setBalance(formatted);
//         console.log("✅ Address:", address);
//         console.log("✅ Balance:", formatted);
//       } catch (err) {
//         console.error("❌ Balance fetch error:", err);
//         setBalance("0.0");
//       }
//     };

//     fetchBalance();
//   }, [selectedChain, connectedAddress]);

//   const handleSend = async () => {
//     if (!window.ethereum) return alert("MetaMask not available");

//     if (!recipient || !amount) return alert("Please enter address and amount");

//     const amountToSend = parseFloat(amount);
//     const available = parseFloat(balance) - GAS_BUFFER;

//     if (amountToSend > available) {
//       alert(`Amount exceeds available balance. Max: ${available.toFixed(4)}`);
//       return;
//     }

//     try {
//       setIsSending(true);

//       await switchNetwork(selectedChain);

//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();

//       const tx = await signer.sendTransaction({
//         to: recipient,
//         value: ethers.utils.parseEther(amount),
//       });

//       await tx.wait();
//       alert("✅ Transaction successful!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Transaction failed");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const tokenSymbol =
//     selectedChain && networkConfigs[selectedChain]
//       ? networkConfigs[selectedChain].nativeSymbol
//       : "TOKEN";

//   return (
//     <div className="mt-20 max-w-lg mx-auto px-6 py-10 bg-[#181c24] rounded-2xl shadow-2xl border border-[#23272f] text-white">
//       <h2 className="text-3xl font-extrabold text-[#b0d357] mb-6 text-center">
//         Send Native Token
//       </h2>

//       <p className="text-center mb-6 text-sm text-gray-400">
//         💰 Your Balance:{" "}
//         <span className="text-[#b0d357]">
//           {parseFloat(balance).toFixed(4)} {tokenSymbol}
//         </span>
//       </p>

//       <div className="flex flex-col gap-6">
//         <input
//           type="text"
//           value={recipient}
//           onChange={(e) => setRecipient(e.target.value)}
//           placeholder="Recipient Address"
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl"
//         />

//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder={`Amount in ${tokenSymbol}`}
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl"
//         />

//         <button
//           onClick={handleSend}
//           disabled={
//             isSending ||
//             !recipient ||
//             !amount ||
//             parseFloat(amount) > parseFloat(balance) - GAS_BUFFER
//           }
//           className={`${
//             parseFloat(amount) > parseFloat(balance) - GAS_BUFFER
//               ? "bg-gray-600 cursor-not-allowed"
//               : "bg-gradient-to-r from-[#b0d357] to-lime-400 hover:from-lime-400 hover:to-[#b0d357]"
//           } text-black font-bold py-4 px-8 rounded-xl shadow-lg transition`}
//         >
//           {isSending ? "Sending..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SendTransactionForm;

// import { useState } from "react";
// import { ethers } from "ethers";
// import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";

// const SendTransactionForm = ({ selectedChain }) => {
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");

//   // const handleSend = async () => {
//   //   try {
//   //     if (!recipient || !amount) {
//   //       alert("Please enter both address and amount");
//   //       return;
//   //     }

//   //     if (selectedChain === "solana") {
//   //       // 🔗 Solana logic using Phantom
//   //       if (!window.solana || !window.solana.isPhantom) {
//   //         alert("Phantom wallet not installed");
//   //         return;
//   //       }

//   //       const connection = new Connection("https://api.devnet.solana.com"); // Use Devnet for testing
//   //       const recipientPubKey = new PublicKey(recipient);
//   //       const sender = window.solana.publicKey;

//   //       const transaction = new Transaction().add(
//   //         SystemProgram.transfer({
//   //           fromPubkey: sender,
//   //           toPubkey: recipientPubKey,
//   //           lamports: amount * LAMPORTS_PER_SOL,
//   //         })
//   //       );

//   //       transaction.feePayer = sender;
//   //       const { blockhash } = await connection.getLatestBlockhash();
//   //       transaction.recentBlockhash = blockhash;

//   //       const signed = await window.solana.signTransaction(transaction);
//   //       const signature = await connection.sendRawTransaction(signed.serialize());
//   //       await connection.confirmTransaction({ signature, blockhash });

//   //       alert(`✅ Sent ${amount} SOL successfully!`);
//   //     } else if (selectedChain === "ethereum" || selectedChain === "bsc") {
//   //       // 🔗 MetaMask logic for ETH / BNB
//   //       if (!window.ethereum) {
//   //         alert("MetaMask is not installed");
//   //         return;
//   //       }

//   //       const provider = new ethers.providers.Web3Provider(window.ethereum);
//   //       const signer = provider.getSigner();

//   //       const tx = await signer.sendTransaction({
//   //         to: recipient,
//   //         value: ethers.utils.parseEther(amount),
//   //       });

//   //       await tx.wait();
//   //       alert(`✅ Sent ${amount} ${selectedChain === "bsc" ? "BNB" : "ETH"} successfully!`);
//   //     } else {
//   //       alert("Unsupported chain selected");
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //     alert("Transaction failed: " + error.message);
//   //   }
//   // };
// //  const handleSend = async () => {
// //   try {
// //     if (!window.ethereum) {
// //       alert("MetaMask is not installed");
// //       return;
// //     }
// //     if (!recipient || !amount) {
// //       alert("Please enter both address and amount");
// //       return;
// //     }

// //     const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
// //     const signer = provider.getSigner();
// //     const network = await provider.getNetwork();
// //     console.log("✅ Connected network:", network.name, network.chainId);

// //     const gasPrice = await provider.getGasPrice();
// //     const estimateGas = await provider.estimateGas({
// //       to: recipient,
// //       value: ethers.utils.parseEther(amount),
// //     });

// //     console.log("⛽ Gas price:", ethers.utils.formatUnits(gasPrice, "gwei"), "gwei");
// //     console.log("⛽ Estimated gas:", estimateGas.toString());

// //     const totalCost = ethers.utils.parseEther(amount).add(gasPrice.mul(estimateGas));
// //     const balance = await provider.getBalance(await signer.getAddress());

// //     console.log("💰 Balance:", ethers.utils.formatEther(balance));
// //     console.log("💰 Total required:", ethers.utils.formatEther(totalCost));

// //     if (balance.lt(totalCost)) {
// //       alert("Insufficient funds: need " + ethers.utils.formatEther(totalCost) + " ETH including gas.");
// //       return;
// //     }

// //     const tx = await signer.sendTransaction({
// //       to: recipient,
// //       value: ethers.utils.parseEther(amount),
// //     });

// //     console.log("📤 Transaction sent:", tx.hash);
// //     await tx.wait();
// //     alert("✅ Transaction successful!");
// //   } catch (error) {
// //     console.error(error);
// //     alert("Transaction failed: " + error.message);
// //   }
// // };

// console.log("📌 Selected Chain received in Form:", selectedChain);

// // const handleSend = async () => {
// //   try {
// //     if (!recipient || !amount) {
// //       alert("Please enter both address and amount");
// //       return;
// //     }

// //     console.log("Selected chain:", selectedChain);

// //     // 🟣 Solana (Phantom)
// //     if (selectedChain === "solana") {
// //       if (!window.solana || !window.solana.isPhantom) {
// //         alert("Phantom wallet not installed");
// //         return;
// //       }

// //       const connection = new Connection("https://api.devnet.solana.com");
// //       const recipientPubKey = new PublicKey(recipient);
// //       const sender = window.solana.publicKey;

// //       const transaction = new Transaction().add(
// //         SystemProgram.transfer({
// //           fromPubkey: sender,
// //           toPubkey: recipientPubKey,
// //           lamports: amount * LAMPORTS_PER_SOL,
// //         })
// //       );

// //       transaction.feePayer = sender;
// //       const { blockhash } = await connection.getLatestBlockhash();
// //       transaction.recentBlockhash = blockhash;

// //       const signed = await window.solana.signTransaction(transaction);
// //       const signature = await connection.sendRawTransaction(signed.serialize());
// //       await connection.confirmTransaction({ signature, blockhash });

// //       alert(`✅ Sent ${amount} SOL successfully!`);
// //       return;
// //     }

// //     // 🦊 Ethereum or BSC (MetaMask)
// //     if (selectedChain === "ethereum" || selectedChain === "bsc") {
// //       if (!window.ethereum || !window.ethereum.isMetaMask) {
// //         alert("MetaMask is not installed");
// //         return;
// //       }

// //       const expectedChainId = selectedChain === "bsc" ? "0x38" : "0xaa36a7";

// //       // Switch network if needed
// //       const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
// //       console.log("Current chainId:", currentChainId, "Expected:", expectedChainId);

// //       if (currentChainId !== expectedChainId) {
// //         await window.ethereum.request({
// //           method: "wallet_switchEthereumChain",
// //           params: [{ chainId: expectedChainId }],
// //         });
// //       }

// //       const provider = new ethers.providers.Web3Provider(window.ethereum);
// //       const signer = provider.getSigner();

// //       const tx = await signer.sendTransaction({
// //         to: recipient,
// //         value: ethers.utils.parseEther(amount),
// //       });

// //       await tx.wait();
// //       alert(`✅ Sent ${amount} ${selectedChain === "bsc" ? "BNB" : "ETH"} successfully!`);
// //       return;
// //     }

// //     alert("Unsupported chain selected");
// //   } catch (error) {
// //     console.error(error);
// //     alert("Transaction failed: " + error.message);
// //   }
// // };
// const handleSend = async () => {
//   try {
//     if (!recipient || !amount) {
//       alert("Please enter both address and amount");
//       return;
//     }

//     if (selectedChain === "solana") {
//       // 🔗 Solana logic using Phantom
//       if (!window.solana || !window.solana.isPhantom) {
//         alert("Phantom wallet not installed");
//         return;
//       }

//       const connection = new Connection("https://api.devnet.solana.com"); // Devnet for testing
//       const recipientPubKey = new PublicKey(recipient);
//       const sender = window.solana.publicKey;

//       const transaction = new Transaction().add(
//         SystemProgram.transfer({
//           fromPubkey: sender,
//           toPubkey: recipientPubKey,
//           lamports: amount * LAMPORTS_PER_SOL,
//         })
//       );

//       transaction.feePayer = sender;
//       const { blockhash } = await connection.getLatestBlockhash();
//       transaction.recentBlockhash = blockhash;

//       const signed = await window.solana.signTransaction(transaction);
//       const signature = await connection.sendRawTransaction(signed.serialize());
//       await connection.confirmTransaction({ signature, blockhash });

//       alert(`✅ Sent ${amount} SOL successfully!`);
//     } else if (selectedChain === "ethereum" || selectedChain === "bsc") {
//       // 🔗 MetaMask logic for ETH / BNB
//       if (!window.ethereum) {
//         alert("MetaMask is not installed");
//         return;
//       }

//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();

//       const currentNetwork = await provider.getNetwork();
//       console.log("Selected chain:", selectedChain);
//       console.log("Current chainId:", currentNetwork.chainId);

//       if (selectedChain === "ethereum" && currentNetwork.chainId !== 11155111) {
//         console.log("Switching to Sepolia...");
//         await window.ethereum.request({
//           method: "wallet_switchEthereumChain",
//           params: [{ chainId: "0xaa36a7" }], // Sepolia chainId
//         });
//       }

//       if (selectedChain === "bsc" && currentNetwork.chainId !== 56) {
//         console.log("Switching to BSC...");
//         await window.ethereum.request({
//           method: "wallet_switchEthereumChain",
//           params: [{ chainId: "0x38" }], // BSC chainId
//         });
//       }

//       // After network switch, send transaction
//       const tx = await signer.sendTransaction({
//         to: recipient,
//         value: ethers.utils.parseEther(amount),
//       });

//       await tx.wait();
//       alert(`✅ Sent ${amount} ${selectedChain === "bsc" ? "BNB" : "ETH"} successfully!`);
//     } else {
//       alert("Unsupported chain selected");
//     }
//   } catch (error) {
//     console.error(error);
//     alert("Transaction failed: " + error.message);
//   }
// };

//   return (
//     <div className="mt-20 max-w-lg mx-auto px-6 py-10 bg-[#181c24] rounded-2xl shadow-2xl border border-[#23272f]">
//       <h2 className="text-3xl font-extrabold text-[#b0d357] mb-8 text-center tracking-wide drop-shadow-lg">
//         Send Native Token
//       </h2>

//       <div className="flex flex-col gap-6">
//         <input
//           type="text"
//           value={recipient}
//           onChange={(e) => setRecipient(e.target.value)}
//           placeholder="Recipient Address"
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#b0d357]/30 transition"
//         />

//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder={`Amount (${selectedChain ? selectedChain.toUpperCase() : ""})`}
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#b0d357]/30 transition"
//         />

//         <button
//           onClick={handleSend}
//           className="bg-gradient-to-r from-[#b0d357] to-lime-400 hover:from-lime-400 hover:to-[#b0d357] text-black font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 text-lg tracking-wide"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SendTransactionForm;

// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { ethers } from "ethers";
// import {
//   Connection,
//   PublicKey,
//   LAMPORTS_PER_SOL,
//   Transaction,
//   SystemProgram,
// } from "@solana/web3.js";
// import { sendSolUsingPhantom } from "../utils/solanaUtils"; // Import your Solana utility function

// const SendTransactionForm = ({ selectedChain }) => {
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");

//   const handleSend = async () => {
//     try {
//       if (!recipient || !amount) {
//         toast.error("❌ Please enter both recipient address and amount.");
//         return;
//       }

//       console.log("📢 selectedChain received in form:", selectedChain);

//       // ✅ Solana (Phantom)
//       if (selectedChain === "solana") {
//         if (!window.solana || !window.solana.isPhantom) {
//           toast.error("Phantom wallet not installed.");
//           return;
//         }

//         const connection = new Connection("https://api.devnet.solana.com");
//         const recipientPubKey = new PublicKey(recipient);
//         const sender = window.solana.publicKey;

//         const transaction = new Transaction().add(
//           SystemProgram.transfer({
//             fromPubkey: sender,
//             toPubkey: recipientPubKey,
//             lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
//           })
//         );

//         transaction.feePayer = sender;
//         const { blockhash } = await connection.getLatestBlockhash();
//         transaction.recentBlockhash = blockhash;

//         const signed = await window.solana.signTransaction(transaction);
//         const signature = await connection.sendRawTransaction(signed.serialize());
//         await connection.confirmTransaction({ signature, blockhash });

//         toast.success(`✅ Sent ${amount} SOL successfully!`);
//       }

//       // ✅ Ethereum or BSC (MetaMask)
//       else if (selectedChain === "ethereum" || selectedChain === "bsc") {
//         if (!window.ethereum || !window.ethereum.isMetaMask) {
//           toast.error("MetaMask is not installed.");
//           return;
//         }

//         const expectedChainId = selectedChain === "bsc" ? "0x38" : "0xaa36a7";

//         const currentChainId = await window.ethereum.request({ method: "eth_chainId" });

//         if (currentChainId !== expectedChainId) {
//           await window.ethereum.request({
//             method: "wallet_switchEthereumChain",
//             params: [{ chainId: expectedChainId }],
//           });
//         }

//         // ✅ Important: Create provider/signer AFTER switching network
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();

//         const tx = await signer.sendTransaction({
//           to: recipient,
//           value: ethers.utils.parseEther(amount),
//         });

//         await tx.wait();
//         toast.success(
//           `✅ Sent ${amount} ${selectedChain === "bsc" ? "BNB" : "ETH"} successfully!`
//         );
//       }

//       // ❌ Unknown Chain
//       else {
//         toast.error("❌ Unsupported or unselected chain.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Transaction failed: " + error.message);
//     }
//   };

//   return (
//     <div className="mt-20 max-w-lg mx-auto px-6 py-10 bg-[#181c24] rounded-2xl shadow-2xl border border-[#23272f]">
//       <h2 className="text-3xl font-extrabold text-[#b0d357] mb-8 text-center tracking-wide drop-shadow-lg">
//         Send Native Token
//       </h2>

//       <div className="flex flex-col gap-6">
//         <input
//           type="text"
//           value={recipient}
//           onChange={(e) => setRecipient(e.target.value)}
//           placeholder="Recipient Address"
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#b0d357]/30 transition"
//         />

//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder={`Amount (${selectedChain ? selectedChain.toUpperCase() : ""})`}
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#b0d357]/30 transition"
//         />

//         <button
//           onClick={handleSend}
//           className="bg-gradient-to-r from-[#b0d357] to-lime-400 hover:from-lime-400 hover:to-[#b0d357] text-black font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 text-lg tracking-wide"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SendTransactionForm;

// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { ethers } from "ethers";
// import {
//   Connection,
//   PublicKey,
//   LAMPORTS_PER_SOL,
//   Transaction,
//   SystemProgram,
// } from "@solana/web3.js";

// const SendTransactionForm = ({ selectedChain }) => {
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");

//   const handleSend = async () => {
//     try {
//       if (!recipient || !amount) {
//         toast.error("❌ Please enter both recipient address and amount.");
//         return;
//       }

//       console.log("📢 selectedChain received in form:", selectedChain);

//       // ✅ Solana (Phantom)
//       if (selectedChain === "solana") {
//         if (!window.solana || !window.solana.isPhantom) {
//           toast.error("Phantom wallet not installed.");
//           return;
//         }

//         const connection = new Connection("https://api.devnet.solana.com");
//         const recipientPubKey = new PublicKey(recipient);
//         const sender = window.solana.publicKey;

//         const transaction = new Transaction().add(
//           SystemProgram.transfer({
//             fromPubkey: sender,
//             toPubkey: recipientPubKey,
//             lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
//           })
//         );

//         transaction.feePayer = sender;
//         const { blockhash } = await connection.getLatestBlockhash();
//         transaction.recentBlockhash = blockhash;

//         const signed = await window.solana.signTransaction(transaction);
//         const signature = await connection.sendRawTransaction(signed.serialize());
//         await connection.confirmTransaction({ signature, blockhash });

//         toast.success(`✅ Sent ${amount} SOL successfully!`);
//       }

//       // ✅ Ethereum or BSC (MetaMask)
//       else if (selectedChain === "ethereum" || selectedChain === "bsc") {
//         if (!window.ethereum || !window.ethereum.isMetaMask) {
//           toast.error("MetaMask is not installed.");
//           return;
//         }

//         const expectedChainId = selectedChain === "bsc" ? "0x38" : "0xaa36a7";

//         const currentChainId = await window.ethereum.request({ method: "eth_chainId" });

//         if (currentChainId !== expectedChainId) {
//           await window.ethereum.request({
//             method: "wallet_switchEthereumChain",
//             params: [{ chainId: expectedChainId }],
//           });
//         }

//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();

//         const tx = await signer.sendTransaction({
//           to: recipient,
//           value: ethers.utils.parseEther(amount),
//         });

//         await tx.wait();
//         toast.success(`✅ Sent ${amount} ${selectedChain === "bsc" ? "BNB" : "ETH"} successfully!`);
//       }

//       // ❌ Unknown Chain
//       else {
//         toast.error("❌ Unsupported or unselected chain.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Transaction failed: " + error.message);
//     }
//   };

//   return (
//     <div className="mt-20 max-w-lg mx-auto px-6 py-10 bg-[#181c24] rounded-2xl shadow-2xl border border-[#23272f]">
//       <h2 className="text-3xl font-extrabold text-[#b0d357] mb-8 text-center tracking-wide drop-shadow-lg">
//         Send Native Token
//       </h2>

//       <div className="flex flex-col gap-6">
//         <input
//           type="text"
//           value={recipient}
//           onChange={(e) => setRecipient(e.target.value)}
//           placeholder="Recipient Address"
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#b0d357]/30 transition"
//         />

//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder={`Amount (${selectedChain ? selectedChain.toUpperCase() : ""})`}
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#b0d357]/30 transition"
//         />

//         <button
//           onClick={handleSend}
//           className="bg-gradient-to-r from-[#b0d357] to-lime-400 hover:from-lime-400 hover:to-[#b0d357] text-black font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 text-lg tracking-wide"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SendTransactionForm;

// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { ethers } from "ethers";
// import {
//   Connection,
//   PublicKey,
//   LAMPORTS_PER_SOL,
//   Transaction,
//   SystemProgram,
// } from "@solana/web3.js";

// const SendTransactionForm = ({ selectedChain }) => {
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");
//   const [solBalance, setSolBalance] = useState(null);
//   const [ethBalance, setEthBalance] = useState(null);

//   useEffect(() => {
//     const fetchBalance = async () => {
//       if (selectedChain === "solana" && window.solana?.isPhantom) {
//         try {
//           const connection = new Connection("https://api.devnet.solana.com");
//           const publicKey = window.solana.publicKey;
//           const balance = await connection.getBalance(publicKey);
//           setSolBalance(balance / LAMPORTS_PER_SOL);
//           setEthBalance(null);
//         } catch (err) {
//           console.error("Solana balance fetch failed:", err);
//         }
//       } else if (
//         (selectedChain === "ethereum" || selectedChain === "bsc") &&
//         window.ethereum
//       ) {
//         try {
//           const provider = new ethers.providers.Web3Provider(window.ethereum);
//           const signer = provider.getSigner();
//           const address = await signer.getAddress();
//           const balance = await provider.getBalance(address);
//           setEthBalance(ethers.utils.formatEther(balance));
//           setSolBalance(null);
//         } catch (err) {
//           console.error("Ethereum/BNB balance fetch failed:", err);
//         }
//       } else {
//         setSolBalance(null);
//         setEthBalance(null);
//       }
//     };

//     fetchBalance();
//   }, [selectedChain]);

//   const handleSend = async () => {
//     try {
//       if (!recipient || !amount) {
//         toast.error("❌ Please enter both recipient address and amount.");
//         return;
//       }

//       console.log("📢 selectedChain received in form:", selectedChain);

//       if (selectedChain === "solana") {
//         if (!window.solana || !window.solana.isPhantom) {
//           toast.error("Phantom wallet not installed.");
//           return;
//         }

//         const connection = new Connection("https://api.devnet.solana.com");
//         const recipientPubKey = new PublicKey(recipient);
//         const sender = window.solana.publicKey;

//         const transaction = new Transaction().add(
//           SystemProgram.transfer({
//             fromPubkey: sender,
//             toPubkey: recipientPubKey,
//             lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
//           })
//         );

//         transaction.feePayer = sender;
//         const { blockhash } = await connection.getLatestBlockhash();
//         transaction.recentBlockhash = blockhash;

//         const signed = await window.solana.signTransaction(transaction);
//         const signature = await connection.sendRawTransaction(
//           signed.serialize()
//         );
//         await connection.confirmTransaction({ signature, blockhash });

//         toast.success(`✅ Sent ${amount} SOL successfully!`);
//         setRecipient("");
//         setAmount("");
//       } else if (selectedChain === "ethereum" || selectedChain === "bsc") {
//         if (!window.ethereum || !window.ethereum.isMetaMask) {
//           toast.error("MetaMask is not installed.");
//           return;
//         }

//         const expectedChainId = selectedChain === "bsc" ? "0x38" : "0xaa36a7";
//         const currentChainId = await window.ethereum.request({
//           method: "eth_chainId",
//         });

//         if (currentChainId !== expectedChainId) {
//           await window.ethereum.request({
//             method: "wallet_switchEthereumChain",
//             params: [{ chainId: expectedChainId }],
//           });
//         }

//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();

//         const tx = await signer.sendTransaction({
//           to: recipient,
//           value: ethers.utils.parseEther(amount),
//         });

//         await tx.wait();
//         toast.success(
//           `✅ Sent ${amount} ${
//             selectedChain === "bsc" ? "BNB" : "ETH"
//           } successfully!`
//         );
//         setRecipient(""); 
//         setAmount("");
//       } else {
//         toast.error("❌ Unsupported or unselected chain.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Transaction failed: " + error.message);
//     }
//   };

//   return (
//     <div className="mt-20 max-w-lg mx-auto px-6 py-10 bg-[#181c24] rounded-2xl shadow-2xl border border-[#23272f]">
//       <h2 className="text-3xl font-extrabold text-[#b0d357] mb-8 text-center tracking-wide drop-shadow-lg">
//         Send Native Token
//       </h2>

//       {/* Balance Display */}
//       {selectedChain === "solana" && solBalance !== null && (
//         <div className="text-center mb-4 text-white">
//           ✅ Your SOL Balance:{" "}
//           <span className="text-lime-400">◎ {solBalance.toFixed(4)} SOL</span>
//         </div>
//       )}
//       {(selectedChain === "ethereum" || selectedChain === "bsc") &&
//         ethBalance !== null && (
//           <div className="text-center mb-4 text-white">
//             ✅ Your {selectedChain.toUpperCase()} Balance:{" "}
//             <span className="text-lime-400">
//               {parseFloat(ethBalance).toFixed(4)}{" "}
//               {selectedChain === "bsc" ? "BNB" : "ETH"}
//             </span>
//           </div>
//         )}

//       <div className="flex flex-col gap-6">
//         <input
//           type="text"
//           value={recipient}
//           onChange={(e) => setRecipient(e.target.value)}
//           placeholder="Recipient Address"
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#b0d357]/30 transition"
//         />

//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder={`Amount (${
//             selectedChain ? selectedChain.toUpperCase() : ""
//           })`}
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#b0d357]/30 transition"
//         />

//         <button
//           onClick={handleSend}
//           className="bg-gradient-to-r from-[#b0d357] to-lime-400 hover:from-lime-400 hover:to-[#b0d357] text-black font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 text-lg tracking-wide"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SendTransactionForm;


// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { ethers } from "ethers";
// import {
//   Connection,
//   PublicKey,
//   LAMPORTS_PER_SOL,
//   Transaction,
//   SystemProgram,
// } from "@solana/web3.js";

// const SendTransactionForm = ({ selectedChain, connectedAddress }) => {
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");
//   const [solBalance, setSolBalance] = useState(null);
//   const [ethBalance, setEthBalance] = useState(null);
//   const [btcBalance, setBtcBalance] = useState(null);

//   useEffect(() => {
//     const fetchBalance = async () => {
//       if (selectedChain === "solana" && window.solana?.isPhantom) {
//         try {
//           const connection = new Connection("https://api.devnet.solana.com");
//           const publicKey = window.solana.publicKey;
//           const balance = await connection.getBalance(publicKey);
//           setSolBalance(balance / LAMPORTS_PER_SOL);
//           setEthBalance(null);
//           setBtcBalance(null);
//         } catch (err) {
//           console.error("Solana balance fetch failed:", err);
//         }
//       } else if (
//         (selectedChain === "ethereum" || selectedChain === "bsc") &&
//         window.ethereum
//       ) {
//         try {
//           const provider = new ethers.providers.Web3Provider(window.ethereum);
//           const signer = provider.getSigner();
//           const address = await signer.getAddress();
//           const balance = await provider.getBalance(address);
//           setEthBalance(ethers.utils.formatEther(balance));
//           setSolBalance(null);
//           setBtcBalance(null);
//         } catch (err) {
//           console.error("Ethereum/BNB balance fetch failed:", err);
//         }
//       } else if (selectedChain === "bitcoin" && connectedAddress) {
//         try {
//           const res = await fetch(
//             `https://blockstream.info/testnet/api/address/${connectedAddress}`
//           );
//           const data = await res.json();
//           const sats =
//             data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;
//           setBtcBalance(sats / 1e8);
//           setSolBalance(null);
//           setEthBalance(null);
//         } catch (err) {
//           console.error("Bitcoin balance fetch failed:", err);
//         }
//       } else {
//         setSolBalance(null);
//         setEthBalance(null);
//         setBtcBalance(null);
//       }
//     };

//     if (connectedAddress) fetchBalance();
//   }, [selectedChain, connectedAddress]);

//   const handleSend = async () => {
//     try {
//       if (!recipient || !amount) {
//         toast.error("❌ Please enter both recipient address and amount.");
//         return;
//       }

//       if (selectedChain === "solana") {
//         const connection = new Connection("https://api.devnet.solana.com");
//         const recipientPubKey = new PublicKey(recipient);
//         const sender = window.solana.publicKey;

//         const transaction = new Transaction().add(
//           SystemProgram.transfer({
//             fromPubkey: sender,
//             toPubkey: recipientPubKey,
//             lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
//           })
//         );

//         transaction.feePayer = sender;
//         const { blockhash } = await connection.getLatestBlockhash();
//         transaction.recentBlockhash = blockhash;

//         const signed = await window.solana.signTransaction(transaction);
//         const signature = await connection.sendRawTransaction(
//           signed.serialize()
//         );
//         await connection.confirmTransaction({ signature, blockhash });

//         toast.success(`✅ Sent ${amount} SOL successfully!`);
//       } else if (selectedChain === "ethereum" || selectedChain === "bsc") {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();

//         const tx = await signer.sendTransaction({
//           to: recipient,
//           value: ethers.utils.parseEther(amount),
//         });

//         await tx.wait();
//         toast.success(
//           `✅ Sent ${amount} ${selectedChain === "bsc" ? "BNB" : "ETH"} successfully!`
//         );
//       } else if (selectedChain === "bitcoin") {
//         if (!window.unisat) {
//           toast.error("❌ Unisat Wallet not available.");
//           return;
//         }

//         const sats = Math.floor(Number(amount) * 1e8);
//         if (sats <= 0) {
//           toast.error("❌ Amount must be greater than 0.");
//           return;
//         }

//         toast.loading("⏳ Sending BTC...", { id: "btc-tx" });

//         const txid = await window.unisat.sendBitcoin(recipient, sats);

//         toast.success(`✅ Sent ${amount} BTC! TXID: ${txid.slice(0, 12)}...`, {
//           id: "btc-tx",
//         });

//         // Refresh balance after sending
//         setTimeout(() => {
//           if (connectedAddress) {
//             fetch(
//               `https://blockstream.info/testnet/api/address/${connectedAddress}`
//             )
//               .then((res) => res.json())
//               .then((data) => {
//                 const newSats =
//                   data.chain_stats.funded_txo_sum -
//                   data.chain_stats.spent_txo_sum;
//                 setBtcBalance(newSats / 1e8);
//               });
//           }
//         }, 2000);
//       } else {
//         toast.error("❌ Unsupported or unselected chain.");
//         return;
//       }

//       setRecipient("");
//       setAmount("");
//     } catch (err) {
//       console.error(err);
//       toast.error("Transaction failed: " + err.message);
//     }
//   };

//   return (
//     <div className="mt-20 max-w-lg mx-auto px-6 py-10 bg-[#181c24] rounded-2xl shadow-2xl border border-[#23272f]">
//       <h2 className="text-3xl font-extrabold text-[#b0d357] mb-8 text-center tracking-wide drop-shadow-lg">
//         Send Native Token
//       </h2>

//       {selectedChain === "solana" && solBalance !== null && (
//         <div className="text-center mb-4 text-white">
//           ✅ Your SOL Balance:{" "}
//           <span className="text-lime-400">◎ {solBalance.toFixed(4)} SOL</span>
//         </div>
//       )}

//       {(selectedChain === "ethereum" || selectedChain === "bsc") &&
//         ethBalance !== null && (
//           <div className="text-center mb-4 text-white">
//             ✅ Your {selectedChain.toUpperCase()} Balance:{" "}
//             <span className="text-lime-400">
//               {parseFloat(ethBalance).toFixed(4)}{" "}
//               {selectedChain === "bsc" ? "BNB" : "ETH"}
//             </span>
//           </div>
//         )}

//       {selectedChain === "bitcoin" && btcBalance !== null && (
//         <div className="text-center mb-4 text-white">
//           ✅ Your BTC Testnet Balance:{" "}
//           <span className="text-lime-400">
//             ₿ {btcBalance.toFixed(8)} BTC
//           </span>
//         </div>
//       )}

//       <div className="flex flex-col gap-6">
//         <input
//           type="text"
//           value={recipient}
//           onChange={(e) => setRecipient(e.target.value)}
//           placeholder="Recipient Address"
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400"
//         />

//         <input
//           type="number"
//           step="0.00000001"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder={`Amount (${selectedChain?.toUpperCase()})`}
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400"
//         />

//         <button
//           onClick={handleSend}
//           className="bg-gradient-to-r from-[#b0d357] to-lime-400 text-black font-bold py-4 px-8 rounded-xl shadow-lg transition text-lg tracking-wide hover:from-lime-400 hover:to-[#b0d357]"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SendTransactionForm;


// Correct version

// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { ethers } from "ethers";
// import {
//   Connection,
//   PublicKey,
//   LAMPORTS_PER_SOL,
//   Transaction,
//   SystemProgram,
// } from "@solana/web3.js";

// const SendTransactionForm = ({ selectedChain, connectedAddress }) => {
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");
//   const [solBalance, setSolBalance] = useState(null);
//   const [ethBalance, setEthBalance] = useState(null);
//   const [btcBalance, setBtcBalance] = useState(null);

//   useEffect(() => {
//     const fetchBalance = async () => {
//       if (selectedChain === "solana" && window.solana?.isPhantom) {
//         try {
//           const connection = new Connection("https://api.devnet.solana.com");
//           const publicKey = window.solana.publicKey;
//           const balance = await connection.getBalance(publicKey);
//           setSolBalance(balance / LAMPORTS_PER_SOL);
//           setEthBalance(null);
//           setBtcBalance(null);
//         } catch (err) {
//           console.error("Solana balance fetch failed:", err);
//         }
//       } else if (
//         (selectedChain === "ethereum" || selectedChain === "bsc") &&
//         window.ethereum
//       ) {
//         try {
//           const provider = new ethers.providers.Web3Provider(window.ethereum);
//           const signer = provider.getSigner();
//           const address = await signer.getAddress();
//           const balance = await provider.getBalance(address);
//           setEthBalance(ethers.utils.formatEther(balance));
//           setSolBalance(null);
//           setBtcBalance(null);
//         } catch (err) {
//           console.error("Ethereum/BNB balance fetch failed:", err);
//         }
//       } else if (selectedChain === "bitcoin" && connectedAddress) {
//         try {
//           const res = await fetch(
//             `https://blockstream.info/testnet/api/address/${connectedAddress}`
//           );
//           const data = await res.json();
//           const sats =
//             data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;
//           setBtcBalance(sats / 1e8);
//           setSolBalance(null);
//           setEthBalance(null);
//         } catch (err) {
//           console.error("Bitcoin balance fetch failed:", err);
//         }
//       } else {
//         setSolBalance(null);
//         setEthBalance(null);
//         setBtcBalance(null);
//       }
//     };

//     if (connectedAddress) fetchBalance();
//   }, [selectedChain, connectedAddress]);

//   const handleSend = async () => {
//     try {
//       if (!recipient || !amount) {
//         toast.error("❌ Please enter both recipient address and amount.");
//         return;
//       }

//       if (selectedChain === "solana") {
//         const connection = new Connection("https://api.devnet.solana.com");
//         const recipientPubKey = new PublicKey(recipient);
//         const sender = window.solana.publicKey;

//         const transaction = new Transaction().add(
//           SystemProgram.transfer({
//             fromPubkey: sender,
//             toPubkey: recipientPubKey,
//             lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
//           })
//         );

//         transaction.feePayer = sender;
//         const { blockhash } = await connection.getLatestBlockhash();
//         transaction.recentBlockhash = blockhash;

//         const signed = await window.solana.signTransaction(transaction);
//         const signature = await connection.sendRawTransaction(
//           signed.serialize()
//         );
//         await connection.confirmTransaction({ signature, blockhash });

//         toast.success(`✅ Sent ${amount} SOL successfully!`);
//       } else if (selectedChain === "ethereum" || selectedChain === "bsc") {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const userAddress = await signer.getAddress();

//         const currentChainId = await provider.send("eth_chainId", []);
//         const expectedChainId =
//           selectedChain === "bsc" ? "0x38" : "0xaa36a7"; // Sepolia

//         if (currentChainId !== expectedChainId) {
//           toast.error(
//             `❌ Please switch MetaMask to ${
//               selectedChain === "bsc" ? "BSC" : "Sepolia"
//             }`
//           );
//           return;
//         }

//         if (!ethers.utils.isAddress(recipient)) {
//           toast.error("❌ Invalid recipient address");
//           return;
//         }

//         const value = ethers.utils.parseEther(amount);
//         const balance = await provider.getBalance(userAddress);
//         if (balance.lt(value)) {
//           toast.error("❌ Insufficient funds");
//           return;
//         }

//         try {
//           const tx = await signer.sendTransaction({
//             to: recipient,
//             value,
//           });

//           toast.loading("⏳ Waiting for confirmation...", { id: "eth-tx" });
//           await tx.wait();
//           toast.success(
//             `✅ Sent ${amount} ${
//               selectedChain === "bsc" ? "BNB" : "ETH"
//             } successfully!`,
//             { id: "eth-tx" }
//           );
//         } catch (err) {
//           console.error("MetaMask error:", err);
//           toast.error(`❌ MetaMask error: ${err.message}`);
//         }
//       } else if (selectedChain === "bitcoin") {
//         if (!window.unisat) {
//           toast.error("❌ Unisat Wallet not available.");
//           return;
//         }

//         const sats = Math.floor(Number(amount) * 1e8);
//         if (sats <= 0) {
//           toast.error("❌ Amount must be greater than 0.");
//           return;
//         }

//         toast.loading("⏳ Sending BTC...", { id: "btc-tx" });

//         const txid = await window.unisat.sendBitcoin(recipient, sats);

//         toast.success(`✅ Sent ${amount} BTC! TXID: ${txid.slice(0, 12)}...`, {
//           id: "btc-tx",
//         });

//         // Refresh BTC balance
//         setTimeout(() => {
//           if (connectedAddress) {
//             fetch(
//               `https://blockstream.info/testnet/api/address/${connectedAddress}`
//             )
//               .then((res) => res.json())
//               .then((data) => {
//                 const newSats =
//                   data.chain_stats.funded_txo_sum -
//                   data.chain_stats.spent_txo_sum;
//                 setBtcBalance(newSats / 1e8);
//               });
//           }
//         }, 2000);
//       } else {
//         toast.error("❌ Unsupported or unselected chain.");
//         return;
//       }

//       setRecipient("");
//       setAmount("");
//     } catch (err) {
//       console.error(err);
//       toast.error("Transaction failed: " + err.message);
//     }
//   };

//   const renderBalance = () => {
//     if (selectedChain === "solana" && solBalance !== null) {
//       return (
//         <div className="text-center text-white text-lg mb-6">
//           ✅ Your Balance:{" "}
//           <span className="text-lime-400">{solBalance.toFixed(4)} SOL</span>
//         </div>
//       );
//     } else if (
//       (selectedChain === "ethereum" || selectedChain === "bsc") &&
//       ethBalance !== null
//     ) {
//       return (
//         <div className="text-center text-white text-lg mb-6">
//           ✅ Your Balance:{" "}
//           <span className="text-lime-400">
//             {parseFloat(ethBalance).toFixed(4)}{" "}
//             {selectedChain === "bsc" ? "BNB" : "ETH"}
//           </span>
//         </div>
//       );
//     } else if (selectedChain === "bitcoin" && btcBalance !== null) {
//       return (
//         <div className="text-center text-white text-lg mb-6">
//           ✅ Your Balance:{" "}
//           <span className="text-lime-400">{btcBalance.toFixed(8)} BTC</span>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="mt-20 max-w-lg mx-auto px-6 py-10 bg-[#181c24] rounded-2xl shadow-2xl border border-[#23272f]">
//       <h2 className="text-3xl font-extrabold text-[#b0d357] mb-4 text-center tracking-wide drop-shadow-lg">
//         Send Native Token
//       </h2>

//       {/* Show balance below heading */}
//       {renderBalance()}

//       <div className="flex flex-col gap-6">
//         <input
//           type="text"
//           value={recipient}
//           onChange={(e) => setRecipient(e.target.value)}
//           placeholder="Recipient Address"
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400"
//         />

//         <input
//           type="number"
//           step="0.00000001"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder={`Amount (${selectedChain?.toUpperCase()})`}
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400"
//         />

//         <button
//           onClick={handleSend}
//           className="bg-gradient-to-r from-[#b0d357] to-lime-400 text-black font-bold py-4 px-8 rounded-xl shadow-lg transition text-lg tracking-wide hover:from-lime-400 hover:to-[#b0d357]"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SendTransactionForm;


// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { ethers } from "ethers";
// import {
//   Connection,
//   PublicKey,
//   LAMPORTS_PER_SOL,
//   Transaction,
//   SystemProgram,
// } from "@solana/web3.js";

// const SendTransactionForm = ({ selectedChain, connectedAddress }) => {
//   const [recipient, setRecipient] = useState("");
//   const [amount, setAmount] = useState("");
//   const [solBalance, setSolBalance] = useState(null);
//   const [ethBalance, setEthBalance] = useState(null);
//   const [btcBalance, setBtcBalance] = useState(null);
//   const [isLoadingBalance, setIsLoadingBalance] = useState(false);
//   const [balanceError, setBalanceError] = useState(null);

//   const fetchBalance = async () => {
//     if (!selectedChain) {
//       console.log('No chain selected');
//       return;
//     }
    
//     console.log('=== BALANCE FETCH DEBUG ===');
//     console.log('Selected chain:', selectedChain);
//     console.log('Connected address:', connectedAddress);
//     console.log('window.solana:', window.solana);
//     console.log('window.ethereum:', window.ethereum);
//     console.log('window.unisat:', window.unisat);
    
//     setIsLoadingBalance(true);
//     setBalanceError(null);
    
//     try {
//       if (selectedChain === "solana") {
//         console.log('--- SOLANA BALANCE FETCH ---');
//         console.log('window.solana.isPhantom:', window.solana?.isPhantom);
//         console.log('window.solana.isConnected:', window.solana?.isConnected);
//         console.log('window.solana.publicKey:', window.solana?.publicKey);
        
//         if (!window.solana || !window.solana.publicKey) {
//           throw new Error('Phantom wallet not connected');
//         }
        
//         const connection = new Connection("https://api.devnet.solana.com");
//         const publicKey = window.solana.publicKey;
//         console.log('Fetching balance for pubkey:', publicKey.toString());
        
//         const balance = await connection.getBalance(publicKey);
//         console.log('Raw balance (lamports):', balance);
        
//         const solBalance = balance / LAMPORTS_PER_SOL;
//         console.log('Converted balance (SOL):', solBalance);
        
//         setSolBalance(solBalance);
//         setEthBalance(null);
//         setBtcBalance(null);
        
//       } else if (selectedChain === "ethereum" || selectedChain === "bsc") {
//         console.log('--- ETH/BSC BALANCE FETCH ---');
//         console.log('window.ethereum available:', !!window.ethereum);
        
//         if (!window.ethereum) {
//           throw new Error('MetaMask not available');
//         }
        
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const address = await signer.getAddress();
//         console.log('Wallet address:', address);
        
//         // Check if we're on the correct network
//         const network = await provider.getNetwork();
//         console.log('Current network:', network);
        
//         const balance = await provider.getBalance(address);
//         console.log('Raw balance (wei):', balance.toString());
        
//         const ethBalance = ethers.utils.formatEther(balance);
//         console.log('Converted balance:', ethBalance);
        
//         setEthBalance(ethBalance);
//         setSolBalance(null);
//         setBtcBalance(null);
        
//       } else if (selectedChain === "bitcoin") {
//         console.log('--- BITCOIN BALANCE FETCH ---');
//         console.log('connectedAddress:', connectedAddress);
//         console.log('window.unisat:', window.unisat);
        
//         if (!connectedAddress) {
//           throw new Error('Bitcoin address not available');
//         }
        
//         console.log('Fetching from API for address:', connectedAddress);
//         const res = await fetch(
//           `https://blockstream.info/testnet/api/address/${connectedAddress}`
//         );
        
//         if (!res.ok) {
//           throw new Error(`API request failed: ${res.status}`);
//         }
        
//         const data = await res.json();
//         console.log('Bitcoin API response:', data);
        
//         const sats = data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;
//         const btcBalance = sats / 1e8;
//         console.log('Bitcoin balance (sats):', sats);
//         console.log('Bitcoin balance (BTC):', btcBalance);
        
//         setBtcBalance(btcBalance);
//         setSolBalance(null);
//         setEthBalance(null);
//       } else {
//         console.log('Unknown chain:', selectedChain);
//         setSolBalance(null);
//         setEthBalance(null);
//         setBtcBalance(null);
//       }
      
//       console.log('=== BALANCE FETCH SUCCESS ===');
      
//     } catch (err) {
//       console.error(`${selectedChain} balance fetch failed:`, err);
//       setBalanceError(err.message);
//       setSolBalance(null);
//       setEthBalance(null);
//       setBtcBalance(null);
//     }
    
//     setIsLoadingBalance(false);
//   };

//   // FIX: Actually call fetchBalance when chain or address changes
//   useEffect(() => {
//     if (selectedChain && (connectedAddress || (selectedChain === "solana" && window.solana?.isConnected))) {
//       fetchBalance();
//     } else {
//       // Reset balances when no chain is selected or wallet is disconnected
//       setSolBalance(null);
//       setEthBalance(null);
//       setBtcBalance(null);
//       setBalanceError(null);
//     }
//   }, [selectedChain, connectedAddress]);

//   const handleSend = async () => {
//     try {
//       if (!recipient || !amount) {
//         toast.error("❌ Please enter both recipient address and amount.");
//         return;
//       }

//       if (selectedChain === "solana") {
//         const connection = new Connection("https://api.devnet.solana.com");
//         const recipientPubKey = new PublicKey(recipient);
//         const sender = window.solana.publicKey;

//         const transaction = new Transaction().add(
//           SystemProgram.transfer({
//             fromPubkey: sender,
//             toPubkey: recipientPubKey,
//             lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
//           })
//         );

//         transaction.feePayer = sender;
//         const { blockhash } = await connection.getLatestBlockhash();
//         transaction.recentBlockhash = blockhash;

//         const signed = await window.solana.signTransaction(transaction);
//         const signature = await connection.sendRawTransaction(
//           signed.serialize()
//         );
//         await connection.confirmTransaction({ signature, blockhash });

//         toast.success(`✅ Sent ${amount} SOL successfully!`);
        
//         // Refresh balance after successful transaction
//         setTimeout(() => {
//           const refreshBalance = async () => {
//             try {
//               const connection = new Connection("https://api.devnet.solana.com");
//               const publicKey = window.solana.publicKey;
//               const balance = await connection.getBalance(publicKey);
//               setSolBalance(balance / LAMPORTS_PER_SOL);
//             } catch (err) {
//               console.error("Balance refresh failed:", err);
//             }
//           };
//           refreshBalance();
//         }, 2000);
        
//       } else if (selectedChain === "ethereum" || selectedChain === "bsc") {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const userAddress = await signer.getAddress();

//         const currentChainId = await provider.send("eth_chainId", []);
//         const expectedChainId =
//           selectedChain === "bsc" ? "0x38" : "0xaa36a7"; // Sepolia

//         if (currentChainId !== expectedChainId) {
//           toast.error(
//             `❌ Please switch MetaMask to ${
//               selectedChain === "bsc" ? "BSC" : "Sepolia"
//             }`
//           );
//           return;
//         }

//         if (!ethers.utils.isAddress(recipient)) {
//           toast.error("❌ Invalid recipient address");
//           return;
//         }

//         const value = ethers.utils.parseEther(amount);
//         const balance = await provider.getBalance(userAddress);
//         if (balance.lt(value)) {
//           toast.error("❌ Insufficient funds");
//           return;
//         }

//         try {
//           const tx = await signer.sendTransaction({
//             to: recipient,
//             value,
//           });

//           toast.loading("⏳ Waiting for confirmation...", { id: "eth-tx" });
//           await tx.wait();
//           toast.success(
//             `✅ Sent ${amount} ${
//               selectedChain === "bsc" ? "BNB" : "ETH"
//             } successfully!`,
//             { id: "eth-tx" }
//           );
          
//           // Refresh balance after successful transaction
//           setTimeout(async () => {
//             try {
//               const newBalance = await provider.getBalance(userAddress);
//               setEthBalance(ethers.utils.formatEther(newBalance));
//             } catch (err) {
//               console.error("Balance refresh failed:", err);
//             }
//           }, 2000);
          
//         } catch (err) {
//           console.error("MetaMask error:", err);
//           toast.error(`❌ MetaMask error: ${err.message}`);
//         }
//       } else if (selectedChain === "bitcoin") {
//         if (!window.unisat) {
//           toast.error("❌ Unisat Wallet not available.");
//           return;
//         }

//         const sats = Math.floor(Number(amount) * 1e8);
//         if (sats <= 0) {
//           toast.error("❌ Amount must be greater than 0.");
//           return;
//         }

//         toast.loading("⏳ Sending BTC...", { id: "btc-tx" });

//         const txid = await window.unisat.sendBitcoin(recipient, sats);

//         toast.success(`✅ Sent ${amount} BTC! TXID: ${txid.slice(0, 12)}...`, {
//           id: "btc-tx",
//         });

//         // Refresh BTC balance
//         setTimeout(() => {
//           if (connectedAddress) {
//             fetch(
//               `https://blockstream.info/testnet/api/address/${connectedAddress}`
//             )
//               .then((res) => res.json())
//               .then((data) => {
//                 const newSats =
//                   data.chain_stats.funded_txo_sum -
//                   data.chain_stats.spent_txo_sum;
//                 setBtcBalance(newSats / 1e8);
//               })
//               .catch((err) => console.error("Balance refresh failed:", err));
//           }
//         }, 2000);
//       } else {
//         toast.error("❌ Unsupported or unselected chain.");
//         return;
//       }

//       setRecipient("");
//       setAmount("");
//     } catch (err) {
//       console.error(err);
//       toast.error("Transaction failed: " + err.message);
//     }
//   };

//   const renderBalance = () => {
//     // Debug information
//     const debugInfo = (
//       <div className="text-xs text-gray-500 mb-2 text-center">
//         Chain: {selectedChain || 'none'} | 
//         ConnAddr: {connectedAddress ? connectedAddress.slice(0,8)+'...' : 'none'} | 
//         Phantom: {window.solana?.publicKey ? 'connected' : 'disconnected'} |
//         MetaMask: {window.ethereum ? 'available' : 'unavailable'} |
//         Unisat: {window.unisat ? 'available' : 'unavailable'}
//       </div>
//     );

//     if (isLoadingBalance) {
//       return (
//         <div className="text-center text-white text-lg mb-6">
//           {debugInfo}
//           <span className="text-gray-400">⏳ Loading balance...</span>
//         </div>
//       );
//     }

//     if (balanceError) {
//       return (
//         <div className="text-center text-white text-lg mb-6">
//           {debugInfo}
//           <span className="text-red-400">❌ Error: {balanceError}</span>
//           <button 
//             onClick={fetchBalance}
//             className="ml-2 text-sm text-lime-400 hover:text-lime-300 underline"
//           >
//             Retry
//           </button>
//         </div>
//       );
//     }

//     if (selectedChain === "solana" && solBalance !== null) {
//       return (
//         <div className="text-center text-white text-lg mb-6">
//           {/* {debugInfo} */}
//           💰 Your Balance:{" "}
//           <span className="text-lime-400 font-semibold">{solBalance.toFixed(4)} SOL</span>
//           <button 
//             onClick={fetchBalance}
//             className="ml-2 text-sm text-gray-400 hover:text-lime-400"
//             title="Refresh balance"
//           >
//             🔄
//           </button>
//         </div>
//       );
//     } else if (
//       (selectedChain === "ethereum" || selectedChain === "bsc") &&
//       ethBalance !== null
//     ) {
//       return (
//         <div className="text-center text-white text-lg mb-6">
//           {/* {debugInfo} */}
//           💰 Your Balance:{" "}
//           <span className="text-lime-400 font-semibold">
//             {parseFloat(ethBalance).toFixed(4)}{" "}
//             {selectedChain === "bsc" ? "BNB" : "ETH"}
//           </span>
//           <button 
//             onClick={fetchBalance}
//             className="ml-2 text-sm text-gray-400 hover:text-lime-400"
//             title="Refresh balance"
//           >
//             🔄
//           </button>
//         </div>
//       );
//     } else if (selectedChain === "bitcoin" && btcBalance !== null) {
//       return (
//         <div className="text-center text-white text-lg mb-6">
//            {/* {debugInfo} */}
//           💰 Your Balance:{" "}
//           <span className="text-lime-400 font-semibold">{btcBalance.toFixed(8)} BTC</span>
//           <button 
//             onClick={fetchBalance}
//             className="ml-2 text-sm text-gray-400 hover:text-lime-400"
//             title="Refresh balance"
//           >
//             🔄
//           </button>
//         </div>
//       );
//     }
    
//     return (
//       <div className="text-center text-white text-lg mb-6">
//         {/* {debugInfo} */}
//         <span className="text-gray-400">
//           💰 {selectedChain ? 'Connect wallet to see balance' : 'Select a chain first'}
//         </span>
//         {selectedChain && (
//           <button 
//             onClick={fetchBalance}
//             className="ml-2 text-sm text-lime-400 hover:text-lime-300 underline"
//           >
//             See Balance
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="mt-20 max-w-lg mx-auto px-6 py-10 bg-[#181c24] rounded-2xl shadow-2xl border border-[#23272f]">
//       <h2 className="text-3xl font-extrabold text-[#b0d357] mb-4 text-center tracking-wide drop-shadow-lg">
//         Send Native Token
//       </h2>

//       {/* Show balance below heading */}
//       {renderBalance()}

//       <div className="flex flex-col gap-6">
//         <input
//           type="text"
//           value={recipient}
//           onChange={(e) => setRecipient(e.target.value)}
//           placeholder="Recipient Address"
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
//         />

//         <input
//           type="number"
//           step="0.00000001"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder={`Amount (${selectedChain?.toUpperCase() || 'TOKEN'})`}
//           className="bg-[#23272f] border-2 border-[#b0d357] text-white p-4 rounded-xl placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
//         />

//         <button
//           onClick={handleSend}
//           disabled={!selectedChain || (!connectedAddress && !(selectedChain === "solana" && window.solana?.isConnected))}
//           className="bg-gradient-to-r from-[#b0d357] to-lime-400 text-black font-bold py-4 px-8 rounded-xl shadow-lg transition text-lg tracking-wide hover:from-lime-400 hover:to-[#b0d357] disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SendTransactionForm;


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
