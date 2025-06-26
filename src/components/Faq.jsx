
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqItems = [
    "Will movies be preLaunched in the market",
    "Will movies be preLaunched in the market", 
    "Will movies be preLaunched in the market"
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-gray-700 rotate-12"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 border border-gray-700 -rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-gray-700 rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
          {/* Right side - FAQ Content */}
          <div className="flex-1 w-full lg:flex lg:justify-center">
            <div className="w-full lg:max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-12 text-center">
                <span className="text-lime-400">Frequently </span>
                <span className="text-white">Asked Questions</span>
              </h1>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/30 backdrop-blur-sm"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-4 sm:px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors duration-200 relative"
                    >
                      <div className="flex items-center gap-3 pr-16">
                        <div className="w-6 h-6 bg-lime-400 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-black text-sm font-bold">?</span>
                        </div>
                        <span className="text-white text-base sm:text-lg">{item}</span>
                      </div>
                      <span className="absolute right-4 sm:right-0 bottom-4 sm:bottom-0 bg-[#b0d357] w-12 h-12 sm:w-14 sm:h-20 rounded-lg flex items-center justify-center">
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            openItem === index ? "rotate-180" : ""
                          }`}
                          color="black"
                        />
                      </span>
                    </button>

                    {openItem === index && (
                      <div className="px-6 pb-4 text-gray-300 animate-in slide-in-from-top duration-200">
                        <div className="pl-9">
                          This is the answer content for the FAQ item. You can add your actual answer content here.
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
