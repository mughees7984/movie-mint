
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
