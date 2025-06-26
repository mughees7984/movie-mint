// import React, { useState } from "react";
// import { IoIosMenu } from "react-icons/io";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

//   return (
//     <nav className="text-white py-8 px-6 md:px-10 flex justify-between items-center w-full rounded-lg relative z-50">
//       {/* Left Section - Logo and Podcast */}
//       <div className="flex items-center gap-6">
//         {/* Logo */}
//         <a href="/" className="flex items-center gap-2">
//           <img
//             src="/logo.png"
//             alt="MovieMint Logo"
//             width={200}
//             height={200}
//             className="object-contain"
//           />
//         </a>

//         {/* Podcast */}
//         <div className="flex flex-col items-center gap-1 text-lime-400 font-semibold">
//           <img
//             src="/podcast.png"
//             alt="Podcast Icon"
//             width={60}
//             height={20}
//             className="object-contain"
//           />
//           <span className="text-sm">PODCAST</span>
//         </div>
//       </div>

//       {/* Center Nav Links - Desktop Only */}
//       <ul className="hidden lg:flex min-w-[400px] gap-6 font-medium text-md ml-2">
//         {navLinks.map((link) => (
//           <li key={link}>
//             <a
//               href="#"
//               className="cursor-pointer hover:text-lime-400 transition-colors"
//             >
//               {link}
//             </a>
//           </li>
//         ))}
//       </ul>

//       {/* Right Buttons - Desktop Only */}
//       <div className="hidden lg:flex gap-3 ml-4">

//         <button
//           type="button"
//           className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold hover:bg-lime-400 transition whitespace-nowrap"
//         >
//           Explore Projects
//         </button>

//         <button
//           type="button"
//           className="border border-white px-10 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold"
//         >
//           SignUp
//         </button>
//         <button
//           type="button"
//           className="bg-[#b0d357] text-black px-10 py-2 rounded-full font-semibold hover:bg-lime-400 transition"
//         >
//           Login
//         </button>
//       </div>

//       {/* Green Toggle Button - Mobile Only */}
//       <button
//         className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full "
//         onClick={() => setMenuOpen(!menuOpen)}
//         aria-label="Toggle Menu"
//       >
//         <IoIosMenu size={40} color="#b0d357" />
//       </button>

//       {/* Mobile Menu Dropdown */}
//       {/* {menuOpen && (
//         <div className="lg:hidden absolute top-full left-0 w-full bg-black text-white shadow-md py-6 animate-fade-in">
//           <ul className="flex flex-col items-center gap-4 font-medium text-lg">
//             {navLinks.map((link) => (
//               <li key={link} className="w-full text-center">
//                 <a
//                   href="#"
//                   className="block py-3 hover:text-lime-400 transition"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {link}
//                 </a>
//               </li>
//             ))}
//             <li className="w-full flex flex-col items-center gap-3 mt-4">
//               <button
//                 type="button"
//                 className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold w-4/5"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Explore Projects
//               </button>
//               <button
//                 type="button"
//                 className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold w-4/5"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 SignUp
//               </button>
//               <button
//                 type="button"
//                 className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold w-4/5"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </button>
//             </li>
//           </ul>
//         </div>
//       )} */}

//       {menuOpen && (
//         <div className="lg:hidden absolute top-full left-0 w-full z-50 shadow-lg animate-fade-in">
//           <ul className="flex flex-col items-center space-y-5 py-8 font-medium text-black text-2xl">
//             {/* Home */}
//             <li className="w-4/5 ">
//               <a
//                 href="#home"
//                 className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-medium"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Home
//               </a>
//             </li>
//             {/* Other menu links */}
//             <li className="w-4/5">
//               <a
//                 href="#overview"
//                 className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Overview
//               </a>
//             </li>
//             <li className="w-4/5">
//               <a
//                 href="#about"
//                 className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 About Us
//               </a>
//             </li>
//             <li className="w-4/5">
//               <a
//                 href="#market"
//                 className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Market
//               </a>
//             </li>
//             {/* Action Buttons */}
//             <li className="w-4/5">
//               <button
//                 type="button"
//                 className="w-full py-4 bg-black text-white border border-white rounded-full font-bold hover:bg-white hover:text-black transition"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Sign Up
//               </button>
//             </li>
//             <li className="w-4/5">
//               <button
//                 type="button"
//                 className="w-full py-4 bg-lime-400 text-black rounded-full font-semibold hover:bg-lime-300 transition"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";
// import { IoIosMenu } from "react-icons/io";
// import { ReownAppKit } from "@reown/appkit";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [selectedChain, setSelectedChain] = useState("");
//   const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

