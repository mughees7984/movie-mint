import React from 'react'

const RecentProjects = () => {
  const projects = [
    {
      id: 1,
      title: "NFT Portfolio Showcase",
      subtitle: "Showcasing digital assets in a sleek modern layout.",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=800&q=80",
      category: "Portfolio",
      status: "Live"
    },
    {
      id: 2,
      title: "Metaverse Event Platform",
      subtitle: "Hosting virtual events in 3D worlds.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
      category: "Platform",
      status: "Beta"
    },
    {
      id: 3,
      title: "Blockchain Game Hub",
      subtitle: "A decentralized game launchpad & NFT reward system.",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      category: "Gaming",
      status: "Development"
    },
  ];

  return (
    <section className="bg-black text-white py-12 px-4 md:px-10">
      {/* Header */}
      <div className="flex mb-4 relative">
        <button className="px-4 py-1 rounded-full border border-lime-400 text-sm font-bold text-lime-400 tracking-wide">
          RECENT<span className="text-white"> PROJECTS</span>
        </button>
        <div className="h-[2px] bg-lime-400 w-[150px] mt-4" />
      </div>

      {/* Divider Line */}
      <hr className="border-white mb-8 mt-10" />

      {/* Enhanced Card Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 rounded-2xl overflow-hidden shadow-2xl hover:shadow-lime-400/20 transition-all duration-500 border border-zinc-700 hover:border-lime-400/30"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Image Container */}
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <div className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border ${
                  project.status === 'Live' ? 'bg-green-500/20 text-green-400 border-green-400/30' :
                  project.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30' :
                  'bg-blue-500/20 text-blue-400 border-blue-400/30'
                }`}>
                  {project.status}
                </div>
              </div>

              {/* Project Number */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center border border-lime-400/30">
                <span className="text-lime-400 font-bold text-sm">#{project.id}</span>
              </div>

              {/* Category Tag */}
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-lime-400/20 backdrop-blur-sm rounded-lg border border-lime-400/30">
                <span className="text-lime-400 text-xs font-semibold">{project.category}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 relative">
              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lime-400 transition-colors duration-300 leading-tight">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {project.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <button className="px-6 py-2 bg-gradient-to-r from-lime-400 to-green-400 text-black font-semibold text-sm rounded-full hover:from-lime-500 hover:to-green-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-lime-400/25">
                  View Project
                </button>

                <div className="flex items-center space-x-3">
                  {/* Like Button */}
                  <button className="w-9 h-9 rounded-full border border-zinc-600 hover:border-lime-400 flex items-center justify-center group/btn transition-all duration-300 hover:bg-lime-400/10">
                    <svg className="w-4 h-4 text-zinc-400 group-hover/btn:text-lime-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {/* Share Button */}
                  <button className="w-9 h-9 rounded-full border border-zinc-600 hover:border-lime-400 flex items-center justify-center group/btn transition-all duration-300 hover:bg-lime-400/10">
                    <svg className="w-4 h-4 text-zinc-400 group-hover/btn:text-lime-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-lime-400 via-green-400 to-lime-400 bg-clip-border animate-pulse" style={{WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'exclude'}} />
            </div>
          </div>
        ))}
      </div>

      <hr className="border-white mb-8 mt-10" />
    </section>
  )
}

export default RecentProjects


