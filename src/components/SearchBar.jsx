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
  const formRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      if (formRef.current && isFocused) {
        const rect = formRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 8, // slight gap for brutalist separation
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
            query,
          )}`,
        );
        const data = await res.json();
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
        finalQuery,
      )}`;
    }
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
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
    if (e.relatedTarget?.closest("[data-suggestion]")) return;
    setTimeout(() => {
      setIsFocused(false);
      setSelectedIndex(-1);
    }, 150);
  };

  return (
    <div className="col-span-3 col-start-2 row-start-3 flex items-center justify-center p-4">
      <div
        className={`relative w-full max-w-2xl transition-all duration-500 ease-out ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-8"
        }`}
      >
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          // Brutalist Container: Dark Zinc, Thick Border, Hard Shadow
          className={`relative bg-zinc-900 border-2 border-zinc-700 transition-all duration-200 ${
            isFocused
              ? "shadow-[6px_6px_0px_0px_#3f3f46] border-zinc-500"
              : "shadow-[4px_4px_0px_0px_#18181b]"
          }`}
        >
          {/* Icon */}
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
            <svg
              className={`w-5 h-5 transition-colors duration-200 ${
                isFocused ? "text-white" : "text-zinc-500"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="square" // Sharper lines
                strokeLinejoin="miter"
                strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            ref={inputRef}
            type="text"
            // Display logic to handle showing suggestion when arrowing down
            value={selectedIndex >= 0 ? suggestions[selectedIndex] : query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="SEARCH_GOOGLE..."
            // Input Styling: Monospace, Uppercase placeholder, no outline
            className="w-full pl-14 pr-32 py-4 bg-transparent text-zinc-100 placeholder-zinc-600 text-lg font-mono focus:outline-none tracking-tight uppercase"
            autoComplete="off"
          />

          {/* Clear Button (X) */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSuggestions([]);
                setSelectedIndex(-1);
                inputRef.current?.focus();
              }}
              className="absolute right-28 top-1/2 transform -translate-y-1/2 p-2 text-zinc-500 hover:text-white transition-colors"
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

          {/* Search Button (Right Side) */}
          <button
            type="submit"
            className={`absolute right-0 top-0 bottom-0 px-6 font-mono font-bold tracking-wider transition-all duration-200 border-l-2 border-zinc-700 ${
              query.trim()
                ? "bg-zinc-100 text-black hover:bg-white hover:pl-8" // Expanding hover effect
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            }`}
            disabled={!query.trim()}
          >
            GO
          </button>
        </form>

        {/* Dropdown Portal */}
        {isFocused &&
          query.trim() &&
          suggestions.length > 0 &&
          createPortal(
            <div
              // Dropdown styling: Matching brutalist theme, hard shadow
              className="fixed bg-zinc-900 border-2 border-zinc-700 shadow-[6px_6px_0px_0px_#000000] z-[99999]"
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
                  onClick={() => handleSuggestionClick(suggestion)}
                  // Item styling: Monospace, sharp borders between items
                  className={`flex items-center w-full text-left px-5 py-3 font-mono text-sm border-b border-zinc-800 last:border-0 transition-colors duration-100 ${
                    i === selectedIndex
                      ? "bg-zinc-100 text-black font-bold" // Active item inverts colors
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                  }`}
                  data-suggestion
                >
                  <span
                    className={`mr-4 ${i === selectedIndex ? "text-black" : "text-zinc-600"}`}
                  >
                    {">"}
                  </span>
                  <span className="truncate">{suggestion}</span>
                </button>
              ))}
            </div>,
            document.body,
          )}
      </div>
    </div>
  );
}

export default SearchBar;