//   const handleChainConnect = async (chain) => {
//     setSelectedChain(chain);
//     const appkit = new ReownAppKit({
//       environment: "testnet",
//       chains: ["ethereum", "solana", "bsc"],
//     });

//     try {
//       if (chain === "solana") {
//         await appkit.connectWallet("phantom");
//       } else {
//         await appkit.connectWallet("metamask");
//       }
//       alert(`✅ Connected to ${chain}`);
//     } catch (error) {
//       console.error("Connection failed:", error);
//       alert("❌ Connection failed");
//     }
//   };

//   return (
//     <nav className="text-white py-8 px-6 md:px-10 flex justify-between items-center w-full rounded-lg relative z-50">
//       {/* Left Section - Logo and Podcast */}
//       <div className="flex items-center gap-6">
//         <a href="/" className="flex items-center gap-2">
//           <img src="/logo.png" alt="MovieMint Logo" width={200} height={200} className="object-contain" />
//         </a>
//         <div className="flex flex-col items-center gap-1 text-lime-400 font-semibold">
//           <img src="/podcast.png" alt="Podcast Icon" width={60} height={20} className="object-contain" />
//           <span className="text-sm">PODCAST</span>
//         </div>
//       </div>

//       {/* Center Nav Links - Desktop Only */}
//       <ul className="hidden lg:flex min-w-[400px] gap-6 font-medium text-md ml-2">
//         {navLinks.map((link) => (
//           <li key={link}>
//             <a href="#" className="cursor-pointer hover:text-lime-400 transition-colors">
//               {link}
//             </a>
//           </li>
//         ))}
//       </ul>

//       {/* Right Buttons - Desktop Only */}
//       <div className="hidden lg:flex gap-3 items-center ml-4">
//         {/* 🔽 Chain Dropdown */}
//         <select
//           className="bg-black border border-lime-400 text-white px-3 py-2 rounded-full text-sm focus:outline-none"
//           value={selectedChain}
//           onChange={(e) => handleChainConnect(e.target.value)}
//         >
//           <option value="">Select Chain</option>
//           <option value="ethereum">Ethereum</option>
//           <option value="solana">Solana</option>
//           <option value="bsc">BSC</option>
//         </select>

//         {/* Existing Buttons */}
//         <button type="button" className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold hover:bg-lime-400 transition whitespace-nowrap">
//           Explore Projects
//         </button>
//         <button type="button" className="border border-white px-10 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold">
//           SignUp
//         </button>
//         <button type="button" className="bg-[#b0d357] text-black px-10 py-2 rounded-full font-semibold hover:bg-lime-400 transition">
//           Login
//         </button>
//       </div>

//       {/* Green Toggle Button - Mobile Only */}
//       <button className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
//         <IoIosMenu size={40} color="#b0d357" />
//       </button>

//       {/* Mobile Menu Dropdown (no changes here) */}
//       {menuOpen && (
//         <div className="lg:hidden absolute top-full left-0 w-full z-50 shadow-lg animate-fade-in">
//           <ul className="flex flex-col items-center space-y-5 py-8 font-medium text-black text-2xl">
//             <li className="w-4/5">
//               <a href="#home" className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-medium" onClick={() => setMenuOpen(false)}>
//                 Home
//               </a>
//             </li>
//             <li className="w-4/5">
//               <a href="#overview" className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold" onClick={() => setMenuOpen(false)}>
//                 Overview
//               </a>
//             </li>
//             <li className="w-4/5">
//               <a href="#about" className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold" onClick={() => setMenuOpen(false)}>
//                 About Us
//               </a>
//             </li>
//             <li className="w-4/5">
//               <a href="#market" className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold" onClick={() => setMenuOpen(false)}>
//                 Market
//               </a>
//             </li>
//             <li className="w-4/5">
//               <button type="button" className="w-full py-4 bg-black text-white border border-white rounded-full font-bold hover:bg-white hover:text-black transition" onClick={() => setMenuOpen(false)}>
//                 Sign Up
//               </button>
//             </li>
//             <li className="w-4/5">
//               <button type="button" className="w-full py-4 bg-lime-400 text-black rounded-full font-semibold hover:bg-lime-300 transition" onClick={() => setMenuOpen(false)}>
//                 Login
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";
// import { IoIosMenu } from "react-icons/io";
// import { ReownAppKit } from "@reown/appkit";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [selectedChain, setSelectedChain] = useState("");

