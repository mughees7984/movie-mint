import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import LatestStories from "./components/LatestStories";
import RecentProjects from "./components/RecentProjects";
import Faq from "./components/Faq";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import UpcomingProjects from "./components/UpcomingProjects";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-[90%] mx-auto">
        <Navbar />
        <Hero/>
        <LatestStories />
        <RecentProjects/>
        <UpcomingProjects/>
        <Faq />
        <Footer />
      </div>
    </>
  );
}

export default App;
