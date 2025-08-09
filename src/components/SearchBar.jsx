import { useEffect, useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Fetch Google autocomplete suggestions (with CORS proxy)
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://corsproxy.io/?https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        setSuggestions(data[1] || []);
      } catch (error) {
        console.error("Autocomplete fetch failed:", error);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        "_blank"
      );
      setQuery("");
      setSuggestions([]);
    }
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
        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-60"></div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="relative bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-600/30 transition-all duration-300"
        >
          {/* Search icon */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
            <svg
              className={`w-6 h-6 transition-all duration-300 ${
                isFocused ? "text-blue-400 scale-110" : "text-slate-400"
              }`}
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

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search Google..."
            className="w-full pl-16 pr-16 py-5 bg-transparent rounded-2xl text-white placeholder-slate-400 text-lg focus:outline-none"
            autoComplete="off"
          />

          {/* Search button */}
          <button
            type="submit"
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2.5 rounded-xl transition-all duration-300 ${
              query.trim()
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:scale-105"
                : "bg-slate-700/50 text-slate-400 opacity-50 cursor-not-allowed"
            }`}
            disabled={!query.trim()}
          >
            Search
          </button>
        </form>

        {/* Suggestions dropdown */}
        {/* Suggestions dropdown */}
        {isFocused && query.trim() && suggestions.length > 0 && (
          <div
            className="absolute top-full left-0 mt-2 bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-600/30 shadow-2xl overflow-hidden z-20"
            style={{
              width: "100%",
              maxHeight: "250px",
              overflowY: "auto",
            }}
          >
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(s);
                  setSuggestions([]);
                }}
                className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