//   const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

//   const handleChainChange = async (e) => {
//     const chain = e.target.value;
//     setSelectedChain(chain);
//     console.log(`Selected chain: ${chain}`);
//     // Your connect logic can be added here
//     const appkit = new ReownAppKit({
//       environment: "testnet", // Change to 'mainnet' if you're going live
//       chains: ["ethereum", "solana", "bsc"],
//     });
//     try {
//       if (chain === "solana") {
//         await appkit.connectWallet("phantom");
//       } else {
//         await appkit.connectWallet("metamask");
//       }
//       alert(`✅ Connected to ${chain}`);
//     } catch (error) {
//       console.error("❌ Connection error:", error);
//       alert("❌ Connection failed");
//     }
//   };

//   return (
//     <nav className="text-white py-8 px-6 md:px-10 flex justify-between items-center w-full rounded-lg relative z-50">
//       {/* Left Section - Logo and Podcast */}
//       <div className="flex items-center gap-6">
//         <a href="/" className="flex items-center gap-2">
//           <img
//             src="/logo.png"
//             alt="MovieMint Logo"
//             width={200}
//             height={200}
//             className="object-contain"
//           />
//         </a>
//         <div className="flex flex-col items-center gap-1 text-lime-400 font-semibold">
//           <img
//             src="/podcast.png"
//             alt="Podcast Icon"
//             width={60}
//             height={20}
//             className="object-contain"
//           />
//           <span className="text-sm">PODCAST</span>
//         </div>
//       </div>

//       {/* Center Nav Links - Desktop Only */}
//       <ul className="hidden lg:flex min-w-[400px] gap-6 font-medium text-md ml-2">
//         {navLinks.map((link) => (
//           <li key={link}>
//             <a
//               href="#"
//               className="cursor-pointer hover:text-lime-400 transition-colors"
//             >
//               {link}
//             </a>
//           </li>
//         ))}
//       </ul>

//       {/* Right Section - Dropdown & Buttons */}
//       <div className="hidden lg:flex items-center gap-4 ml-4">
//         {/* Chain Dropdown */}
//         <select
//           value={selectedChain}
//           onChange={handleChainChange}
//           className="bg-black border border-lime-400 text-white px-4 py-2 rounded-full text-sm focus:outline-none"
//         >
//           <option value="">Select Chain</option>
//           <option value="ethereum">Ethereum</option>
//           <option value="solana">Solana</option>
//           <option value="bsc">BSC</option>
//         </select>

//         {/* Auth Buttons */}
//         <button
//           type="button"
//           className="border border-white px-10 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold"
//         >
//           SignUp
//         </button>
//         <button
//           type="button"
//           className="bg-[#b0d357] text-black px-10 py-2 rounded-full font-semibold hover:bg-lime-400 transition"
//         >
//           Login
//         </button>
//       </div>

