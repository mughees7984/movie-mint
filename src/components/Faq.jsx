// import React, { useState } from 'react';
// import { ChevronDown } from 'lucide-react';

// const FAQ = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const faqs = [
//     {
//       id: 1,
//       question: "Will movies be prelaunched in the market?",
//       answer: "Yes, movies will be prelaunched in our marketplace. This allows early access to exclusive content and gives collectors the opportunity to secure rare NFTs before the official release. Pre-launch events often include special bonuses and limited edition collectibles."
//     },
//     {
//       id: 2,
//       question: "How do I purchase movie NFTs?",
//       answer: "You can purchase movie NFTs through our secure marketplace using cryptocurrency or credit card. Simply browse our collection, select your desired NFT, and complete the transaction. All purchases are recorded on the blockchain for authenticity and ownership verification."
//     },
//     {
//       id: 3,
//       question: "What makes MovieMint NFTs unique?",
//       answer: "MovieMint NFTs are unique because they're directly tied to actual movie productions and entertainment content. Each NFT includes exclusive behind-the-scenes content, director commentary, and special access to future releases. Our NFTs also provide utility beyond just ownership."
//     },
//     {
//       id: 4,
//       question: "Can I resell my movie NFTs?",
//       answer: "Absolutely! Our marketplace supports secondary sales, allowing you to resell your movie NFTs to other collectors. You retain full ownership rights and can list your NFTs at any price. The blockchain ensures secure and transparent transactions for all resales."
//     },
//     {
//       id: 5,
//       question: "What blockchain does MovieMint use?",
//       answer: "MovieMint operates on multiple blockchains including Ethereum and Polygon for optimal performance and lower gas fees. This multi-chain approach ensures faster transactions and broader accessibility while maintaining the highest security standards."
//     }
//   ];

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <section className="bg-black text-white py-16 px-4 md:px-8 lg:px-12">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-start gap-8 lg:gap-16">
//           {/* Left Side - Q&A Illustration */}
//           <div className="hidden lg:flex flex-col items-center justify-center w-80 h-80 relative">
//             {/* Main Q&A Bubbles */}
//             <div className="relative">
//               {/* Q Bubble */}
//               <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-lime-500 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12 opacity-90">
//                 <span className="text-black font-bold text-6xl">Q</span>
//               </div>
              
//               {/* A Bubble */}
//               <div className="w-40 h-40 bg-gradient-to-br from-lime-400 to-yellow-400 rounded-3xl flex items-center justify-center shadow-2xl transform -rotate-6">
//                 <span className="text-black font-bold text-7xl">A</span>
//               </div>
              
//               {/* Small decorative bubbles */}
//               <div className="absolute -bottom-4 -right-6 w-8 h-8 bg-lime-300 rounded-full opacity-70"></div>
//               <div className="absolute -bottom-8 -right-2 w-4 h-4 bg-green-300 rounded-full opacity-50"></div>
//               <div className="absolute -bottom-12 right-2 w-2 h-2 bg-lime-200 rounded-full opacity-40"></div>
//             </div>
            
//             {/* Floating particles */}
//             <div className="absolute top-16 right-8 w-3 h-3 bg-lime-400 rounded-full animate-pulse"></div>
//             <div className="absolute bottom-16 left-8 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
//             <div className="absolute top-32 left-16 w-1 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
//           </div>

//           {/* Right Side - FAQ Content */}
//           <div className="flex-1">
//             {/* Header */}
//             <div className="mb-12">
//               <h2 className="text-4xl md:text-5xl font-bold mb-4">
//                 <span className="text-lime-400">Frequently</span>{' '}
//                 <span className="text-white">Asked Questions</span>
//               </h2>
//               <div className="w-24 h-1 bg-gradient-to-r from-lime-400 to-green-400 rounded-full"></div>
//             </div>

//             {/* FAQ Items */}
//             <div className="space-y-4">
//               {faqs.map((faq, index) => (
//                 <div
//                   key={faq.id}
//                   className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-2xl border border-zinc-700 hover:border-lime-400/30 transition-all duration-300 overflow-hidden"
//                 >
//                   {/* Question */}
//                   <button
//                     onClick={() => toggleFAQ(index)}
//                     className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-zinc-800/50 transition-colors duration-200 group"
//                   >
//                     <div className="flex items-center gap-4">
//                       {/* Question Icon */}
//                       <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center shrink-0">
//                         <span className="text-black font-bold text-sm">?</span>
//                       </div>
                      
//                       {/* Question Text */}
//                       <h3 className="text-lg font-semibold text-white group-hover:text-lime-400 transition-colors duration-200">
//                         {faq.question}
//                       </h3>
//                     </div>
                    
//                     {/* Chevron Icon */}
//                     <ChevronDown 
//                       color='red-500'
//                       className={`w-6 h-6  transition-transform duration-300 bg-[#b0d357] px-4 py-4 text-black ${
//                         activeIndex === index ? 'rotate-180' : ''
//                       }`}
//                     />
//                   </button>

//                   {/* Answer */}
//                   <div className={`transition-all duration-300 overflow-hidden ${
//                     activeIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
//                   }`}>
//                     <div className="px-6 pl-18">
//                       <div className="bg-zinc-800/30 rounded-xl p-4 border-l-4 border-lime-400">
//                         <p className="text-gray-300 leading-relaxed">
//                           {faq.answer}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Bottom CTA */}
//             <div className="mt-12 text-center">
//               <p className="text-gray-400 mb-4">Still have questions?</p>
//               <button className="px-8 py-3 bg-gradient-to-r from-lime-400 to-green-400 text-black font-semibold rounded-full hover:from-lime-500 hover:to-green-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-lime-400/25">
//                 Contact Support
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQ;


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

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-start gap-12">
          {/* Left side - Q&A Icon */}
          {/* <div className="flex-shrink-0">
            <div className="relative">
             
              <div className="w-32 h-32 bg-gradient-to-br from-lime-500 to-lime-600 rounded-2xl flex items-center justify-center transform rotate-6 shadow-2xl">
                <span className="text-black text-6xl font-bold">Q</span>
              </div>
              <div className="w-28 h-28 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center absolute -bottom-6 -right-6 transform -rotate-12 shadow-xl">
                <span className="text-black text-5xl font-bold">A</span>
              </div>
            </div>
          </div> */}

        {/* Right side - FAQ Content */}
                  <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-bold mb-12">
                      <span className="text-lime-400">Frequently </span>{" "}
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
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors duration-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 bg-lime-400 rounded flex items-center justify-center flex-shrink-0">
                                <span className="text-black text-sm font-bold">?</span>
                              </div>
                              <span className="text-white text-lg">{item}</span>
                            </div>
                            <span className="bg-lime-400 ">
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

              {/* Bottom right watermark */}
      {/* <div className="absolute bottom-6 right-6 text-gray-600 text-sm">
        <div>Activate Windows</div>
        <div className="text-xs">Go to Settings to activate Windows.</div>
      </div> */}
    </div>
  );
}