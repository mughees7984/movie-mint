import React from "react";

const stories = [
  {
    id: 1,
    title: "The Rise of Digital Art",
    description: "NFTs are reshaping how art is consumed and traded in the digital age.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Hollywood Enters NFTs",
    description: "Movies and collectibles are being tokenized like never before.",
    image:
      "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Streaming Meets Blockchain",
    description: "Decentralized media platforms are on the rise globally.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
];

const LatestStories = () => {
return (
    <section className="bg-black text-white py-12 px-4 md:px-10">
        {/* Header */}
        <div className="flex mb-4 relative ">
            <button className="px-4 py-1 rounded-full border border-lime-400 text-sm font-bold text-lime-400 tracking-wide">
                LATEST<span className="text-white"> STORIES</span>
            </button>
            <div className="h-[2px] bg-lime-400 w-[150px] mt-4" />
        </div>

        {/* Divider Line */}
        <hr className="border-white mb-8 mt-10" />

        {/* Card Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
                <div
                    key={story.id}
                    className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition-transform duration-300 group border border-zinc-800"
                >
                    <div className="relative">
                        <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-black/60 rounded-full px-3 py-1 text-xs text-lime-400 font-semibold shadow">
                            #{story.id}
                        </div>
                    </div>
                    <div className="p-5 flex flex-col h-full">
                        <h3 className="text-xl font-bold text-lime-400 mb-2 group-hover:underline">
                            {story.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">{story.description}</p>
                        <button className="mt-auto self-start px-4 py-1 rounded-full bg-lime-400 text-black font-semibold text-xs hover:bg-lime-500 transition-colors duration-200 shadow">
                            Read More
                        </button>
                    </div>
                </div>
            ))}
        </div>

        <hr className="border-white mb-8 mt-10" />
    </section>
);
};

export default LatestStories;