//       {/* Mobile Toggle Button */}
//       <button
//         className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full"
//         onClick={() => setMenuOpen(!menuOpen)}
//         aria-label="Toggle Menu"
//       >
//         <IoIosMenu size={40} color="#b0d357" />
//       </button>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="lg:hidden absolute top-full left-0 w-full z-50 shadow-lg animate-fade-in">
//           <ul className="flex flex-col items-center space-y-5 py-8 font-medium text-black text-2xl">
//             {navLinks.map((link) => (
//               <li key={link} className="w-4/5">
//                 <a
//                   href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
//                   className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {link}
//                 </a>
//               </li>
//             ))}
//             <li className="w-4/5">
//               <button
//                 type="button"
//                 className="w-full py-4 bg-black text-white border border-white rounded-full font-bold hover:bg-white hover:text-black transition"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Sign Up
//               </button>
//             </li>
//             <li className="w-4/5">
//               <button
//                 type="button"
//                 className="w-full py-4 bg-lime-400 text-black rounded-full font-semibold hover:bg-lime-300 transition"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// import { useState, useEffect } from "react";
// import { IoIosMenu } from "react-icons/io";
// import { Toaster, toast } from "react-hot-toast";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [selectedChain, setSelectedChain] = useState("");
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);
//   const [connectedAddress, setConnectedAddress] = useState("");

//   const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

//   const isPhantomAvailable = () => typeof window !== 'undefined' && window.solana?.isPhantom;
//   const isMetaMaskAvailable = () => typeof window !== 'undefined' && window.ethereum?.isMetaMask;

//   useEffect(() => {
//     const checkWallets = setTimeout(() => {
//       console.log("Phantom available:", isPhantomAvailable());
//       console.log("MetaMask available:", isMetaMaskAvailable());
//     }, 1000);
//     return () => clearTimeout(checkWallets);
//   }, []);

//   const handleChainChange = async (e) => {
//     const chain = e.target.value;
//     if (!chain) return setSelectedChain("");

