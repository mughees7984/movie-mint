import { useState, useEffect } from "react";
import { IoIosMenu, IoSend } from "react-icons/io";
import { Toaster, toast } from "react-hot-toast";

const TransferComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState("");
  
  // Transfer form states
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);

  const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

  const isPhantomAvailable = () =>
    typeof window !== "undefined" && window.solana?.isPhantom;
  const isMetaMaskAvailable = () =>
    typeof window !== "undefined" && window.ethereum?.isMetaMask;

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

  useEffect(() => {
    const checkWallets = setTimeout(() => {
      console.log("Phantom available:", isPhantomAvailable());
      console.log("MetaMask available:", isMetaMaskAvailable());
    }, 1000);
    return () => clearTimeout(checkWallets);
  }, []);

  const getMetaMaskProvider = () => {
    if (window.ethereum?.isMetaMask && !window.ethereum.providers) {
      return window.ethereum;
    } else if (window.ethereum?.providers) {
      return window.ethereum.providers.find((p) => p.isMetaMask);
    }
    return null;
  };

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
    const provider = getMetaMaskProvider();
    console.log("MetaMask provider:", provider);
    if (!provider) throw new Error("MetaMask is not installed.");

    try {
      if (chain === "bsc") await switchToBSCNetwork(provider);
      if (chain === "ethereum") await switchToSepolia(provider);

      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      setConnectionState(chain, accounts[0]);
      toast.success(`✅ Connected to ${chain.toUpperCase()} via MetaMask`);
    } catch (error) {
      handleWalletError(error, "MetaMask");
    }
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

  const handleWalletError = (error, wallet) => {
    if (error.code === 4001 || error.message?.includes("User rejected")) {
      throw new Error("❌ Connection cancelled by user");
    } else if (error.code === -32002) {
      throw new Error("⏳ Wallet connection already pending");
    } else {
      throw new Error(`${wallet} connection failed: ${error.message}`);
    }
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

  const setConnectionState = (chain, address) => {
    setIsConnected(true);
    setSelectedChain(chain);
    setConnectedAddress(address);
  };

  const handleDisconnect = async () => {
    try {
      if (selectedChain === "solana" && isPhantomAvailable()) {
        await window.solana.disconnect();
      }
    } finally {
      setIsConnected(false);
      setConnectedAddress("");
      setSelectedChain("");
      setRecipientAddress("");
      setAmount("");
      toast.success("✅ Disconnected");
    }
  };

  const truncateAddress = (address) =>
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  // Transfer Functions
  const validateTransferForm = () => {
    if (!recipientAddress.trim()) {
      toast.error("❌ Please enter recipient address");
      return false;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("❌ Please enter a valid amount");
      return false;
    }
    if (!isConnected) {
      toast.error("❌ Please connect your wallet first");
      return false;
    }
    return true;
  };

  const transferSolana = async () => {
    try {
      const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } = await import('@solana/web3.js');
      
      // Connect to Solana network
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      
      // Get the sender's public key
      const fromPubkey = window.solana.publicKey;
      const toPubkey = new PublicKey(recipientAddress);
      
      // Convert SOL to lamports
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;
      
      // Create transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports,
        })
      );
      
      // Get recent blockhash
      transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
      transaction.feePayer = fromPubkey;
      
      // Sign and send transaction
      const signed = await window.solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());
      
      toast.success(`✅ Transfer successful! Signature: ${signature.slice(0, 8)}...`);
      setRecipientAddress("");
      setAmount("");
      
    } catch (error) {
      console.error("Solana transfer error:", error);
      toast.error(`❌ Transfer failed: ${error.message}`);
    }
  };

  const transferEthereum = async () => {
    try {
      const provider = getMetaMaskProvider();
      
      // Convert amount to wei
      const amountWei = (parseFloat(amount) * Math.pow(10, 18)).toString(16);
      
      const transactionParameters = {
        to: recipientAddress,
        from: connectedAddress,
        value: '0x' + amountWei,
        gas: '0x5208', // 21000 gas limit for simple transfer
      };
      
      const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      
      toast.success(`✅ Transfer successful! Tx Hash: ${txHash.slice(0, 10)}...`);
      setRecipientAddress("");
      setAmount("");
      
    } catch (error) {
      console.error("Ethereum transfer error:", error);
      toast.error(`❌ Transfer failed: ${error.message}`);
    }
  };

  const handleTransfer = async () => {
    if (!validateTransferForm()) return;
    
    setIsTransferring(true);
    try {
      if (selectedChain === "solana") {
        await transferSolana();
      } else if (selectedChain === "ethereum" || selectedChain === "bsc") {
        await transferEthereum();
      }
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error(`❌ Transfer failed: ${error.message}`);
    } finally {
      setIsTransferring(false);
    }
  };

  const getCurrencySymbol = () => {
    switch (selectedChain) {
      case "solana": return "SOL";
      case "ethereum": return "ETH";
      case "bsc": return "BNB";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster position="top-right" />
      
      {/* Navbar */}
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
                      className="w-full py-4 bg-black text-white border border-white rounded-full font-bold hover:bg-white hover:text-black transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign Up
                    </button>
                  </li>
                  <li className="w-4/5">
                    <button
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
                    <span className="text-lime-600 font-semibold">
                      {selectedChain.toUpperCase()}
                    </span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="font-mono">
                      {truncateAddress(connectedAddress)}
                    </span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* Transfer Section */}
      {isConnected && (
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-md mx-auto bg-gray-900 rounded-2xl p-8 border border-lime-400">
            <h2 className="text-2xl font-bold text-center mb-6 text-lime-400">
              Send {getCurrencySymbol()}
            </h2>
            
            <div className="mb-4 p-4 bg-black rounded-lg border border-gray-700">
              <div className="text-center">
                <div className="text-sm text-gray-400">Connected to</div>
                <div className="text-lime-400 font-semibold text-lg">
                  {selectedChain.toUpperCase()}
                </div>
                <div className="text-sm text-gray-300 font-mono">
                  {truncateAddress(connectedAddress)}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder={`Enter ${selectedChain === 'solana' ? 'Solana' : 'Ethereum'} address`}
                  className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-lime-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount ({getCurrencySymbol()})
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Enter amount in ${getCurrencySymbol()}`}
                  step="0.001"
                  min="0"
                  className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-lime-400 focus:outline-none"
                />
              </div>

              <button
                onClick={handleTransfer}
                disabled={isTransferring || !recipientAddress || !amount}
                className="w-full bg-lime-400 text-black py-3 px-6 rounded-lg font-semibold hover:bg-lime-300 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isTransferring ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <IoSend />
                    Send {getCurrencySymbol()}
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 p-4 bg-yellow-900 bg-opacity-20 border border-yellow-600 rounded-lg">
              <div className="text-yellow-400 text-sm">
                <strong>⚠️ Important:</strong>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• Double-check the recipient address</li>
                  <li>• Transactions are irreversible</li>
                  <li>• Network fees will apply</li>
                  {selectedChain === "solana" && <li>• Using Devnet for testing</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isConnected && (
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-md mx-auto text-center p-8">
            <h2 className="text-2xl font-bold mb-4 text-lime-400">
              Connect Your Wallet
            </h2>
            <p className="text-gray-400 mb-6">
              Connect your wallet to start sending crypto transfers
            </p>
            <div className="text-6xl mb-4">🔗</div>
            <p className="text-sm text-gray-500">
              Use the "Select Chain" dropdown above to connect
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferComponent;