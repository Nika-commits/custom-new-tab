import React, { useState } from "react";

function ChromeShortcuts() {
  const [shortcuts, setShortcuts] = useState([
    {
      id: 1,
      name: "Google",
      url: "https://google.com",
      favicon:
        "https://www.google.com/s2/favicons?domain=https://google.com&sz=32",
    },
    {
      id: 2,
      name: "YouTube",
      url: "https://youtube.com",
      favicon:
        "https://www.google.com/s2/favicons?domain=https://youtube.com&sz=32",
    },
    {
      id: 3,
      name: "GitHub",
      url: "https://github.com",
      favicon:
        "https://www.google.com/s2/favicons?domain=https://github.com&sz=32",
    },
    {
      id: 4,
      name: "Stack Overflow",
      url: "https://stackoverflow.com",
      favicon:
        "https://www.google.com/s2/favicons?domain=https://stackoverflow.com&sz=32",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingShortcut, setEditingShortcut] = useState(null);
  const [formData, setFormData] = useState({ name: "", url: "" });

  const getFaviconFromUrl = async (url) => {
    try {
      const domain = new URL(url).origin;

      // Try multiple common favicon paths
      const faviconPaths = [
        "/favicon.ico",
        "/favicon.png",
        "/apple-touch-icon.png",
        "/apple-touch-icon-precomposed.png",
      ];

      // Use Google's favicon service as a reliable fallback
      const googleFavicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

      // Try the domain's favicon first, then fall back to Google's service
      for (const path of faviconPaths) {
        const faviconUrl = domain + path;
        try {
          const response = await fetch(faviconUrl, { method: "HEAD" });
          if (response.ok) {
            return faviconUrl;
          }
        } catch (e) {
          continue;
        }
      }

      // Fallback to Google's favicon service
      return googleFavicon;
    } catch (e) {
      // If all else fails, use a generic globe emoji
      return null;
    }
  };

  const handleAddShortcut = async () => {
    if (formData.name && formData.url) {
      let url = formData.url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      const favicon = await getFaviconFromUrl(url);

      const newShortcut = {
        id: Date.now(),
        name: formData.name,
        url: url,
        favicon: favicon,
      };

      setShortcuts([...shortcuts, newShortcut]);
      setFormData({ name: "", url: "" });
      setShowAddModal(false);
    }
  };

  const handleEditShortcut = async () => {
    if (formData.name && formData.url && editingShortcut) {
      let url = formData.url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      const favicon = await getFaviconFromUrl(url);

      setShortcuts(
        shortcuts.map((shortcut) =>
          shortcut.id === editingShortcut.id
            ? { ...shortcut, name: formData.name, url: url, favicon: favicon }
            : shortcut
        )
      );
      setEditingShortcut(null);
      setFormData({ name: "", url: "" });
    }
  };

  const handleDeleteShortcut = (id) => {
    setShortcuts(shortcuts.filter((shortcut) => shortcut.id !== id));
  };

  const openEditModal = (shortcut) => {
    setEditingShortcut(shortcut);
    setFormData({ name: shortcut.name, url: shortcut.url });
  };

  const closeModals = () => {
    setShowAddModal(false);
    setEditingShortcut(null);
    setFormData({ name: "", url: "" });
  };

  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).origin;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shortcuts</h2>

      {/* Shortcuts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        {shortcuts.map((shortcut) => (
          <div key={shortcut.id} className="group relative">
            <a
              href={shortcut.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-12 h-12 mb-2 flex items-center justify-center bg-white rounded-full shadow-md">
                {shortcut.favicon ? (
                  <img
                    src={shortcut.favicon}
                    alt={shortcut.name}
                    className="w-8 h-8 rounded"
                    onError={(e) => {
                      // Fallback to Google's favicon service if direct favicon fails
                      const googleFallback = `https://www.google.com/s2/favicons?domain=${shortcut.url}&sz=32`;
                      if (e.target.src !== googleFallback) {
                        e.target.src = googleFallback;
                      } else {
                        // If Google's service also fails, show emoji
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }
                    }}
                  />
                ) : null}
                <div className="w-6 h-6 text-gray-400 hidden flex items-center justify-center text-lg">
                  🌐
                </div>
              </div>
              <span className="text-sm text-gray-700 text-center font-medium truncate w-full">
                {shortcut.name}
              </span>
            </a>

            {/* Hover Actions */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  openEditModal(shortcut);
                }}
                className="bg-white hover:bg-gray-100 p-1 rounded-full shadow-md mr-1 w-6 h-6 flex items-center justify-center"
                title="Edit shortcut"
              >
                <span className="text-xs">✏️</span>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteShortcut(shortcut.id);
                }}
                className="bg-white hover:bg-red-100 p-1 rounded-full shadow-md w-6 h-6 flex items-center justify-center"
                title="Remove shortcut"
              >
                <span className="text-xs text-red-600">×</span>
              </button>
            </div>
          </div>
        ))}

        {/* Add Shortcut Button */}
        <div className="flex flex-col items-center p-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-12 h-12 mb-2 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200"
          >
            <span className="text-2xl text-gray-600">+</span>
          </button>
          <span className="text-sm text-gray-500 text-center font-medium">
            Add shortcut
          </span>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingShortcut) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {editingShortcut ? "Edit shortcut" : "Add shortcut"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter shortcut name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter URL (e.g., google.com)"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={
                  editingShortcut ? handleEditShortcut : handleAddShortcut
                }
                disabled={!formData.name || !formData.url}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {editingShortcut ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChromeShortcuts;