//     setIsConnecting(true);
//     try {
//       chain === "solana" ? await connectToSolana() : await connectToEthereum(chain);
//     } catch (error) {
//       console.error("Connection error:", error);
//       setSelectedChain("");
//       handleConnectionError(error, chain);
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   const connectToSolana = async () => {
//     if (!isPhantomAvailable()) throw new Error("Phantom wallet is not installed.");

//     try {
//       if (window.solana.isConnected) {
//         const address = window.solana.publicKey.toString();
//         setConnectionState("solana", address);
//         toast.success("✅ Already connected to Solana via Phantom");
//         return;
//       }

//       const response = await window.solana.connect({ onlyIfTrusted: false });
//       const address = response.publicKey.toString();
//       setConnectionState("solana", address);
//       toast.success("✅ Connected to Solana via Phantom");
//     } catch (error) {
//       handleSpecificWalletError(error, "Phantom");
//     }
//   };

//   const connectToEthereum = async (chain) => {
//     if (!isMetaMaskAvailable()) throw new Error("MetaMask is not installed.");

//     try {
//       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//       if (!accounts?.length) throw new Error("No accounts found.");
//       setConnectionState(chain, accounts[0]);
//       toast.success(`✅ Connected to ${chain.toUpperCase()} via MetaMask`);
//     } catch (error) {
//       handleSpecificWalletError(error, "MetaMask");
//     }
//   };

//   const setConnectionState = (chain, address) => {
//     setIsConnected(true);
//     setSelectedChain(chain);
//     setConnectedAddress(address);
//   };

//   const handleSpecificWalletError = (error, walletName) => {
//     if (error.code === 4001 || error.message.includes("User rejected")) {
//       throw new Error("❌ Connection cancelled by user");
//     } else if (error.code === -32002) {
//       throw new Error("⏳ Connection request already pending");
//     } else {
//       throw new Error(`${walletName} connection failed: ${error.message}`);
//     }
//   };

//   const handleConnectionError = (error, chain) => {
//     let msg = error.message;
//     if (msg.includes("not installed")) {
//       msg += chain === "solana" ? "\n🔗 Get Phantom: https://phantom.app/" : "\n🔗 Get MetaMask: https://metamask.io/";
//     }
//     toast.error(msg);
//   };

//   const handleDisconnect = async () => {
//     try {
//       if (selectedChain === "solana" && isPhantomAvailable()) {
//         await window.solana.disconnect();
//       }
//       setIsConnected(false);
//       setConnectedAddress("");
//       setSelectedChain("");
//       toast.success("✅ Disconnected successfully");
//     } catch (error) {
//       console.error("Disconnect error:", error);
//       setIsConnected(false);
//       setConnectedAddress("");
//       setSelectedChain("");
//       toast.success("✅ Forced disconnect");
//     }
//   };

//   const truncateAddress = (address) =>
//     address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

//   return (
//     <>
//       <Toaster position="top-right" />
//       <nav className="text-white py-8 px-6 md:px-10 flex justify-between items-center w-full rounded-lg relative z-50">
//         <div className="flex items-center gap-6">
//           <a href="/" className="flex items-center gap-2">
//             <img src="/logo.png" alt="Logo" width={200} height={200} className="object-contain" />
//           </a>
//           <div className="flex flex-col items-center gap-1 text-lime-400 font-semibold">
//             <img src="/podcast.png" alt="Podcast Icon" width={60} height={20} className="object-contain" />
//             <span className="text-sm">PODCAST</span>
//           </div>
//         </div>

//         <ul className="hidden lg:flex min-w-[400px] gap-6 font-medium text-md ml-2">
//           {navLinks.map((link) => (
//             <li key={link}>
//               <a href="#" className="cursor-pointer hover:text-lime-400 transition-colors">
//                 {link}
//               </a>
//             </li>
//           ))}
//         </ul>

//         <div className="hidden lg:flex items-center gap-4 ml-4">
//           {!isConnected && (
//             <select
//               value={selectedChain}
//               onChange={handleChainChange}
//               disabled={isConnecting}
//               className="bg-black border border-lime-400 text-white px-6 py-2 rounded-full text-sm pr-10"
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
//               <span className="text-white">{truncateAddress(connectedAddress)}</span>
//             </div>
//           )}

//           {isConnecting && (
//             <div className="flex items-center gap-2 text-lime-400 text-sm">
//               <div className="w-3 h-3 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
//               Connecting...
//             </div>
//           )}

//           {isConnected ? (
//             <button
//               type="button"
//               onClick={handleDisconnect}
//               className="border border-red-400 text-red-400 px-6 py-2 rounded-full hover:bg-red-400 hover:text-white transition font-semibold"
//             >
//               Disconnect
//             </button>
//           ) : (
//             <>
//               <button className="border border-white px-10 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold">
//                 SignUp
//               </button>
//               <button className="bg-[#b0d357] text-black px-10 py-2 rounded-full font-semibold hover:bg-lime-400 transition">
//                 Login
//               </button>
//             </>
//           )}
//         </div>

//         <button
//           className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle Menu"
//         >
//           <IoIosMenu size={40} color="#b0d357" />
//         </button>
//       </nav>
//     </>
//   );
// };

// export default Navbar;


// import { useState, useEffect } from "react";
// import { IoIosMenu } from "react-icons/io";
// import { Toaster, toast } from "react-hot-toast";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [selectedChain, setSelectedChain] = useState("");
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);
//   const [connectedAddress, setConnectedAddress] = useState("");

//   const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

//   const isPhantomAvailable = () =>
//     typeof window !== "undefined" && window.solana?.isPhantom;
//   const isMetaMaskAvailable = () =>
//     typeof window !== "undefined" && window.ethereum?.isMetaMask;

//   useEffect(() => {
//     const checkWallets = setTimeout(() => {
//       console.log("Phantom available:", isPhantomAvailable());
//       console.log("MetaMask available:", isMetaMaskAvailable());
//     }, 1000);
//     return () => clearTimeout(checkWallets);
//   }, []);

//   const handleChainChange = async (e) => {
//     const chain = e.target.value;
//     if (!chain) return setSelectedChain("");

//     setIsConnecting(true);
//     try {
//       chain === "solana"
//         ? await connectToSolana()
//         : await connectToEthereum(chain);
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
//     if (!isMetaMaskAvailable()) throw new Error("MetaMask is not installed.");

//     try {
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setConnectionState(chain, accounts[0]);
//       toast.success(`✅ Connected to ${chain.toUpperCase()} via MetaMask`);
//     } catch (error) {
//       handleWalletError(error, "MetaMask");
//     }
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

//   const setConnectionState = (chain, address) => {
//     setIsConnected(true);
//     setSelectedChain(chain);
//     setConnectedAddress(address);
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

