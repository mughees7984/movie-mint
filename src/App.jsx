// import { useState, useEffect } from "react";
// import "./App.css";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import LatestStories from "./components/LatestStories";
// import RecentProjects from "./components/RecentProjects";
// import UpcomingProjects from "./components/UpcomingProjects";
// import Faq from "./components/Faq";
// import Footer from "./components/Footer";
// // import GenerateBitcoinWallet from "./components/GenerateBitcoinWallet";

// function App() {
//   const [selectedChain, setSelectedChain] = useState("");
//   const [connectedAddress, setConnectedAddress] = useState("");

//   useEffect(() => {
//   if(window.ethereum){
//     window.ethereum.on('chainChanged', () => {
//       window.location.reload();
//     });
//   }
// }, []);

//   return (
//     <div className="w-[90%] mx-auto">
//       <Navbar
//         selectedChain={selectedChain}
//         setSelectedChain={setSelectedChain}
//         connectedAddress={connectedAddress}
//         setConnectedAddress={setConnectedAddress}
//       />
//       {/* <GenerateBitcoinWallet /> */}

//       <Hero
//         selectedChain={selectedChain}
//         // connectedAddress={connectedAddress}
//       />

//       <LatestStories />
//       <RecentProjects />
//       <UpcomingProjects />
//       <Faq />
//       <Footer />
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LatestStories from "./components/LatestStories";
import RecentProjects from "./components/RecentProjects";
import UpcomingProjects from "./components/UpcomingProjects";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

function App() {
  const [selectedChain, setSelectedChain] = useState("");
  const [connectedAddress, setConnectedAddress] = useState("");

  // ✅ Reset chain and address on refresh
  useEffect(() => {
    setSelectedChain("");
    setConnectedAddress("");
  }, []);

  // Optional: Reload on MetaMask chain change
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <div className="w-[90%] mx-auto">
      <Navbar
        selectedChain={selectedChain}
        setSelectedChain={setSelectedChain}
        connectedAddress={connectedAddress}
        setConnectedAddress={setConnectedAddress}
      />

      <Hero selectedChain={selectedChain} />

      <LatestStories />
      <RecentProjects />
      <UpcomingProjects />
      <Faq />
      <Footer />
    </div>
  );
}

export default App;
