import { useEffect, useState } from "react";

function Shortcuts() {
  const [currentShortcuts, setCurrentShortcuts] = useState({
    name: "",
    url: "",
    icon: "",
  });

  const [currentShortcutsArray, setCurrentShortcutsArray] = useState([
    // Default shortcuts for demo
    {
      name: "YouTube",
      url: "https://youtube.com",
      icon: "",
      favicon: "https://www.youtube.com/favicon.ico",
    },
    {
      name: "Gmail",
      url: "https://gmail.com",
      icon: "",
      favicon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
    },
    {
      name: "GitHub",
      url: "https://github.com",
      icon: "",
      favicon: "https://github.com/favicon.ico",
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: "",
      favicon: "https://abs.twimg.com/favicons/twitter.2.ico",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url.startsWith("http") ? url : `https://${url}`)
        .hostname;
      // Try multiple favicon sources for better reliability
      return [
        `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        `https://${domain}/favicon.ico`,
        `https://${domain}/favicon.png`,
        `https://${domain}/apple-touch-icon.png`,
      ];
    } catch {
      return [`https://www.google.com/s2/favicons?domain=example.com&sz=64`];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentShortcuts.name && currentShortcuts.url) {
      const faviconUrls = getFaviconUrl(currentShortcuts.url);
      const newShortcut = {
        ...currentShortcuts,
        favicon: faviconUrls[0], // Use Google's favicon service as primary
      };
      setCurrentShortcutsArray([...currentShortcutsArray, newShortcut]);
      setCurrentShortcuts({ name: "", url: "", icon: "" });
      setShowAddForm(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentShortcuts((prev) => ({ ...prev, [field]: value }));
  };

  const removeShortcut = (index) => {
    setCurrentShortcutsArray((prev) => prev.filter((_, i) => i !== index));
  };

  const getDefaultIcon = (name) => {
    const defaultIcons = {
      youtube: "📺",
      gmail: "📧",
      email: "📧",
      github: "👨‍💻",
      twitter: "🐦",
      facebook: "📘",
      instagram: "📷",
      linkedin: "💼",
      netflix: "🎬",
      spotify: "🎵",
      reddit: "🤖",
      discord: "🎮",
      slack: "💬",
      zoom: "📹",
      notion: "📝",
      figma: "🎨",
    };

    const key = name.toLowerCase();
    return defaultIcons[key] || "🌐";
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
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Quick Access</h2>
            <p className="text-slate-400">Your favorite websites at a glance</p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                showAddForm ? "rotate-45" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            {showAddForm ? "Cancel" : "Add Shortcut"}
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="mb-8 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 animate-in slide-in-from-top-4 duration-300">
            <h3 className="text-lg font-semibold text-white mb-4">
              Add New Shortcut
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="YouTube"
                  value={currentShortcuts.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Icon (Optional)
                </label>
                <input
                  type="text"
                  placeholder="📺 or leave empty for auto-icon"
                  value={currentShortcuts.icon}
                  onChange={(e) => handleInputChange("icon", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <p className="text-slate-400 text-xs mt-1">
                  Leave empty to auto-fetch website icon
                </p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!currentShortcuts.name || !currentShortcuts.url}
              className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Save Shortcut
            </button>
          </div>
        )}

        {/* Shortcuts Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
          {currentShortcutsArray.map((shortcut, index) => (
            <div key={index} className="group relative">
              {/* Remove button */}
              <button
                onClick={() => removeShortcut(index)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center text-xs hover:bg-red-600 z-10"
              >
                ×
              </button>

              <a
                href={
                  shortcut.url.startsWith("http")
                    ? shortcut.url
                    : `https://${shortcut.url}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                {/* Icon container - circular and smaller */}
                <div className="w-14 h-14 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md rounded-full border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:border-blue-500/30 flex items-center justify-center mb-2 group-hover:shadow-blue-500/20">
                  {shortcut.favicon ? (
                    <img
                      src={shortcut.favicon}
                      alt={shortcut.name}
                      className="w-8 h-8 rounded-lg"
                      onError={(e) => {
                        // Fallback to emoji if favicon fails
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                  ) : null}
                  <div
                    className={`text-2xl ${
                      shortcut.favicon ? "hidden" : "block"
                    } group-hover:scale-110 transition-transform duration-300`}
                    style={{ display: shortcut.favicon ? "none" : "block" }}
                  >
                    {shortcut.icon || getDefaultIcon(shortcut.name)}
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Name */}
                <div className="text-white font-medium text-xs group-hover:text-blue-300 transition-colors duration-300 text-center max-w-16 truncate">
                  {shortcut.name}
                </div>
              </a>
            </div>
          ))}

          {/* Add New Shortcut Card - also smaller and rounder */}
          {!showAddForm && (
            <div className="group">
              <button
                onClick={() => setShowAddForm(true)}
                className="w-14 h-14 bg-slate-900/40 backdrop-blur-md rounded-full border-2 border-dashed border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:border-blue-500/50 flex items-center justify-center mb-2"
              >
                <svg
                  className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <div className="text-slate-400 group-hover:text-blue-300 font-medium text-xs transition-colors duration-300 text-center">
                Add
              </div>
            </div>
          )}
        </div>

        {/* Empty state */}
        {currentShortcutsArray.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No shortcuts yet
            </h3>
            <p className="text-slate-400 mb-6">
              Add your favorite websites for quick access
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Add Your First Shortcut
            </button>
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full animate-pulse delay-700"></div>
      </div>
    </div>
  );
}

export default Shortcuts;