//   const handleDisconnect = async () => {
//     try {
//       if (selectedChain === "solana" && isPhantomAvailable()) {
//         await window.solana.disconnect();
//       }
//       setIsConnected(false);
//       setConnectedAddress("");
//       setSelectedChain("");
//       toast.success("✅ Disconnected");
//     } catch (error) {
//       setIsConnected(false);
//       setConnectedAddress("");
//       setSelectedChain("");
//       toast.success("✅ Forced disconnect");
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
//           <div className="hidden md:flex flex-col items-center gap-1 text-lime-400 font-semibold">
//             <img src="/podcast.png" alt="Podcast" width={50} />
//             <span className="text-sm">PODCAST</span>
//           </div>
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

//         {/* Right Side Buttons */}
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

//         {/* Mobile Menu Toggle */}
//         <button
//           className="lg:hidden"
//           onClick={() => setMenuOpen((prev) => !prev)}
//         >
//           <IoIosMenu size={36} color="#b0d357" />
//         </button>
//       </nav>

//       {/* Mobile Menu Panel */}
//        {menuOpen && (
//         <div className="lg:hidden absolute top-full left-0 w-full z-50 shadow-lg animate-fade-in">
//           <ul className="flex flex-col items-center space-y-5 py-8 font-medium text-black text-2xl">
//             {navLinks.map((link) => (
//               <li key={link} className="w-4/5">
//                 <a
//                   href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
//                   className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {link}
//                 </a>
//               </li>
//             ))}
            
//             {/* Mobile Chain Selection */}
//             <li className="w-4/5">
//               <select
//                 value={selectedChain}
//                 onChange={handleChainChange}
//                 disabled={isConnecting}
//                 className="w-full py-4 bg-black border border-lime-400 text-white rounded-full text-center focus:outline-none disabled:opacity-50"
//               >
//                 <option value="">Select Chain</option>
//                 <option value="ethereum">Ethereum</option>
//                 <option value="solana">Solana</option>
//                 <option value="bsc">BSC</option>
//               </select>
//             </li>
            
//             <li className="w-4/5">
//               <button
//                 type="button"
//                 className="w-full py-4 bg-black text-white border border-white rounded-full font-bold hover:bg-white hover:text-black transition"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Sign Up
//               </button>
//             </li>
//             <li className="w-4/5">
//               <button
//                 type="button"
//                 className="w-full py-4 bg-lime-400 text-black rounded-full font-semibold hover:bg-lime-300 transition"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;


