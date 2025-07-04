
// import { useEffect, useState } from "react";
// import { IoIosMenu } from "react-icons/io";
// import { Toaster, toast } from "react-hot-toast";
// import { ethers } from "ethers";

// const Navbar = ({
//   selectedChain,
//   setSelectedChain,
//   connectedAddress,
//   setConnectedAddress,
// }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);

//   const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

//   const isPhantomAvailable = () =>
//     typeof window !== "undefined" && window.solana?.isPhantom;
//   const isMetaMaskAvailable = () =>
//     typeof window !== "undefined" && window.ethereum?.isMetaMask;

//   const networkConfigs = {
//     sepolia: {
//       chainId: "0xaa36a7",
//     },
//     bsc: {
//       chainId: "0x38",
//       chainName: "BNB Smart Chain",
//       nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
//       rpcUrls: ["https://bsc-dataseed1.binance.org/"],
//       blockExplorerUrls: ["https://bscscan.com/"],
//     },
//   };

//   const getMetaMaskProvider = () => {
//     if (window.ethereum?.isMetaMask && !window.ethereum.providers) {
//       return window.ethereum;
//     } else if (window.ethereum?.providers) {
//       return window.ethereum.providers.find((p) => p.isMetaMask);
//     }
//     return null;
//   };

//   // const handleChainChange = async (e) => {
//   //   const chain = e.target.value;
//   //   if (!chain) return setSelectedChain("");

//   //   setIsConnecting(true);
//   //   try {
//   //     if (chain === "solana") {
//   //       await connectToSolana();
//   //     } else {
//   //       await connectToEthereum(chain);
//   //     }
//   //   } catch (error) {
//   //     console.error("Connection error:", error);
//   //     setSelectedChain("");
//   //     handleConnectionError(error, chain);
//   //   } finally {
//   //     setIsConnecting(false);
//   //   }
//   // };
//   const handleChainChange = async (e) => {
//     const chain = e.target.value;
//     if (!chain) return setSelectedChain("");

//     setIsConnecting(true);

//     try {
//       // ✅ Disconnect Phantom when switching *away* from Solana
//       if (chain !== "solana" && window.solana?.isConnected) {
//         await window.solana.disconnect();
//         console.log("🔌 Phantom disconnected to prevent conflict");
//       }

