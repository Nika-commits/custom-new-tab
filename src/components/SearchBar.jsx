import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

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
        setSuggestions((data[1] || []).slice(0, 5));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 150);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const updatePosition = () => {
      if (formRef.current && isFocused) {
        const rect = formRef.current.getBoundingClientRect();
        setDropdownPos({
          top: rect.bottom + 8,
          left: rect.left,
          width: rect.width,
        });
      }
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [isFocused, suggestions]);

  const handleSearch = (searchQuery = query) => {
    const finalQuery = searchQuery.trim();
    if (finalQuery) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(finalQuery)}`;
    }
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) handleSearch(suggestions[selectedIndex]);
      else handleSearch();
    } else if (e.key === "Escape") {
      inputRef.current?.blur();
      setIsFocused(false);
    }
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className={`relative w-full border transition-all duration-300 group
          ${
            isFocused
              ? "bg-white border-white"
              : "bg-black border-zinc-800 hover:border-zinc-600"
          }
        `}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold pointer-events-none">
          <span
            className={`text-lg font-mono ${isFocused ? "text-black" : "text-zinc-600"}`}
          >
            {">"}
          </span>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={selectedIndex >= 0 ? suggestions[selectedIndex] : query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="SEARCH_WEB..."
          className={`w-full bg-transparent py-4 pl-10 pr-4 font-mono text-lg outline-none placeholder:text-zinc-700 uppercase tracking-widest
            ${isFocused ? "text-black selection:bg-black selection:text-white" : "text-white"}
          `}
          autoComplete="off"
        />
      </form>

      {/* Dropdown Portal */}
      {isFocused &&
        suggestions.length > 0 &&
        createPortal(
          <div
            className="fixed z-[9999] border border-zinc-800 bg-black text-zinc-400 font-mono text-sm uppercase tracking-wider shadow-2xl"
            style={{
              top: `${dropdownPos.top}px`,
              left: `${dropdownPos.left}px`,
              width: `${dropdownPos.width}px`,
            }}
          >
            {suggestions.map((suggestion, i) => (
              <div
                key={i}
                onMouseDown={() => handleSearch(suggestion)}
                className={`px-4 py-3 cursor-pointer flex justify-between group transition-colors
                        ${i === selectedIndex ? "bg-white text-black" : "hover:bg-zinc-900 hover:text-white"}
                    `}
              >
                <span>{suggestion}</span>
                <span
                  className={`opacity-0 group-hover:opacity-100 ${i === selectedIndex ? "opacity-100" : ""}`}
                >
                  ↵
                </span>
              </div>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}

export default SearchBar;