import { useState, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import { Toaster, toast } from "react-hot-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState("");

  const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

  const isPhantomAvailable = () =>
    typeof window !== "undefined" && window.solana?.isPhantom;
  const isMetaMaskAvailable = () =>
    typeof window !== "undefined" && window.ethereum?.isMetaMask;

  useEffect(() => {
    const checkWallets = setTimeout(() => {
      console.log("Phantom available:", isPhantomAvailable());
      console.log("MetaMask available:", isMetaMaskAvailable());
    }, 1000);
    return () => clearTimeout(checkWallets);
  }, []);

  const handleChainChange = async (e) => {
    const chain = e.target.value;
    if (!chain) return setSelectedChain("");

    setIsConnecting(true);
    try {
      chain === "solana"
        ? await connectToSolana()
        : await connectToEthereum(chain);
    } catch (error) {
      console.error("Connection error:", error);
      setSelectedChain("");
      handleConnectionError(error, chain);
    } finally {
      setIsConnecting(false);
    }
  };

  const connectToSolana = async () => {
    if (!isPhantomAvailable()) throw new Error("Phantom wallet not installed.");

    try {
      const response = await window.solana.connect({ onlyIfTrusted: false });
      const address = response.publicKey.toString();
      setConnectionState("solana", address);
      toast.success("✅ Connected to Solana via Phantom");
    } catch (error) {
      handleWalletError(error, "Phantom");
    }
  };

  const connectToEthereum = async (chain) => {
    if (!isMetaMaskAvailable()) throw new Error("MetaMask is not installed.");

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setConnectionState(chain, accounts[0]);
      toast.success(`✅ Connected to ${chain.toUpperCase()} via MetaMask`);
    } catch (error) {
      handleWalletError(error, "MetaMask");
    }
  };

  const handleWalletError = (error, wallet) => {
    if (error.code === 4001 || error.message?.includes("User rejected")) {
      throw new Error("❌ Connection cancelled by user");
    } else if (error.code === -32002) {
      throw new Error("⏳ Wallet connection already pending");
    } else {
      throw new Error(`${wallet} connection failed: ${error.message}`);
    }
  };

  const setConnectionState = (chain, address) => {
    setIsConnected(true);
    setSelectedChain(chain);
    setConnectedAddress(address);
  };

  const handleConnectionError = (error, chain) => {
    let msg = error.message;
    if (msg.includes("not installed")) {
      msg +=
        chain === "solana"
          ? "\n🔗 Install Phantom: https://phantom.app/"
          : "\n🔗 Install MetaMask: https://metamask.io/";
    }
    toast.error(msg);
  };

  const handleDisconnect = async () => {
    try {
      if (selectedChain === "solana" && isPhantomAvailable()) {
        await window.solana.disconnect();
      }
      setIsConnected(false);
      setConnectedAddress("");
      setSelectedChain("");
      toast.success("✅ Disconnected");
    } catch (error) {
      setIsConnected(false);
      setConnectedAddress("");
      setSelectedChain("");
      toast.success("✅ Forced disconnect");
    }
  };

  const truncateAddress = (address) =>
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  return (
    <>
      <Toaster position="top-right" />
      <nav className="bg-black text-white py-6 px-6 md:px-10 flex justify-between items-center w-full z-50 relative">
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" width={160} />
          </a>
          <div className="hidden md:flex flex-col items-center gap-1 text-lime-400 font-semibold">
            <img src="/podcast.png" alt="Podcast" width={50} />
            <span className="text-sm">PODCAST</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
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

        {/* Right Side Desktop Buttons */}
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

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <IoIosMenu size={36} color="#b0d357" />
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full z-50 shadow-md">
            <ul className="flex flex-col items-center space-y-5 py-8 font-medium text-black text-2xl">
              {navLinks.map((link) => (
                <li key={link} className="w-4/5">
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
                    className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                  </a>
                </li>
              ))}

            {/* Mobile Chain Selector */}
            <li className="w-4/5">
                <select
                    value={selectedChain}
                    onChange={handleChainChange}
                    disabled={isConnecting || isConnected}
                    className="w-full py-4 bg-black border border-lime-400 text-white rounded-full text-center focus:outline-none disabled:opacity-50"
                >
                    <option value="">🔗 Select Chain</option>
                    <option value="ethereum">🦊 Ethereum</option>
                    <option value="solana">🌞 Solana</option>
                    <option value="bsc">🟡 BSC</option>
                </select>
            </li>

            {isConnecting && (
                <li className="w-4/5 flex justify-center">
                    <span className="flex items-center gap-2 text-lime-400 text-lg">
                        <div className="w-4 h-4 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
                        Connecting...
                    </span>
                </li>
            )}

            {!isConnected && !isConnecting && (
                <>
                    <li className="w-4/5">
                        <button
                            type="button"
                            className="w-full py-4 bg-black text-white border border-white rounded-full font-bold hover:bg-white hover:text-black transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            Sign Up
                        </button>
                    </li>
                    <li className="w-4/5">
                        <button
                            type="button"
                            className="w-full py-4 bg-lime-400 text-black rounded-full font-semibold hover:bg-lime-300 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            Login
                        </button>
                    </li>
                </>
            )}

            {isConnected && (
                <li className="w-4/5">
                    <button
                        type="button"
                        onClick={() => {
                            handleDisconnect();
                            setMenuOpen(false);
                        }}
                        className="w-full py-4 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition"
                    >
                        Disconnect
                    </button>
                    <div className="mt-2 text-center text-sm text-gray-700 bg-gray-100 rounded-full py-2">
                        <span className="text-lime-600 font-semibold">{selectedChain.toUpperCase()}</span>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="font-mono">{truncateAddress(connectedAddress)}</span>
                    </div>
                </li>
            )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