//       // 🔗 Connect based on chain
//       if (chain === "solana") {
//         await connectToSolana();
//       } else {
//         await connectToEthereum(chain);
//       }
//     } catch (error) {
//       console.error("Connection error:", error);
//       setSelectedChain("");
//       handleConnectionError(error, chain);
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   const connectToSolana = async () => {
//     if (!isPhantomAvailable()) throw new Error("Phantom wallet not installed.");

//     try {
//       const response = await window.solana.connect({ onlyIfTrusted: false });
//       const address = response.publicKey.toString();
//       setConnectionState("solana", address);
//       toast.success("✅ Connected to Solana via Phantom");
//     } catch (error) {
//       handleWalletError(error, "Phantom");
//     }
//   };

//   // const connectToEthereum = async (chain) => {
//   //   const provider = getMetaMaskProvider();
//   //   if (!provider) throw new Error("MetaMask is not installed.");

//   //   try {
//   //     if (chain === "bsc") await switchToBSCNetwork(provider);
//   //     if (chain === "ethereum") await switchToSepolia(provider);

//   //     const accounts = await provider.request({
//   //       method: "eth_requestAccounts",
//   //     });

//   //     setConnectionState(chain, accounts[0]);
//   //     toast.success(`✅ Connected to ${chain.toUpperCase()} via MetaMask`);
//   //   } catch (error) {
//   //     handleWalletError(error, "MetaMask");
//   //   }
//   // };
// const connectToEthereum = async (chain) => {
//   const metamaskProvider = getMetaMaskProvider();
//   if (!metamaskProvider) throw new Error("MetaMask is not installed.");

//   try {
//     // ⛓️ Switch network
//     if (chain === "bsc") await switchToBSCNetwork(metamaskProvider);
//     if (chain === "ethereum") await switchToSepolia(metamaskProvider);

//     // 🎯 Force Ethers.js to use MetaMask only
//     const provider = new ethers.providers.Web3Provider(metamaskProvider);
//     const accounts = await provider.send("eth_requestAccounts", []);
//     setConnectionState(chain, accounts[0]);

//     toast.success(`✅ Connected to ${chain.toUpperCase()} via MetaMask`);
//   } catch (error) {
//     handleWalletError(error, "MetaMask");
//   }
// };

//   const switchToBSCNetwork = async (provider) => {
//     try {
//       await provider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: networkConfigs.bsc.chainId }],
//       });
//     } catch (err) {
//       if (err.code === 4902) {
//         await provider.request({
//           method: "wallet_addEthereumChain",
//           params: [networkConfigs.bsc],
//         });
//       } else {
//         throw err;
//       }
//     }
//   };

//   const switchToSepolia = async (provider) => {
//     await provider.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: networkConfigs.sepolia.chainId }],
//     });
//   };

//   const handleWalletError = (error, wallet) => {
//     if (error.code === 4001 || error.message?.includes("User rejected")) {
//       throw new Error("❌ Connection cancelled by user");
//     } else if (error.code === -32002) {
//       throw new Error("⏳ Wallet connection already pending");
//     } else {
//       throw new Error(`${wallet} connection failed: ${error.message}`);
//     }
//   };

//   const handleConnectionError = (error, chain) => {
//     let msg = error.message;
//     if (msg.includes("not installed")) {
//       msg +=
//         chain === "solana"
//           ? "\n🔗 Install Phantom: https://phantom.app/"
//           : "\n🔗 Install MetaMask: https://metamask.io/";
//     }
//     toast.error(msg);
//   };

//   const setConnectionState = (chain, address) => {
//     setIsConnected(true);
//     setSelectedChain(chain);
//     setConnectedAddress(address);
//   };

//   const handleDisconnect = async () => {
//     try {
//       if (selectedChain === "solana" && isPhantomAvailable()) {
//         await window.solana.disconnect();
//       }
//     } finally {
//       setIsConnected(false);
//       setConnectedAddress("");
//       setSelectedChain("");
//       toast.success("✅ Disconnected");
//     }
//   };

//   const truncateAddress = (address) =>
//     address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

//   return (
//     <>
//       <Toaster position="top-right" />
//       <nav className="bg-black text-white py-6 px-6 md:px-10 flex justify-between items-center w-full z-50 relative">
//         {/* Logo Section */}
//         <div className="flex items-center gap-6">
//           <a href="/" className="flex items-center gap-2">
//             <img src="/logo.png" alt="Logo" width={160} />
//           </a>
//         </div>

//         {/* Desktop Nav Links */}
//         <ul className="hidden lg:flex gap-6 font-medium text-md">
//           {navLinks.map((link) => (
//             <li key={link}>
//               <a
//                 href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
//                 className="hover:text-lime-400 transition"
//               >
//                 {link}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Right Side Desktop Buttons */}
//         <div className="hidden lg:flex items-center gap-4">
//           {!isConnected && (
//             <select
//               value={selectedChain}
//               onChange={handleChainChange}
//               disabled={isConnecting}
//               className="bg-black border border-lime-400 text-white px-4 py-2 rounded-full text-sm"
//             >
//               <option value="">🔗 Select Chain</option>
//               <option value="ethereum">🦊 Ethereum</option>
//               <option value="solana">🌞 Solana</option>
//               <option value="bsc">🟡 BSC</option>
//             </select>
//           )}

//           {isConnected && (
//             <div className="flex items-center gap-2 bg-black border border-lime-400 px-4 py-2 rounded-full text-sm">
//               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//               <span className="text-lime-400 font-medium">
//                 {selectedChain.toUpperCase()}
//               </span>
//               <span className="text-white">|</span>
//               <span>{truncateAddress(connectedAddress)}</span>
//             </div>
//           )}

//           {isConnecting && (
//             <span className="text-lime-400 text-sm flex items-center gap-2">
//               <div className="w-3 h-3 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
//               Connecting...
//             </span>
//           )}

//           {isConnected ? (
//             <button
//               onClick={handleDisconnect}
//               className="border border-red-400 text-red-400 px-6 py-2 rounded-full hover:bg-red-400 hover:text-white transition font-semibold"
//             >
//               Disconnect
//             </button>
//           ) : (
//             <>
//               <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold">
//                 SignUp
//               </button>
//               <button className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold hover:bg-lime-400 transition">
//                 Login
//               </button>
//             </>
//           )}
//         </div>

//         {/* Mobile Toggle Button */}
//         <button
//           className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <IoIosMenu size={36} color="#b0d357" />
//         </button>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

// import { useEffect, useState } from "react";
// import { IoIosMenu } from "react-icons/io";
// import { Toaster, toast } from "react-hot-toast";
// import { ethers } from "ethers";

// const Navbar = ({
//   selectedChain,
//   setSelectedChain,
//   connectedAddress,
//   setConnectedAddress,
// }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);

//   const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

//   const isPhantomAvailable = () =>
//     typeof window !== "undefined" && window.solana?.isPhantom;
//   const isMetaMaskAvailable = () =>
//     typeof window !== "undefined" && window.ethereum?.isMetaMask;

//   const networkConfigs = {
//     sepolia: {
//       chainId: "0xaa36a7",
//     },
//     bsc: {
//       chainId: "0x38",
//       chainName: "BNB Smart Chain",
//       nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
//       rpcUrls: ["https://bsc-dataseed1.binance.org/"],
//       blockExplorerUrls: ["https://bscscan.com/"],
//     },
//   };

//   const getMetaMaskProvider = () => {
//     if (window.ethereum?.isMetaMask && !window.ethereum.providers) {
//       return window.ethereum;
//     } else if (window.ethereum?.providers) {
//       return window.ethereum.providers.find((p) => p.isMetaMask);
//     }
//     return null;
//   };

//   const handleChainChange = async (e) => {
//     const chain = e.target.value;
//     if (!chain) return setSelectedChain("");

//     setIsConnecting(true);

//     try {
//       if (chain !== "solana" && window.solana?.isConnected) {
//         await window.solana.disconnect();
//         console.log("🔌 Phantom disconnected to prevent conflict");
//       }

//       if (chain === "solana") {
//         await connectToSolana();
//       } else {
//         await connectToEthereum(chain);
//       }
//     } catch (error) {
//       console.error("Connection error:", error);
//       setSelectedChain("");
//       handleConnectionError(error, chain);
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   const connectToSolana = async () => {
//     if (!isPhantomAvailable()) throw new Error("Phantom wallet not installed.");
//     try {
//       const response = await window.solana.connect({ onlyIfTrusted: false });
//       const address = response.publicKey.toString();
//       setConnectionState("solana", address);
//       toast.success("✅ Connected to Solana via Phantom");
//     } catch (error) {
//       handleWalletError(error, "Phantom");
//     }
//   };

//   const connectToEthereum = async (chain) => {
//     const metamaskProvider = getMetaMaskProvider();
//     if (!metamaskProvider) throw new Error("MetaMask is not installed.");

//     try {
//       if (chain === "bsc") await switchToBSCNetwork(metamaskProvider);
//       if (chain === "ethereum") await switchToSepolia(metamaskProvider);

//       const provider = new ethers.providers.Web3Provider(metamaskProvider);
//       const accounts = await provider.send("eth_requestAccounts", []);
//       setConnectionState(chain, accounts[0]);

//       toast.success(`✅ Connected to ${chain.toUpperCase()} via MetaMask`);
//     } catch (error) {
//       handleWalletError(error, "MetaMask");
//     }
//   };

//   const switchToBSCNetwork = async (provider) => {
//     try {
//       await provider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: networkConfigs.bsc.chainId }],
//       });
//     } catch (err) {
//       if (err.code === 4902) {
//         await provider.request({
//           method: "wallet_addEthereumChain",
//           params: [networkConfigs.bsc],
//         });
//       } else {
//         throw err;
//       }
//     }
//   };

//   const switchToSepolia = async (provider) => {
//     await provider.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: networkConfigs.sepolia.chainId }],
//     });
//   };

//   const handleWalletError = (error, wallet) => {
//     if (error.code === 4001 || error.message?.includes("User rejected")) {
//       throw new Error("❌ Connection cancelled by user");
//     } else if (error.code === -32002) {
//       throw new Error("⏳ Wallet connection already pending");
//     } else {
//       throw new Error(`${wallet} connection failed: ${error.message}`);
//     }
//   };

//   const handleConnectionError = (error, chain) => {
//     let msg = error.message;
//     if (msg.includes("not installed")) {
//       msg +=
//         chain === "solana"
//           ? "\n🔗 Install Phantom: https://phantom.app/"
//           : "\n🔗 Install MetaMask: https://metamask.io/";
//     }
//     toast.error(msg);
//   };

//   const setConnectionState = (chain, address) => {
//     setIsConnected(true);
//     setSelectedChain(chain);
//     setConnectedAddress(address);
//   };

//   const handleDisconnect = async () => {
//     try {
//       if (selectedChain === "solana" && isPhantomAvailable()) {
//         await window.solana.disconnect();
//       }
//     } finally {
//       setIsConnected(false);
//       setConnectedAddress("");
//       setSelectedChain("");
//       toast.success("✅ Disconnected");
//     }
//   };

//   const truncateAddress = (address) =>
//     address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

//   return (
//     <>
//       <Toaster position="top-right" />

//       <div className="relative">
//         <nav className="bg-black text-white py-6 px-6 md:px-10 flex justify-between items-center w-full z-50">
//           {/* Logo */}
//           <div className="flex items-center gap-6">
//             <a href="/" className="flex items-center gap-2">
//               <img src="/logo.png" alt="Logo" width={160} />
//             </a>
//           </div>

//           {/* Desktop Links */}
//           <ul className="hidden lg:flex gap-6 font-medium text-md">
//             {navLinks.map((link) => (
//               <li key={link}>
//                 <a
//                   href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
//                   className="hover:text-lime-400 transition"
//                 >
//                   {link}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           {/* Right Side (Desktop) */}
//           <div className="hidden lg:flex items-center gap-4">
//             {!isConnected && (
//               <select
//                 value={selectedChain}
//                 onChange={handleChainChange}
//                 disabled={isConnecting}
//                 className="bg-black border border-lime-400 text-white px-4 py-2 rounded-full text-sm"
//               >
//                 <option value="">🔗 Select Chain</option>
//                 <option value="ethereum">🦊 Ethereum</option>
//                 <option value="solana">🌞 Solana</option>
//                 <option value="bsc">🟡 BSC</option>
//               </select>
//             )}

//             {isConnected && (
//               <div className="flex items-center gap-2 bg-black border border-lime-400 px-4 py-2 rounded-full text-sm">
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                 <span className="text-lime-400 font-medium">
//                   {selectedChain.toUpperCase()}
//                 </span>
//                 <span className="text-white">|</span>
//                 <span>{truncateAddress(connectedAddress)}</span>
//               </div>
//             )}

//             {isConnecting && (
//               <span className="text-lime-400 text-sm flex items-center gap-2">
//                 <div className="w-3 h-3 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
//                 Connecting...
//               </span>
//             )}

//             {isConnected ? (
//               <button
//                 onClick={handleDisconnect}
//                 className="border border-red-400 text-red-400 px-6 py-2 rounded-full hover:bg-red-400 hover:text-white transition font-semibold"
//               >
//                 Disconnect
//               </button>
//             ) : (
//               <>
//                 <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold">
//                   SignUp
//                 </button>
//                 <button className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold hover:bg-lime-400 transition">
//                   Login
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Mobile Toggle Button */}
//           <button
//             className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <IoIosMenu size={36} color="#b0d357" />
//           </button>
//         </nav>

//         {/* ✅ Mobile Dropdown Menu */}
//         {menuOpen && (
//           <div className="lg:hidden absolute left-0 top-full w-full bg-black text-white px-6 py-6 z-40 shadow-xl rounded-b-lg transition-all">
//             <ul className="flex flex-col gap-4 text-md font-medium">
//               {navLinks.map((link) => (
//                 <li key={link}>
//                   <a
//                     href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
//                     onClick={() => setMenuOpen(false)}
//                     className="hover:text-lime-400 transition"
//                   >
//                     {link}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//       </div>
//     </>
//   );
// };

// export default Navbar;

// import { useEffect, useState } from "react";
// import { IoIosMenu } from "react-icons/io";
// import { Toaster, toast } from "react-hot-toast";
// import { ethers } from "ethers";

// const Navbar = ({
//   selectedChain,
//   setSelectedChain,
//   connectedAddress,
//   setConnectedAddress,
// }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);

//   const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

//   const isPhantomAvailable = () =>
//     typeof window !== "undefined" && window.solana?.isPhantom;
//   const isMetaMaskAvailable = () =>
//     typeof window !== "undefined" && window.ethereum?.isMetaMask;

//   const networkConfigs = {
//     sepolia: {
//       chainId: "0xaa36a7",
//     },
//     bsc: {
//       chainId: "0x38",
//       chainName: "BNB Smart Chain",
//       nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
//       rpcUrls: ["https://bsc-dataseed1.binance.org/"],
//       blockExplorerUrls: ["https://bscscan.com/"],
//     },
//   };

//   const getMetaMaskProvider = () => {
//     if (window.ethereum?.isMetaMask && !window.ethereum.providers) {
//       return window.ethereum;
//     } else if (window.ethereum?.providers) {
//       return window.ethereum.providers.find((p) => p.isMetaMask);
//     }
//     return null;
//   };
// // const getMetaMaskProvider = () => {
// //   // Case 1: Only MetaMask installed
// //   if (window.ethereum?.isMetaMask && !window.ethereum.providers) {
// //     return window.ethereum;
// //   }

// //   // Case 2: Multiple providers injected (MetaMask + Phantom)
// //   if (Array.isArray(window.ethereum?.providers)) {
// //     return window.ethereum.providers.find((p) => p.isMetaMask);
// //   }

// //   // MetaMask not found
// //   return null;
// // };

//   const handleChainChange = async (e) => {
//     const chain = e.target.value;
//     if (!chain) return setSelectedChain("");

//     setIsConnecting(true);
//     try {
//       if (chain !== "solana" && window.solana?.isConnected) {
//         await window.solana.disconnect();
//         console.log("🔌 Phantom disconnected");
//       }

//       if (chain === "solana") {
//         await connectToSolana();
//       } else {
//         await connectToEthereum(chain);
//       }
//     } catch (error) {
//       console.error("Connection error:", error);
//       setSelectedChain("");
//       handleConnectionError(error, chain);
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   const connectToSolana = async () => {
//     if (!isPhantomAvailable()) throw new Error("Phantom wallet not installed.");
//     try {
//       const response = await window.solana.connect({ onlyIfTrusted: false });
//       const address = response.publicKey.toString();
//       setConnectionState("solana", address);
//       toast.success("✅ Connected to Solana via Phantom");
//     } catch (error) {
//       handleWalletError(error, "Phantom");
//     }
//   };

//   const connectToEthereum = async (chain) => {
//     const metamaskProvider = getMetaMaskProvider();
//     if (!metamaskProvider) throw new Error("MetaMask is not installed.");

//     try {
//       if (chain === "bsc") await switchToBSCNetwork(metamaskProvider);
//       if (chain === "ethereum") await switchToSepolia(metamaskProvider);

//       const provider = new ethers.providers.Web3Provider(metamaskProvider);
//       const accounts = await provider.send("eth_requestAccounts", []);
//       setConnectionState(chain, accounts[0]);

//       toast.success(`✅ Connected to ${chain.toUpperCase()} via MetaMask`);
//     } catch (error) {
//       handleWalletError(error, "MetaMask");
//     }
//   };

//   const switchToBSCNetwork = async (provider) => {
//     try {
//       await provider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: networkConfigs.bsc.chainId }],
//       });
//     } catch (err) {
//       if (err.code === 4902) {
//         await provider.request({
//           method: "wallet_addEthereumChain",
//           params: [networkConfigs.bsc],
//         });
//       } else {
//         throw err;
//       }
//     }
//   };

//   const switchToSepolia = async (provider) => {
//     await provider.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: networkConfigs.sepolia.chainId }],
//     });
//   };

//   const handleWalletError = (error, wallet) => {
//     if (error.code === 4001 || error.message?.includes("User rejected")) {
//       throw new Error("❌ Connection cancelled by user");
//     } else if (error.code === -32002) {
//       throw new Error("⏳ Wallet connection already pending");
//     } else {
//       throw new Error(`${wallet} connection failed: ${error.message}`);
//     }
//   };

//   const handleConnectionError = (error, chain) => {
//     let msg = error.message;
//     if (msg.includes("not installed")) {
//       msg +=
//         chain === "solana"
//           ? "\n🔗 Install Phantom: https://phantom.app/"
//           : "\n🔗 Install MetaMask: https://metamask.io/";
//     }
//     toast.error(msg);
//   };

//   const setConnectionState = (chain, address) => {
//     setIsConnected(true);
//     setSelectedChain(chain);
//     setConnectedAddress(address);
//   };

//   const handleDisconnect = async () => {
//     try {
//       if (selectedChain === "solana" && isPhantomAvailable()) {
//         await window.solana.disconnect();
//       }
//     } finally {
//       setIsConnected(false);
//       setConnectedAddress("");
//       setSelectedChain("");
//       toast.success("✅ Disconnected");
//     }
//   };

//   const truncateAddress = (address) =>
//     address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

//   return (
//     <>
//       <Toaster position="top-right" />
//       <nav className="bg-black text-white py-6 px-6 md:px-10 flex justify-between items-center w-full z-50 relative">
//         {/* Logo + Podcast */}
//         <div className="flex items-center gap-6">
//           <a href="/" className="flex items-center gap-2">
//             <img src="/logo.png" alt="Logo" width={160} />
//           </a>
//           <div className="hidden md:flex flex-col items-center gap-1 text-lime-400 font-semibold">
//             <img src="/podcast.png" alt="Podcast" width={50} />
//             <span className="text-sm">PODCAST</span>
//           </div>
//         </div>

//         {/* Desktop Nav */}
//         <ul className="hidden lg:flex gap-6 font-medium text-md">
//           {navLinks.map((link) => (
//             <li key={link}>
//               <a
//                 href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
//                 className="hover:text-lime-400 transition"
//               >
//                 {link}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Desktop Actions */}
//         <div className="hidden lg:flex items-center gap-4">
//           {!isConnected && (
//             <select
//               value={selectedChain}
//               onChange={handleChainChange}
//               disabled={isConnecting}
//               className="bg-black border border-lime-400 text-white px-4 py-2 rounded-full text-sm"
//             >
//               <option value="">🔗 Select Chain</option>
//               <option value="ethereum">🦊 Ethereum</option>
//               <option value="solana">🌞 Solana</option>
//               <option value="bsc">🟡 BSC</option>
//             </select>
//           )}
//           {isConnected && (
//             <div className="flex items-center gap-2 bg-black border border-lime-400 px-4 py-2 rounded-full text-sm">
//               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//               <span className="text-lime-400 font-medium">{selectedChain.toUpperCase()}</span>
//               <span className="text-white">|</span>
//               <span>{truncateAddress(connectedAddress)}</span>
//             </div>
//           )}
//           {isConnecting && (
//             <span className="text-lime-400 text-sm flex items-center gap-2">
//               <div className="w-3 h-3 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
//               Connecting...
//             </span>
//           )}
//           {isConnected ? (
//             <button
//               onClick={handleDisconnect}
//               className="border border-red-400 text-red-400 px-6 py-2 rounded-full hover:bg-red-400 hover:text-white transition font-semibold"
//             >
//               Disconnect
//             </button>
//           ) : (
//             <>
//               <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold">
//                 SignUp
//               </button>
//               <button className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold hover:bg-lime-400 transition">
//                 Login
//               </button>
//             </>
//           )}
//         </div>

//         {/* 🔽 Mobile Toggle Button */}
//         <button
//           className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <IoIosMenu size={36} color="#b0d357" />
//         </button>

//         {/* 📱 Mobile Menu */}
//         {menuOpen && (
//           <div className="lg:hidden absolute top-full left-0 w-full z-50 shadow-md">
//             <ul className="flex flex-col items-center space-y-5 py-8 font-medium text-black text-2xl bg-white">
//               {navLinks.map((link) => (
//                 <li key={link} className="w-4/5">
//                   <a
//                     href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
//                     className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     {link}
//                   </a>
//                 </li>
//               ))}
//               <li className="w-4/5">
//                 <select
//                   value={selectedChain}
//                   onChange={handleChainChange}
//                   disabled={isConnecting || isConnected}
//                   className="w-full py-4 bg-black border border-lime-400 text-white rounded-full text-center focus:outline-none disabled:opacity-50"
//                 >
//                   <option value="">🔗 Select Chain</option>
//                   <option value="ethereum">🦊 Ethereum</option>
//                   <option value="solana">🌞 Solana</option>
//                   <option value="bsc">🟡 BSC</option>
//                 </select>
//               </li>

//               {isConnecting && (
//                 <li className="w-4/5 flex justify-center">
//                   <span className="flex items-center gap-2 text-lime-400 text-lg">
//                     <div className="w-4 h-4 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
//                     Connecting...
//                   </span>
//                 </li>
//               )}

//               {!isConnected && !isConnecting && (
//                 <>
//                   <li className="w-4/5">
//                     <button
//                       className="w-full py-4 bg-black text-white border border-white rounded-full font-bold hover:bg-white hover:text-black transition"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       Sign Up
//                     </button>
//                   </li>
//                   <li className="w-4/5">
//                     <button
//                       className="w-full py-4 bg-lime-400 text-black rounded-full font-semibold hover:bg-lime-300 transition"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       Login
//                     </button>
//                   </li>
//                 </>
//               )}

//               {isConnected && (
//                 <li className="w-4/5">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       handleDisconnect();
//                       setMenuOpen(false);
//                     }}
//                     className="w-full py-4 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition"
//                   >
//                     Disconnect
//                   </button>
//                   <div className="mt-2 text-center text-sm text-gray-700 bg-gray-100 rounded-full py-2">
//                     <span className="text-lime-600 font-semibold">{selectedChain.toUpperCase()}</span>
//                     <span className="mx-2 text-gray-400">|</span>
//                     <span className="font-mono">{truncateAddress(connectedAddress)}</span>
//                   </div>
//                 </li>
//               )}
//             </ul>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// };

// export default Navbar;

// import { useEffect, useRef, useState } from "react";
// import { IoIosMenu } from "react-icons/io";
// import { Toaster, toast } from "react-hot-toast";
// import { ethers } from "ethers";

// const Navbar = ({
//   selectedChain,
//   setSelectedChain,
//   connectedAddress,
//   setConnectedAddress,
// }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);
//   const triedAutoConnectRef = useRef(false);

//   const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

//   const isPhantomAvailable = () =>
//     typeof window !== "undefined" && window.solana?.isPhantom;
//   const isMetaMaskAvailable = () =>
//     typeof window !== "undefined" && window.ethereum?.isMetaMask;

//   const networkConfigs = {
//     sepolia: {
//       chainId: "0xaa36a7",
//     },
//     bsc: {
//       chainId: "0x38",
//       chainName: "BNB Smart Chain",
//       nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
//       rpcUrls: ["https://bsc-dataseed1.binance.org/"],
//       blockExplorerUrls: ["https://bscscan.com/"],
//     },
//   };

//   const getMetaMaskProvider = () => {
//     if (window.ethereum?.isMetaMask && !window.ethereum.providers) {
//       return window.ethereum;
//     }
//     if (Array.isArray(window.ethereum?.providers)) {
//       return window.ethereum.providers.find((p) => p.isMetaMask);
//     }
//     return null;
//   };

//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.autoRefreshOnNetworkChange = false;
//     }

//     const autoConnect = async () => {
//       if (triedAutoConnectRef.current) return;
//       triedAutoConnectRef.current = true;

//       const chain = localStorage.getItem("walletChain");
//       if (!chain) return;

//       try {
//         if (chain === "solana" && isPhantomAvailable()) {
//           await connectToSolana();
//         } else if (
//           (chain === "ethereum" || chain === "bsc") &&
//           isMetaMaskAvailable()
//         ) {
//           await connectToEthereum(chain);
//         }
//       } catch (e) {
//         console.warn("🔁 Auto-reconnect failed:", e.message);
//       }
//     };

//     autoConnect();
//   }, []);

//   const handleChainChange = async (e) => {
//     const chain = e.target.value;
//     if (!chain) return setSelectedChain("");

//     setIsConnecting(true);
//     try {
//       if (chain !== "solana" && window.solana?.isConnected) {
//         await window.solana.disconnect();
//         console.log("🔌 Phantom disconnected");
//       }

//       if (chain === "solana") {
//         await connectToSolana();
//       } else {
//         await connectToEthereum(chain);
//       }

//       localStorage.setItem("walletChain", chain);
//     } catch (error) {
//       setSelectedChain("");
//       handleConnectionError(error, chain);
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   const connectToSolana = async () => {
//     if (!isPhantomAvailable()) throw new Error("Phantom wallet not installed.");
//     try {
//       const response = await window.solana.connect({ onlyIfTrusted: false });
//       const address = response.publicKey.toString();
//       setConnectionState("solana", address);
//       toast.success("✅ Connected to Solana via Phantom");
//     } catch (error) {
//       handleWalletError(error, "Phantom");
//     }
//   };

//   const connectToEthereum = async (chain) => {
//     const metamaskProvider = getMetaMaskProvider();
//     if (!metamaskProvider) throw new Error("MetaMask is not installed.");

//     try {
//       if (chain === "bsc") await switchToBSCNetwork(metamaskProvider);
//       if (chain === "ethereum") await switchToSepolia(metamaskProvider);

//       const provider = new ethers.providers.Web3Provider(metamaskProvider);
//       const accounts = await provider.listAccounts();

//       if (accounts.length === 0) {
//         const requested = await provider.send("eth_requestAccounts", []);
//         setConnectionState(chain, requested[0]);
//       } else {
//         setConnectionState(chain, accounts[0]);
//       }

//       toast.success(`✅ Connected to ${chain.toUpperCase()} via MetaMask`);
//     } catch (error) {
//       handleWalletError(error, "MetaMask");
//     }
//   };

//   const switchToBSCNetwork = async (provider) => {
//     try {
//       await provider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: networkConfigs.bsc.chainId }],
//       });
//     } catch (err) {
//       if (err.code === 4902) {
//         await provider.request({
//           method: "wallet_addEthereumChain",
//           params: [networkConfigs.bsc],
//         });
//       } else {
//         throw err;
//       }
//     }
//   };

//   const switchToSepolia = async (provider) => {
//     await provider.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: networkConfigs.sepolia.chainId }],
//     });
//   };

//   const handleWalletError = (error, wallet) => {
//     if (error.code === 4001 || error.message?.includes("User rejected")) {
//       throw new Error("❌ Connection cancelled by user");
//     } else if (error.code === -32002) {
//       throw new Error("⏳ Wallet connection already pending");
//     } else {
//       throw new Error(`${wallet} connection failed: ${error.message}`);
//     }
//   };

//   const handleConnectionError = (error, chain) => {
//     let msg = error.message;
//     if (msg.includes("not installed")) {
//       msg +=
//         chain === "solana"
//           ? "\n🔗 Install Phantom: https://phantom.app/"
//           : "\n🔗 Install MetaMask: https://metamask.io/";
//     }
//     toast.error(msg);
//   };

//   const setConnectionState = (chain, address) => {
//     setIsConnected(true);
//     setSelectedChain(chain);
//     setConnectedAddress(address);
//   };

//   const handleDisconnect = async () => {
//     try {
//       if (selectedChain === "solana" && isPhantomAvailable()) {
//         await window.solana.disconnect();
//       }
//     } finally {
//       setIsConnected(false);
//       setConnectedAddress("");
//       setSelectedChain("");
//       localStorage.removeItem("walletChain");
//       toast.success("✅ Disconnected");
//     }
//   };

//   const truncateAddress = (address) =>
//     address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

//   return (
//     <>
//       <Toaster position="top-right" />
// <nav className="bg-black text-white py-6 px-6 md:px-10 flex justify-between items-center w-full z-50 relative">
//   {/* Logo */}
//   <div className="flex items-center gap-6">
//     <a href="/" className="flex items-center gap-2">
//       <img src="/logo.png" alt="Logo" width={160} />
//     </a>
//     <div className="hidden md:flex flex-col items-center gap-1 text-lime-400 font-semibold">
//       <img src="/podcast.png" alt="Podcast" width={50} />
//       <span className="text-sm">PODCAST</span>
//     </div>
//   </div>

//   {/* Desktop Nav */}
//   <ul className="hidden lg:flex gap-6 font-medium text-md">
//     {navLinks.map((link) => (
//       <li key={link}>
//         <a
//           href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
//           className="hover:text-lime-400 transition"
//         >
//           {link}
//         </a>
//       </li>
//     ))}
//   </ul>

//   {/* Desktop Wallet Actions */}
//   <div className="hidden lg:flex items-center gap-4">
//     {!isConnected && (
//       <select
//         value={selectedChain}
//         onChange={handleChainChange}
//         disabled={isConnecting}
//         className="bg-black border border-lime-400 text-white px-4 py-2 rounded-full text-sm"
//       >
//         <option value="">🔗 Select Chain</option>
//         <option value="ethereum">🦊 Ethereum</option>
//         <option value="solana">🌞 Solana</option>
//         <option value="bsc">🟡 BSC</option>
//         <option value="bitcoin">₿ Bitcoin (Testnet)</option>

//       </select>
//     )}
//     {isConnected && (
//       <div className="flex items-center gap-2 bg-black border border-lime-400 px-4 py-2 rounded-full text-sm">
//         <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//         <span className="text-lime-400 font-medium">{selectedChain.toUpperCase()}</span>
//         <span className="text-white">|</span>
//         <span>{truncateAddress(connectedAddress)}</span>
//       </div>
//     )}
//     {isConnecting && (
//       <span className="text-lime-400 text-sm flex items-center gap-2">
//         <div className="w-3 h-3 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
//         Connecting...
//       </span>
//     )}
//     {isConnected ? (
//       <button
//         onClick={handleDisconnect}
//         className="border border-red-400 text-red-400 px-6 py-2 rounded-full hover:bg-red-400 hover:text-white transition font-semibold"
//       >
//         Disconnect
//       </button>
//     ) : (
//       <>
//         <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold">
//           SignUp
//         </button>
//         <button className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold hover:bg-lime-400 transition">
//           Login
//         </button>
//       </>
//     )}
//   </div>

//   {/* Mobile Menu Toggle */}
//   <button
//     className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full"
//     onClick={() => setMenuOpen(!menuOpen)}
//   >
//     <IoIosMenu size={36} color="#b0d357" />
//   </button>

//   {/* Mobile Menu */}
//   {menuOpen && (
//     <div className="lg:hidden absolute top-full left-0 w-full z-50 shadow-md bg-white">
//       <ul className="flex flex-col items-center space-y-5 py-8 font-medium text-black text-2xl">
//         {navLinks.map((link) => (
//           <li key={link} className="w-4/5">
//             <a
//               href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
//               className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold"
//               onClick={() => setMenuOpen(false)}
//             >
//               {link}
//             </a>
//           </li>
//         ))}
//         <li className="w-4/5">
//           <select
//             value={selectedChain}
//             onChange={handleChainChange}
//             disabled={isConnecting || isConnected}
//             className="w-full py-4 bg-black border border-lime-400 text-white rounded-full text-center focus:outline-none disabled:opacity-50"
//           >
//             <option value="">🔗 Select Chain</option>
//             <option value="ethereum">🦊 Ethereum</option>
//             <option value="solana">🌞 Solana</option>
//             <option value="bsc">🟡 BSC</option>
//           </select>
//         </li>
//         {isConnected && (
//           <li className="w-4/5">
//             <button
//               onClick={() => {
//                 handleDisconnect();
//                 setMenuOpen(false);
//               }}
//               className="w-full py-4 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition"
//             >
//               Disconnect
//             </button>
//             <div className="mt-2 text-center text-sm text-gray-700 bg-gray-100 rounded-full py-2">
//               <span className="text-lime-600 font-semibold">{selectedChain.toUpperCase()}</span>
//               <span className="mx-2 text-gray-400">|</span>
//               <span className="font-mono">{truncateAddress(connectedAddress)}</span>
//             </div>
//           </li>
//         )}
//       </ul>
//     </div>
//   )}
// </nav>
//     </>
//   );
// };

// export default Navbar;

// import { useEffect, useRef, useState } from "react";
// import { IoIosMenu } from "react-icons/io";
// import { Toaster, toast } from "react-hot-toast";
// import { ethers } from "ethers";

// const Navbar = ({
//   selectedChain,
//   setSelectedChain,
//   connectedAddress,
//   setConnectedAddress,
// }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);
//   const triedAutoConnectRef = useRef(false);

//   const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

//   const isPhantomAvailable = () =>
//     typeof window !== "undefined" && window.solana?.isPhantom;
//   const isMetaMaskAvailable = () =>
//     typeof window !== "undefined" && window.ethereum?.isMetaMask;

//   const networkConfigs = {
//     sepolia: {
//       chainId: "0xaa36a7",
//     },
//     bsc: {
//       chainId: "0x38",
//       chainName: "BNB Smart Chain",
//       nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
//       rpcUrls: ["https://bsc-dataseed1.binance.org/"],
//       blockExplorerUrls: ["https://bscscan.com/"],
//     },
//   };

//   const getMetaMaskProvider = () => {
//     if (window.ethereum?.isMetaMask && !window.ethereum.providers) {
//       return window.ethereum;
//     }
//     if (Array.isArray(window.ethereum?.providers)) {
//       return window.ethereum.providers.find((p) => p.isMetaMask);
//     }
//     return null;
//   };

//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.autoRefreshOnNetworkChange = false;
//     }

//     const autoConnect = async () => {
//       if (triedAutoConnectRef.current) return;
//       triedAutoConnectRef.current = true;

//       const chain = localStorage.getItem("walletChain");
//       if (!chain) return;

//       try {
//         if (chain === "solana" && isPhantomAvailable()) {
//           await connectToSolana();
//         } else if (
//           (chain === "ethereum" || chain === "bsc") &&
//           isMetaMaskAvailable()
//         ) {
//           await connectToEthereum(chain);
//         } else if (chain === "bitcoin") {
//           const address = localStorage.getItem("btcAddress");
//           if (address) {
//             setConnectionState("bitcoin", address);
//             await fetchBitcoinBalance(address);
//           }
//         }
//       } catch (e) {
//         console.warn("🔁 Auto-reconnect failed:", e.message);
//       }
//     };

//     autoConnect();
//   }, []);

//   const fetchBitcoinBalance = async (address) => {
//     try {
//       const res = await fetch(
//         `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`
//       );
//       const data = await res.json();
//       const btc = data.final_balance / 1e8; // satoshis to BTC
//       toast.success(`💰 BTC Balance: ${btc} tBTC`);
//     } catch (err) {
//       toast.error("❌ Failed to fetch Bitcoin balance");
//     }
//   };

//   const handleChainChange = async (e) => {
//     const chain = e.target.value;
//     if (!chain) return setSelectedChain("");

//     setIsConnecting(true);
//     try {
//       if (chain !== "solana" && window.solana?.isConnected) {
//         await window.solana.disconnect();
//         console.log("🔌 Phantom disconnected");
//       }

//       if (chain === "solana") {
//         await connectToSolana();
//       } else if (chain === "bitcoin") {
//         const address = prompt(
//           "🪙 Enter your Bitcoin Testnet address (starts with m, n, or 2):"
//         );
//         if (
//           !address ||
//           !(
//             address.startsWith("m") ||
//             address.startsWith("n") ||
//             address.startsWith("2") ||
//             address.startsWith("tb1")
//           )
//         ) {
//           throw new Error("❌ Invalid Bitcoin Testnet address.");
//         }
//         setConnectionState("bitcoin", address);
//         localStorage.setItem("walletChain", "bitcoin");
//         localStorage.setItem("btcAddress", address);
//         toast.success("✅ Connected to Bitcoin Testnet");
//         await fetchBitcoinBalance(address);
//       } else {
//         await connectToEthereum(chain);
//       }

//       localStorage.setItem("walletChain", chain);
//     } catch (error) {
//       setSelectedChain("");
//       handleConnectionError(error, chain);
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   const connectToSolana = async () => {
//     if (!isPhantomAvailable()) throw new Error("Phantom wallet not installed.");
//     try {
//       const response = await window.solana.connect({ onlyIfTrusted: false });
//       const address = response.publicKey.toString();
//       setConnectionState("solana", address);
//       toast.success("✅ Connected to Solana via Phantom");
//     } catch (error) {
//       handleWalletError(error, "Phantom");
//     }
//   };

//   const connectToEthereum = async (chain) => {
//     const metamaskProvider = getMetaMaskProvider();
//     if (!metamaskProvider) throw new Error("MetaMask is not installed.");

//     try {
//       if (chain === "bsc") await switchToBSCNetwork(metamaskProvider);
//       if (chain === "ethereum") await switchToSepolia(metamaskProvider);

//       const provider = new ethers.providers.Web3Provider(metamaskProvider);
//       const accounts = await provider.listAccounts();

//       if (accounts.length === 0) {
//         const requested = await provider.send("eth_requestAccounts", []);
//         setConnectionState(chain, requested[0]);
//       } else {
//         setConnectionState(chain, accounts[0]);
//       }

//       toast.success(`✅ Connected to ${chain.toUpperCase()} via MetaMask`);
//     } catch (error) {
//       handleWalletError(error, "MetaMask");
//     }
//   };

//   const switchToBSCNetwork = async (provider) => {
//     try {
//       await provider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: networkConfigs.bsc.chainId }],
//       });
//     } catch (err) {
//       if (err.code === 4902) {
//         await provider.request({
//           method: "wallet_addEthereumChain",
//           params: [networkConfigs.bsc],
//         });
//       } else {
//         throw err;
//       }
//     }
//   };

//   const switchToSepolia = async (provider) => {
//     await provider.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: networkConfigs.sepolia.chainId }],
//     });
//   };

//   const handleWalletError = (error, wallet) => {
//     if (error.code === 4001 || error.message?.includes("User rejected")) {
//       throw new Error("❌ Connection cancelled by user");
//     } else if (error.code === -32002) {
//       throw new Error("⏳ Wallet connection already pending");
//     } else {
//       throw new Error(`${wallet} connection failed: ${error.message}`);
//     }
//   };

//   const handleConnectionError = (error, chain) => {
//     let msg = error.message;
//     if (msg.includes("not installed")) {
//       msg +=
//         chain === "solana"
//           ? "\n🔗 Install Phantom: https://phantom.app/"
//           : "\n🔗 Install MetaMask: https://metamask.io/";
//     }
//     toast.error(msg);
//   };

//   const setConnectionState = (chain, address) => {
//     setIsConnected(true);
//     setSelectedChain(chain);
//     setConnectedAddress(address);
//   };

//   const handleDisconnect = async () => {
//     try {
//       if (selectedChain === "solana" && isPhantomAvailable()) {
//         await window.solana.disconnect();
//       }
//     } finally {
//       setIsConnected(false);
//       setConnectedAddress("");
//       setSelectedChain("");
//       localStorage.removeItem("walletChain");
//       localStorage.removeItem("btcAddress");
//       toast.success("✅ Disconnected");
//     }
//   };

//   const truncateAddress = (address) =>
//     address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

//   return (
//     <>
//       <Toaster position="top-right" />
//       {/* Keep your existing nav UI here, just ensure dropdown includes bitcoin */}
//       <nav className="bg-black text-white py-6 px-6 md:px-10 flex justify-between items-center w-full z-50 relative">
//         {/* Logo */}
//         <div className="flex items-center gap-6">
//           <a href="/" className="flex items-center gap-2">
//             <img src="/logo.png" alt="Logo" width={160} />
//           </a>
//           <div className="hidden md:flex flex-col items-center gap-1 text-lime-400 font-semibold">
//             <img src="/podcast.png" alt="Podcast" width={50} />
//             <span className="text-sm">PODCAST</span>
//           </div>
//         </div>

//         {/* Desktop Nav */}
//         <ul className="hidden lg:flex gap-6 font-medium text-md">
//           {navLinks.map((link) => (
//             <li key={link}>
//               <a
//                 href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
//                 className="hover:text-lime-400 transition"
//               >
//                 {link}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Desktop Wallet Actions */}
//         <div className="hidden lg:flex items-center gap-4">
//           {!isConnected && (
//             <select
//               value={selectedChain}
//               onChange={handleChainChange}
//               disabled={isConnecting}
//               className="bg-black border border-lime-400 text-white px-4 py-2 rounded-full text-sm"
//             >
//               <option value="">🔗 Select Chain</option>
//               <option value="ethereum">🦊 Ethereum</option>
//               <option value="solana">🌞 Solana</option>
//               <option value="bsc">🟡 BSC</option>
//               <option value="bitcoin">₿ Bitcoin (Testnet)</option>
//             </select>
//           )}
//           {isConnected && (
//             <div className="flex items-center gap-2 bg-black border border-lime-400 px-4 py-2 rounded-full text-sm">
//               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//               <span className="text-lime-400 font-medium">
//                 {selectedChain.toUpperCase()}
//               </span>
//               <span className="text-white">|</span>
//               <span>{truncateAddress(connectedAddress)}</span>
//             </div>
//           )}
//           {isConnecting && (
//             <span className="text-lime-400 text-sm flex items-center gap-2">
//               <div className="w-3 h-3 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
//               Connecting...
//             </span>
//           )}
//           {isConnected ? (
//             <button
//               onClick={handleDisconnect}
//               className="border border-red-400 text-red-400 px-6 py-2 rounded-full hover:bg-red-400 hover:text-white transition font-semibold"
//             >
//               Disconnect
//             </button>
//           ) : (
//             <>
//               <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold">
//                 SignUp
//               </button>
//               <button className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold hover:bg-lime-400 transition">
//                 Login
//               </button>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <IoIosMenu size={36} color="#b0d357" />
//         </button>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="lg:hidden absolute top-full left-0 w-full z-50 shadow-md bg-white">
//             <ul className="flex flex-col items-center space-y-5 py-8 font-medium text-black text-2xl">
//               {navLinks.map((link) => (
//                 <li key={link} className="w-4/5">
//                   <a
//                     href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
//                     className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     {link}
//                   </a>
//                 </li>
//               ))}
//               <li className="w-4/5">
//                 <select
//                   value={selectedChain}
//                   onChange={handleChainChange}
//                   disabled={isConnecting || isConnected}
//                   className="w-full py-4 bg-black border border-lime-400 text-white rounded-full text-center focus:outline-none disabled:opacity-50"
//                 >
//                   <option value="">🔗 Select Chain</option>
//                   <option value="ethereum">🦊 Ethereum</option>
//                   <option value="solana">🌞 Solana</option>
//                   <option value="bsc">🟡 BSC</option>
//                 </select>
//               </li>
//               {isConnected && (
//                 <li className="w-4/5">
//                   <button
//                     onClick={() => {
//                       handleDisconnect();
//                       setMenuOpen(false);
//                     }}
//                     className="w-full py-4 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition"
//                   >
//                     Disconnect
//                   </button>
//                   <div className="mt-2 text-center text-sm text-gray-700 bg-gray-100 rounded-full py-2">
//                     <span className="text-lime-600 font-semibold">
//                       {selectedChain.toUpperCase()}
//                     </span>
//                     <span className="mx-2 text-gray-400">|</span>
//                     <span className="font-mono">
//                       {truncateAddress(connectedAddress)}
//                     </span>
//                   </div>
//                 </li>
//               )}
//             </ul>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// };

// export default Navbar;


// import { useEffect, useRef, useState } from "react";
// import { IoIosMenu } from "react-icons/io";
// import { Toaster, toast } from "react-hot-toast";
// import { ethers } from "ethers";

// const Navbar = ({
//   selectedChain,
//   setSelectedChain,
//   connectedAddress,
//   setConnectedAddress,
// }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);
//   const triedAutoConnectRef = useRef(false);

//   const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

//   const isPhantomAvailable = () =>
//     typeof window !== "undefined" && window.solana?.isPhantom;
//   const isMetaMaskAvailable = () =>
//     typeof window !== "undefined" && window.ethereum?.isMetaMask;

//   const isUnisatAvailable = () =>
//     typeof window !== "undefined" && window.unisat;

//   const networkConfigs = {
//     sepolia: {
//       chainId: "0xaa36a7",
//     },
//     bsc: {
//       chainId: "0x38",
//       chainName: "BNB Smart Chain",
//       nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
//       rpcUrls: ["https://bsc-dataseed1.binance.org/"],
//       blockExplorerUrls: ["https://bscscan.com/"],
//     },
//   };

//   const getMetaMaskProvider = () => {
//     if (window.ethereum?.isMetaMask && !window.ethereum.providers) {
//       return window.ethereum;
//     }
//     if (Array.isArray(window.ethereum?.providers)) {
//       return window.ethereum.providers.find((p) => p.isMetaMask);
//     }
//     return null;
//   };

//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.autoRefreshOnNetworkChange = false;
//     }

//     const autoConnect = async () => {
//       if (triedAutoConnectRef.current) return;
//       triedAutoConnectRef.current = true;

//       const chain = localStorage.getItem("walletChain");
//       if (!chain) return;

//       try {
//         if (chain === "solana" && isPhantomAvailable()) {
//           await connectToSolana();
//         } else if (
//           (chain === "ethereum" || chain === "bsc") &&
//           isMetaMaskAvailable()
//         ) {
//           await connectToEthereum(chain);
//         } else if (chain === "bitcoin" && isUnisatAvailable()) {
//           const accounts = await window.unisat.getAccounts();
//           const address = accounts[0];
//           setConnectionState("bitcoin", address);
//           localStorage.setItem("walletChain", "bitcoin");
//           toast.success("✅ Reconnected to Unisat");
//         }
//       } catch (e) {
//         console.warn("🔁 Auto-reconnect failed:", e.message);
//       }
//     };

//     autoConnect();
//   }, []);

//   const handleChainChange = async (e) => {
//     const chain = e.target.value;
//     if (!chain) return setSelectedChain("");

//     setIsConnecting(true);
//     try {
//       if (chain !== "solana" && window.solana?.isConnected) {
//         await window.solana.disconnect();
//       }

//       if (chain === "solana") {
//         await connectToSolana();
//       } else if (chain === "bitcoin") {
//         await connectToUnisat();
//       } else {
//         await connectToEthereum(chain);
//       }

//       localStorage.setItem("walletChain", chain);
//     } catch (error) {
//       setSelectedChain("");
//       toast.error(error.message);
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   const connectToSolana = async () => {
//     if (!isPhantomAvailable()) throw new Error("Phantom wallet not installed.");
//     const resp = await window.solana.connect();
//     setConnectionState("solana", resp.publicKey.toString());
//     toast.success("✅ Connected to Solana via Phantom");
//   };

//   const connectToEthereum = async (chain) => {
//     const metamaskProvider = getMetaMaskProvider();
//     if (!metamaskProvider) throw new Error("MetaMask not installed.");

//     if (chain === "bsc") await switchToBSCNetwork(metamaskProvider);
//     if (chain === "ethereum") await switchToSepolia(metamaskProvider);

//     const provider = new ethers.providers.Web3Provider(metamaskProvider);
//     const accounts = await provider.send("eth_requestAccounts", []);
//     setConnectionState(chain, accounts[0]);
//     toast.success(`✅ Connected to ${chain.toUpperCase()} via MetaMask`);
//   };

//   const connectToUnisat = async () => {
//     if (!isUnisatAvailable())
//       throw new Error("Unisat Wallet not installed. 🔗 https://unisat.io");

//     const accounts = await window.unisat.requestAccounts();
//     const address = accounts[0];
//     setConnectionState("bitcoin", address);
//     localStorage.setItem("btcAddress", address);
//     toast.success("✅ Connected to Bitcoin via Unisat");
//   };

//   const switchToBSCNetwork = async (provider) => {
//     try {
//       await provider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: networkConfigs.bsc.chainId }],
//       });
//     } catch (err) {
//       if (err.code === 4902) {
//         await provider.request({
//           method: "wallet_addEthereumChain",
//           params: [networkConfigs.bsc],
//         });
//       } else {
//         throw err;
//       }
//     }
//   };

//   const switchToSepolia = async (provider) => {
//     await provider.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: networkConfigs.sepolia.chainId }],
//     });
//   };

//   const setConnectionState = (chain, address) => {
//     setSelectedChain(chain);
//     setConnectedAddress(address);
//     setIsConnected(true);
//   };

//   const handleDisconnect = async () => {
//     try {
//       if (selectedChain === "solana" && window.solana?.isConnected) {
//         await window.solana.disconnect();
//       }
//     } finally {
//       setSelectedChain("");
//       setConnectedAddress("");
//       setIsConnected(false);
//       localStorage.removeItem("walletChain");
//       localStorage.removeItem("btcAddress");
//       toast.success("✅ Disconnected");
//     }
//   };

//   const truncateAddress = (address) =>
//     address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

//   return (
//     <>
//       <Toaster position="top-right" />
//       <nav className="bg-black text-white py-6 px-6 md:px-10 flex justify-between items-center w-full z-50 relative">
//         {/* Logo and Nav Links (same as yours) */}
//         <div className="flex items-center gap-6">
//           <a href="/" className="flex items-center gap-2">
//             <img src="/logo.png" alt="Logo" width={160} />
//           </a>
//           <div className="hidden md:flex flex-col items-center gap-1 text-lime-400 font-semibold">
//             <img src="/podcast.png" alt="Podcast" width={50} />
//             <span className="text-sm">PODCAST</span>
//           </div>
//         </div>

//         <ul className="hidden lg:flex gap-6 font-medium text-md">
//           {navLinks.map((link) => (
//             <li key={link}>
//               <a
//                 href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
//                 className="hover:text-lime-400 transition"
//               >
//                 {link}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Wallet Area */}
//         <div className="hidden lg:flex items-center gap-4">
//           {!isConnected && (
//             <select
//               value={selectedChain}
//               onChange={handleChainChange}
//               disabled={isConnecting}
//               className="bg-black border border-lime-400 text-white px-4 py-2 rounded-full text-sm"
//             >
//               <option value="">🔗 Select Chain</option>
//               <option value="ethereum">🦊 Ethereum</option>
//               <option value="solana">🌞 Solana</option>
//               <option value="bsc">🟡 BSC</option>
//               <option value="bitcoin">₿ Bitcoin (Unisat)</option>
//             </select>
//           )}
//           {isConnected && (
//             <div className="flex items-center gap-2 bg-black border border-lime-400 px-4 py-2 rounded-full text-sm">
//               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//               <span className="text-lime-400 font-medium">
//                 {selectedChain.toUpperCase()}
//               </span>
//               <span className="text-white">|</span>
//               <span>{truncateAddress(connectedAddress)}</span>
//             </div>
//           )}
//           {isConnecting && (
//             <span className="text-lime-400 text-sm flex items-center gap-2">
//               <div className="w-3 h-3 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
//               Connecting...
//             </span>
//           )}
//           {isConnected ? (
//             <button
//               onClick={handleDisconnect}
//               className="border border-red-400 text-red-400 px-6 py-2 rounded-full hover:bg-red-400 hover:text-white transition font-semibold"
//             >
//               Disconnect
//             </button>
//           ) : (
//             <>
//               <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold">
//                 SignUp
//               </button>
//               <button className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold hover:bg-lime-400 transition">
//                 Login
//               </button>
//             </>
//           )}
//         </div>

//         {/* Mobile Toggle Button */}
//         <button
//           className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <IoIosMenu size={36} color="#b0d357" />
//         </button>
//       </nav>
//     </>
//   );
// };

// export default Navbar;


import { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { Toaster, toast } from "react-hot-toast";
import { ethers } from "ethers";

const Navbar = ({
  selectedChain,
  setSelectedChain,
  connectedAddress,
  setConnectedAddress,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

  const isPhantomAvailable = () =>
    typeof window !== "undefined" && window.solana?.isPhantom;
  const isMetaMaskAvailable = () =>
    typeof window !== "undefined" && window.ethereum?.isMetaMask;
  const isUnisatAvailable = () =>
    typeof window !== "undefined" && window.unisat;

  const networkConfigs = {
    sepolia: {
      chainId: "0xaa36a7",
    },
    bsc: {
      chainId: "0x38",
      chainName: "BNB Smart Chain",
      nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
      rpcUrls: ["https://bsc-dataseed1.binance.org/"],
      blockExplorerUrls: ["https://bscscan.com/"],
    },
  };

  const getMetaMaskProvider = () => {
    if (window.ethereum?.isMetaMask && !window.ethereum.providers) {
      return window.ethereum;
    }
    if (Array.isArray(window.ethereum?.providers)) {
      return window.ethereum.providers.find((p) => p.isMetaMask);
    }
    return null;
  };

  useEffect(() => {
    // Reset wallet state on page load
    setSelectedChain("");
    setConnectedAddress("");
    setIsConnected(false);
    localStorage.removeItem("walletChain");
    localStorage.removeItem("btcAddress");

    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
  }, []);

  const handleChainChange = async (e) => {
    const chain = e.target.value;
    if (!chain) return setSelectedChain("");

    setIsConnecting(true);
    try {
      if (chain !== "solana" && window.solana?.isConnected) {
        await window.solana.disconnect();
      }

      if (chain === "solana") {
        await connectToSolana();
      } else if (chain === "bitcoin") {
        await connectToUnisat();
      } else {
        await connectToEthereum(chain);
      }

      localStorage.setItem("walletChain", chain);
    } catch (error) {
      setSelectedChain("");
      toast.error(error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const connectToSolana = async () => {
    if (!isPhantomAvailable()) throw new Error("Phantom wallet not installed.");
    const resp = await window.solana.connect();
    setConnectionState("solana", resp.publicKey.toString());
    toast.success("✅ Connected to Solana via Phantom");
  };

  const connectToEthereum = async (chain) => {
    const metamaskProvider = getMetaMaskProvider();
    if (!metamaskProvider) throw new Error("MetaMask not installed.");

    if (chain === "bsc") await switchToBSCNetwork(metamaskProvider);
    if (chain === "ethereum") await switchToSepolia(metamaskProvider);

    const provider = new ethers.providers.Web3Provider(metamaskProvider);
    const accounts = await provider.send("eth_requestAccounts", []);
    setConnectionState(chain, accounts[0]);
    toast.success(`✅ Connected to ${chain.toUpperCase()} via MetaMask`);
  };

  const connectToUnisat = async () => {
    if (!isUnisatAvailable())
      throw new Error("Unisat Wallet not installed. 🔗 https://unisat.io");

    const accounts = await window.unisat.requestAccounts();
    const address = accounts[0];
    setConnectionState("bitcoin", address);
    localStorage.setItem("btcAddress", address);
    toast.success("✅ Connected to Bitcoin via Unisat");
  };

  const switchToBSCNetwork = async (provider) => {
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: networkConfigs.bsc.chainId }],
      });
    } catch (err) {
      if (err.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [networkConfigs.bsc],
        });
      } else {
        throw err;
      }
    }
  };

  const switchToSepolia = async (provider) => {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: networkConfigs.sepolia.chainId }],
    });
  };

  const setConnectionState = (chain, address) => {
    setSelectedChain(chain);
    setConnectedAddress(address);
    setIsConnected(true);
  };

  const handleDisconnect = async () => {
    try {
      if (selectedChain === "solana" && window.solana?.isConnected) {
        await window.solana.disconnect();
      }
    } finally {
      setSelectedChain("");
      setConnectedAddress("");
      setIsConnected(false);
      localStorage.removeItem("walletChain");
      localStorage.removeItem("btcAddress");
      toast.success("✅ Disconnected");
    }
  };

  const truncateAddress = (address) =>
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  return (
    <>
      <Toaster position="top-right" />
      <nav className="bg-black text-white py-6 px-6 md:px-10 flex justify-between items-center w-full z-50 relative">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" width={160} />
          </a>
          <div className="hidden md:flex flex-col items-center gap-1 text-lime-400 font-semibold">
            <img src="/podcast.png" alt="Podcast" width={50} />
            <span className="text-sm">PODCAST</span>
          </div>
        </div>

        <ul className="hidden lg:flex gap-6 font-medium text-md">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
                className="hover:text-lime-400 transition"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          {!isConnected && (
            <select
              value={selectedChain}
              onChange={handleChainChange}
              disabled={isConnecting}
              className="bg-black border border-lime-400 text-white px-4 py-2 rounded-full text-sm"
            >
              <option value="">🔗 Select Chain</option>
              <option value="ethereum">🦊 Ethereum</option>
              <option value="solana">🌞 Solana</option>
              <option value="bsc">🟡 BSC</option>
              <option value="bitcoin">₿ Bitcoin (Unisat)</option>
            </select>
          )}
          {isConnected && (
            <div className="flex items-center gap-2 bg-black border border-lime-400 px-4 py-2 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-lime-400 font-medium">
                {selectedChain.toUpperCase()}
              </span>
              <span className="text-white">|</span>
              <span>{truncateAddress(connectedAddress)}</span>
            </div>
          )}
          {isConnecting && (
            <span className="text-lime-400 text-sm flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
              Connecting...
            </span>
          )}
          {isConnected ? (
            <button
              onClick={handleDisconnect}
              className="border border-red-400 text-red-400 px-6 py-2 rounded-full hover:bg-red-400 hover:text-white transition font-semibold"
            >
              Disconnect
            </button>
          ) : (
            <>
              <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold">
                SignUp
              </button>
              <button className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold hover:bg-lime-400 transition">
                Login
              </button>
            </>
          )}
        </div>

        <button
          className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <IoIosMenu size={36} color="#b0d357" />
        </button>
      </nav>
    </>
  );
};

export default Navbar;
