"use client";

import { Globe, Loader2, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

function Shortcuts() {
  const [currentShortcuts, setCurrentShortcuts] = useState({
    name: "",
    url: "",
  });

  const [currentShortcutsArray, setCurrentShortcutsArray] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("shortcuts");
      return stored
        ? JSON.parse(stored)
        : [
            {
              name: "YouTube",
              url: "https://youtube.com",
              favicon:
                "https://www.google.com/s2/favicons?domain=youtube.com&sz=64",
            },
            {
              name: "Gmail",
              url: "https://gmail.com",
              favicon:
                "https://www.google.com/s2/favicons?domain=gmail.com&sz=64",
            },
            {
              name: "GitHub",
              url: "https://github.com",
              favicon:
                "https://www.google.com/s2/favicons?domain=github.com&sz=64",
            },
            {
              name: "Twitter",
              url: "https://twitter.com",
              favicon:
                "https://www.google.com/s2/favicons?domain=twitter.com&sz=64",
            },
          ];
    }
    return [];
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Debounced localStorage save
  useEffect(() => {
    if (typeof window !== "undefined") {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(
          "shortcuts",
          JSON.stringify(currentShortcutsArray)
        );
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [currentShortcutsArray]);

  // Optimized favicon URL generation - synchronous and reliable
  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url.startsWith("http") ? url : `https://${url}`)
        .hostname;
      // Use Google's favicon API as primary source - it's fast and reliable
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return `https://www.google.com/s2/favicons?domain=example.com&sz=64`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentShortcuts.name || !currentShortcuts.url) return;

    setIsSubmitting(true);

    try {
      // Get favicon URL immediately (synchronous)
      const faviconUrl = getFaviconUrl(currentShortcuts.url);

      const newShortcut = {
        ...currentShortcuts,
        favicon: faviconUrl,
        id: Date.now(), // Add unique ID for better React keys
      };

      // Add shortcut immediately for instant feedback
      setCurrentShortcutsArray((prev) => [...prev, newShortcut]);
      setCurrentShortcuts({ name: "", url: "" });
      setShowAddForm(false);

      // Optional: Validate favicon in background and update if needed
      setTimeout(() => {
        const img = new Image();
        img.onload = () => {
          // Favicon loaded successfully, no action needed
        };
        img.onerror = () => {
          // Fallback to a generic icon if favicon fails
          setCurrentShortcutsArray((prev) =>
            prev.map((shortcut) =>
              shortcut.id === newShortcut.id
                ? {
                    ...shortcut,
                    favicon: `https://www.google.com/s2/favicons?domain=google.com&sz=64`,
                  }
                : shortcut
            )
          );
        };
        img.src = faviconUrl;
      }, 100);
    } catch (error) {
      console.error("Error adding shortcut:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeShortcut = (index) => {
    setCurrentShortcutsArray((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (field, value) => {
    setCurrentShortcuts((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="col-span-3 row-span-2 col-start-2 row-start-4 p-6">
      <div
        className={`transition-all duration-700 ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Shortcuts</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Plus
              className={`w-5 h-5 transition-transform duration-300 ${
                showAddForm ? "rotate-45" : ""
              }`}
            />
            {showAddForm ? "Cancel" : "Add Shortcut"}
          </button>
        </div>

        {/* Shortcuts Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
          {currentShortcutsArray.map((shortcut, index) => (
            <div key={shortcut.id || index} className="group relative">
              <button
                onClick={() => removeShortcut(index)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center text-xs hover:bg-red-600 z-10"
              >
                <X className="w-3 h-3" />
              </button>
              <a
                href={
                  shortcut.url.startsWith("http")
                    ? shortcut.url
                    : `https://${shortcut.url}`
                }
                target="_self"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-slate-800/20 backdrop-blur-sm rounded-full border border-slate-700/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-blue-500/30 flex items-center justify-center mb-2 group-hover:shadow-blue-500/20 hover:bg-slate-700/30">
                  <img
                    src={shortcut.favicon || "/placeholder.svg"}
                    alt={shortcut.name}
                    className="w-8 h-8 rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-8 h-8 hidden items-center justify-center"
                    style={{ display: "none" }}
                  >
                    <Globe className="w-6 h-6 text-slate-400" />
                  </div>
                </div>
                <div className="text-white font-medium text-xs group-hover:text-blue-300 transition-colors duration-300 text-center max-w-16 truncate">
                  {shortcut.name}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={() => !isSubmitting && setShowAddForm(false)}
          />
          <div className="relative bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/50 p-8 max-w-2xl w-full shadow-2xl">
            <button
              onClick={() => !isSubmitting && setShowAddForm(false)}
              disabled={isSubmitting}
              className="absolute top-4 right-4 w-8 h-8 bg-slate-800/50 hover:bg-red-500 text-slate-400 hover:text-white rounded-full transition-all duration-300 flex items-center justify-center disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-semibold text-white mb-6">
              Add New Shortcut
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="YouTube"
                    value={currentShortcuts.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com"
                    value={currentShortcuts.url}
                    onChange={(e) => handleInputChange("url", e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={
                    !currentShortcuts.name ||
                    !currentShortcuts.url ||
                    isSubmitting
                  }
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Save Shortcut"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white rounded-xl transition-all duration-300 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shortcuts;
