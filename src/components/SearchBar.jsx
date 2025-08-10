import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const inputRef = useRef(null);
  const suggestionRefs = useRef([]);
  const formRef = useRef(null);

  // Update dropdown position when focused or window resizes
  useEffect(() => {
    const updatePosition = () => {
      if (formRef.current && isFocused) {
        const rect = formRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 8,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [isFocused]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Fetch Google autocomplete suggestions (with CORS proxy)
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setSelectedIndex(-1);
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
        // Limit to 8 suggestions like Google
        setSuggestions((data[1] || []).slice(0, 8));
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Autocomplete fetch failed:", error);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 150);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSearch = (searchQuery = query) => {
    const finalQuery = searchQuery.trim();
    if (finalQuery) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
        finalQuery
      )}`;
    }
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSearch(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case "Escape":
        setIsFocused(false);
        setSuggestions([]);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    // Don't blur if clicking on a suggestion
    if (e.relatedTarget?.closest("[data-suggestion]")) {
      return;
    }
    setTimeout(() => {
      setIsFocused(false);
      setSelectedIndex(-1);
    }, 150);
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
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
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
            ref={inputRef}
            type="text"
            value={selectedIndex >= 0 ? suggestions[selectedIndex] : query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="Search Google..."
            className="w-full pl-16 pr-16 py-5 bg-transparent rounded-2xl text-white placeholder-slate-400 text-lg focus:outline-none"
            autoComplete="off"
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSuggestions([]);
                setSelectedIndex(-1);
                inputRef.current?.focus();
              }}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

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

        {/* Suggestions dropdown - rendered as portal */}
        {isFocused &&
          query.trim() &&
          suggestions.length > 0 &&
          createPortal(
            <div
              className="fixed bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-600/30 shadow-2xl z-[99999]"
              style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
              }}
              data-suggestion
            >
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  ref={(el) => (suggestionRefs.current[i] = el)}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`flex items-center w-full text-left px-4 py-3 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl ${
                    i === selectedIndex
                      ? "bg-slate-700/70 text-white"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                  data-suggestion
                >
                  <svg
                    className="w-4 h-4 mr-3 text-slate-400"
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
                  <span className="truncate">{suggestion}</span>
                </button>
              ))}
            </div>,
            document.body
          )}
      </div>
    </div>
  );
}

export default SearchBar;
