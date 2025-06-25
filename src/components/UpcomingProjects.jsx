import { useState } from "react";
import { ChevronDown, Calendar, MapPin, Film, Star } from "lucide-react";

export default function UpcomingProjects() {
    const [genreOpen, setGenreOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);
    const [showMovies, setShowMovies] = useState(false);

    // Sample movie data
    const sampleMovies = [
        {
            id: 1,
            title: "The Dark Knight Returns",
            genre: "Action",
            category: "Blockbuster",
            location: "New York",
            releaseDate: "2024-08-15",
            image:
                "https://images.unsplash.com/photo-1489599904275-0a11aa8c6d12?w=300&h=400&fit=crop",
            status: "Pre-production",
            rating: 8.5,
        },
        {
            id: 2,
            title: "Ocean's Mystery",
            genre: "Thriller",
            category: "Independent",
            location: "Miami",
            releaseDate: "2024-09-22",
            image:
                "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop",
            status: "Filming",
            rating: 7.8,
        },
        {
            id: 3,
            title: "Love in Paris",
            genre: "Romance",
            category: "Drama",
            location: "Paris",
            releaseDate: "2024-10-10",
            image:
                "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=400&fit=crop",
            status: "Post-production",
            rating: 9.2,
        },
        {
            id: 4,
            title: "Space Odyssey 2024",
            genre: "Sci-Fi",
            category: "Blockbuster",
            location: "Los Angeles",
            releaseDate: "2024-11-05",
            image:
                "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=400&fit=crop",
            status: "Pre-production",
            rating: 8.9,
        },
    ];

    return (
        <div className="min-h-screen bg-black">
            {/* Top section with filters */}
            <div className="px-4 md:px-8 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left side - UPCOMING PROJECTS */}
                    <div className="flex mb-4 md:mb-0 relative">
                        <button className="px-4 py-1 rounded-full border border-lime-400 text-sm font-bold text-lime-400 tracking-wide">
                            UPCOMING <span className="text-white">PROJECTS</span>
                        </button>
                        <div className="h-[2px] bg-lime-400 w-[150px] mt-4" />
                    </div>

                    {/* Right side - Filter buttons */}
                    <div className="flex flex-wrap items-center gap-2 md:gap-4">
                        {/* Genre dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setGenreOpen(!genreOpen)}
                                className="flex items-center gap-2 bg-lime-400 text-black px-4 md:px-6 py-2 rounded-full text-sm font-semibold hover:bg-lime-500 transition-colors"
                            >
                                Genre
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className={`transition-transform ${
                                        genreOpen ? "rotate-180" : ""
                                    }`}
                                >
                                    <path
                                        d="M6 9l6 6 6-6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            {genreOpen && (
                                <div className="absolute top-full mt-1 right-0 bg-gray-800 border border-gray-600 rounded-lg py-2 min-w-32 z-10">
                                    <div className="text-sm text-gray-300">
                                        <div className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                                            Action
                                        </div>
                                        <div className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                                            Drama
                                        </div>
                                        <div className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                                            Comedy
                                        </div>
                                        <div className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                                            Thriller
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Category dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setCategoryOpen(!categoryOpen)}
                                className="flex items-center gap-2 bg-lime-400 text-black px-4 md:px-6 py-2 rounded-full text-sm font-semibold hover:bg-lime-500 transition-colors"
                            >
                                Category
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className={`transition-transform ${
                                        categoryOpen ? "rotate-180" : ""
                                    }`}
                                >
                                    <path
                                        d="M6 9l6 6 6-6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            {categoryOpen && (
                                <div className="absolute top-full mt-1 right-0 bg-gray-800 border border-gray-600 rounded-lg py-2 min-w-36 z-10">
                                    <div className="text-sm text-gray-300">
                                        <div className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                                            Blockbuster
                                        </div>
                                        <div className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                                            Independent
                                        </div>
                                        <div className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                                            Documentary
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Location dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setLocationOpen(!locationOpen)}
                                className="flex items-center gap-2 bg-lime-400 text-black px-4 md:px-6 py-2 rounded-full text-sm font-semibold hover:bg-lime-500 transition-colors"
                            >
                                Location
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className={`transition-transform ${
                                        locationOpen ? "rotate-180" : ""
                                    }`}
                                >
                                    <path
                                        d="M6 9l6 6 6-6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            {locationOpen && (
                                <div className="absolute top-full mt-1 right-0 bg-gray-800 border border-gray-600 rounded-lg py-2 min-w-32 z-10">
                                    <div className="text-sm text-gray-300">
                                        <div className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                                            New York
                                        </div>
                                        <div className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                                            Los Angeles
                                        </div>
                                        <div className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                                            Miami
                                        </div>
                                        <div className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                                            Paris
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content area */}
            <div
                className="flex-1 flex items-center justify-center px-2 sm:px-4 md:px-8"
                style={{ minHeight: "calc(100vh - 120px)" }}
            >
                {!showMovies ? (
                    <div className="text-center w-full">
                        <div className="text-gray-500 text-lg mb-6">No movie found!</div>
                        <button
                            onClick={() => setShowMovies(true)}
                            className="bg-lime-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-lime-500 transition-colors"
                        >
                            Show Sample Movies
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-7xl">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                            <h2 className="text-white text-2xl font-bold">Upcoming Movies</h2>
                            <button
                                onClick={() => setShowMovies(false)}
                                className="text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                Back to No Movies
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {sampleMovies.map((movie) => (
                                <div
                                    key={movie.id}
                                    className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-lime-400 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
                                >
                                    <div className="relative">
                                        <img
                                            src={movie.image}
                                            alt={movie.title}
                                            className="w-full h-56 object-cover"
                                        />
                                        <div className="absolute top-3 right-3 bg-lime-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                                            {movie.status}
                                        </div>
                                        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full">
                                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                            <span className="text-white text-xs font-semibold">
                                                {movie.rating}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-white text-lg font-bold mb-3 line-clamp-2">
                                            {movie.title}
                                        </h3>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <Film className="w-4 h-4" />
                                                <span>{movie.genre}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <MapPin className="w-4 h-4" />
                                                <span>{movie.location}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <Calendar className="w-4 h-4" />
                                                <span>
                                                    {new Date(movie.releaseDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="pt-3 border-t border-gray-700">
                                            <span className="bg-lime-400/20 text-lime-400 px-3 py-1 rounded-full text-xs font-semibold">
                                                {movie.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
