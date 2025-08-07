import { useEffect, useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Google search redirect
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
        query
      )}`;
    }
  };

  const searchSuggestions = [
    "What's the weather today?",
    "Latest tech news",
    "Healthy recipes",
    "How to learn coding",
    "Best productivity apps",
  ];

  const getRandomPlaceholder = () => {
    return searchSuggestions[
      Math.floor(Math.random() * searchSuggestions.length)
    ];
  };

  return (
    <div className="col-span-3 col-start-2 row-start-3 flex items-center justify-center p-4">
      <div
        className={`relative w-full max-w-2xl transition-all duration-700 ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-4"
        }`}
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-60"></div>

        {/* Main search container */}
        <div className="relative">
          <div
            className={`relative bg-slate-900/80 backdrop-blur-md rounded-2xl border transition-all duration-300 ${
              isFocused
                ? "border-blue-400/50 shadow-2xl shadow-blue-500/20 scale-105"
                : "border-slate-600/30 shadow-xl"
            }`}
          >
            {/* Search icon */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
              <div
                className={`transition-all duration-300 ${
                  isFocused ? "text-blue-400 scale-110" : "text-slate-400"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Search input */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
              placeholder={getRandomPlaceholder()}
              className="w-full pl-16 pr-16 py-5 bg-transparent rounded-2xl text-white placeholder-slate-400 text-lg focus:outline-none transition-all duration-300"
              autoComplete="off"
            />

            {/* Search button */}
            <button
              onClick={handleSearch}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2.5 rounded-xl transition-all duration-300 ${
                query.trim()
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 opacity-100"
                  : "bg-slate-700/50 text-slate-400 opacity-50 cursor-not-allowed"
              }`}
              disabled={!query.trim()}
            >
              <span className="font-medium">Search</span>
            </button>

            {/* Animated border gradient */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 transition-opacity duration-300 ${
                isFocused ? "opacity-100" : "opacity-0"
              }`}
              style={{ zIndex: -1 }}
            ></div>
          </div>

          {/* Floating particles */}
          <div className="absolute -top-2 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 right-1/3 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-ping delay-700"></div>
          <div className="absolute top-1/2 -right-2 w-1 h-1 bg-pink-400/60 rounded-full animate-ping delay-300"></div>

          {/* Quick search suggestions */}
          {isFocused && !query && (
            <div className="absolute top-full left-0 right-0 mt-4 bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-600/30 shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-300">
              <div className="p-4">
                <h3 className="text-slate-300 text-sm font-medium mb-3">
                  Popular searches
                </h3>
                <div className="space-y-2">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(suggestion)}
                      className="block w-full text-left px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 text-sm"
                    >
                      <span className="text-blue-400 mr-2">→</span>
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full rotate-12 animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full rotate-45 animate-pulse delay-500"></div>
      </div>
    </div>
  );
}
