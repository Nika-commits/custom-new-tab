// "use client";

// import { Globe, Loader2, Plus, X } from "lucide-react";
// import { useEffect, useState } from "react";

// function Shortcuts() {
//   const [currentShortcuts, setCurrentShortcuts] = useState({
//     name: "",
//     url: "",
//   });

//   const [currentShortcutsArray, setCurrentShortcutsArray] = useState(() => {
//     if (typeof window !== "undefined") {
//       const stored = localStorage.getItem("shortcuts");
//       return stored
//         ? JSON.parse(stored)
//         : [
//             {
//               name: "YouTube",
//               url: "https://youtube.com",
//               favicon:
//                 "https://www.google.com/s2/favicons?domain=youtube.com&sz=64",
//             },
//             {
//               name: "Gmail",
//               url: "https://gmail.com",
//               favicon:
//                 "https://www.google.com/s2/favicons?domain=gmail.com&sz=64",
//             },
//             {
//               name: "GitHub",
//               url: "https://github.com",
//               favicon:
//                 "https://www.google.com/s2/favicons?domain=github.com&sz=64",
//             },
//             {
//               name: "Twitter",
//               url: "https://twitter.com",
//               favicon:
//                 "https://www.google.com/s2/favicons?domain=twitter.com&sz=64",
//             },
//           ];
//     }
//     return [];
//   });

//   const [showAddForm, setShowAddForm] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), 300);
//     return () => clearTimeout(timer);
//   }, []);

//   // Debounced localStorage save
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const timeoutId = setTimeout(() => {
//         localStorage.setItem(
//           "shortcuts",
//           JSON.stringify(currentShortcutsArray)
//         );
//       }, 500);
//       return () => clearTimeout(timeoutId);
//     }
//   }, [currentShortcutsArray]);

//   // Optimized favicon URL generation - synchronous and reliable
//   const getFaviconUrl = (url) => {
//     try {
//       const domain = new URL(url.startsWith("http") ? url : `https://${url}`)
//         .hostname;
//       // Use Google's favicon API as primary source - it's fast and reliable
//       return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
//     } catch {
//       return `https://www.google.com/s2/favicons?domain=example.com&sz=64`;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!currentShortcuts.name || !currentShortcuts.url) return;

//     setIsSubmitting(true);

//     try {
//       // Get favicon URL immediately (synchronous)
//       const faviconUrl = getFaviconUrl(currentShortcuts.url);

//       const newShortcut = {
//         ...currentShortcuts,
//         favicon: faviconUrl,
//         id: Date.now(), // Add unique ID for better React keys
//       };

//       // Add shortcut immediately for instant feedback
//       setCurrentShortcutsArray((prev) => [...prev, newShortcut]);
//       setCurrentShortcuts({ name: "", url: "" });
//       setShowAddForm(false);

//       // Optional: Validate favicon in background and update if needed
//       setTimeout(() => {
//         const img = new Image();
//         img.onload = () => {
//           // Favicon loaded successfully, no action needed
//         };
//         img.onerror = () => {
//           // Fallback to a generic icon if favicon fails
//           setCurrentShortcutsArray((prev) =>
//             prev.map((shortcut) =>
//               shortcut.id === newShortcut.id
//                 ? {
//                     ...shortcut,
//                     favicon: `https://www.google.com/s2/favicons?domain=google.com&sz=64`,
//                   }
//                 : shortcut
//             )
//           );
//         };
//         img.src = faviconUrl;
//       }, 100);
//     } catch (error) {
//       console.error("Error adding shortcut:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const removeShortcut = (index) => {
//     setCurrentShortcutsArray((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleInputChange = (field, value) => {
//     setCurrentShortcuts((prev) => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="col-span-3 row-span-2 col-start-2 row-start-4 p-6">
//       <div
//         className={`transition-all duration-700 ${
//           isVisible
//             ? "opacity-100 transform translate-y-0"
//             : "opacity-0 transform translate-y-4"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold text-white mb-2">Shortcuts</h2>
//           <button
//             onClick={() => setShowAddForm(!showAddForm)}
//             className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
//           >
//             <Plus
//               className={`w-5 h-5 transition-transform duration-300 ${
//                 showAddForm ? "rotate-45" : ""
//               }`}
//             />
//             {showAddForm ? "Cancel" : "Add Shortcut"}
//           </button>
//         </div>

//         {/* Shortcuts Grid */}
//         <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
//           {currentShortcutsArray.map((shortcut, index) => (
//             <div key={shortcut.id || index} className="group relative">
//               <button
//                 onClick={() => removeShortcut(index)}
//                 className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center text-xs hover:bg-red-600 z-10"
//               >
//                 <X className="w-3 h-3" />
//               </button>
//               <a
//                 href={
//                   shortcut.url.startsWith("http")
//                     ? shortcut.url
//                     : `https://${shortcut.url}`
//                 }
//                 target="_self"
//                 rel="noopener noreferrer"
//                 className="flex flex-col items-center"
//               >
//                 <div className="w-14 h-14 bg-slate-800/20 backdrop-blur-sm rounded-full border border-slate-700/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-blue-500/30 flex items-center justify-center mb-2 group-hover:shadow-blue-500/20 hover:bg-slate-700/30">
//                   <img
//                     src={shortcut.favicon || "/placeholder.svg"}
//                     alt={shortcut.name}
//                     className="w-8 h-8 rounded-lg"
//                     onError={(e) => {
//                       e.target.style.display = "none";
//                       e.target.nextSibling.style.display = "flex";
//                     }}
//                   />
//                   <div
//                     className="w-8 h-8 hidden items-center justify-center"
//                     style={{ display: "none" }}
//                   >
//                     <Globe className="w-6 h-6 text-slate-400" />
//                   </div>
//                 </div>
//                 <div className="text-white font-medium text-xs group-hover:text-blue-300 transition-colors duration-300 text-center max-w-16 truncate">
//                   {shortcut.name}
//                 </div>
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Add Form Modal */}
//       {showAddForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div
//             className="absolute inset-0 bg-black/50 backdrop-blur-md"
//             onClick={() => !isSubmitting && setShowAddForm(false)}
//           />
//           <div className="relative bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/50 p-8 max-w-2xl w-full shadow-2xl">
//             <button
//               onClick={() => !isSubmitting && setShowAddForm(false)}
//               disabled={isSubmitting}
//               className="absolute top-4 right-4 w-8 h-8 bg-slate-800/50 hover:bg-red-500 text-slate-400 hover:text-white rounded-full transition-all duration-300 flex items-center justify-center disabled:opacity-50"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <h3 className="text-2xl font-semibold text-white mb-6">
//               Add New Shortcut
//             </h3>

//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label className="block text-slate-300 text-sm font-medium mb-2">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="YouTube"
//                     value={currentShortcuts.name}
//                     onChange={(e) => handleInputChange("name", e.target.value)}
//                     disabled={isSubmitting}
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-slate-300 text-sm font-medium mb-2">
//                     URL
//                   </label>
//                   <input
//                     type="url"
//                     placeholder="https://youtube.com"
//                     value={currentShortcuts.url}
//                     onChange={(e) => handleInputChange("url", e.target.value)}
//                     disabled={isSubmitting}
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <button
//                   type="submit"
//                   disabled={
//                     !currentShortcuts.name ||
//                     !currentShortcuts.url ||
//                     isSubmitting
//                   }
//                   className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       Adding...
//                     </>
//                   ) : (
//                     "Save Shortcut"
//                   )}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowAddForm(false)}
//                   disabled={isSubmitting}
//                   className="px-8 py-3 bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white rounded-xl transition-all duration-300 disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Shortcuts;

"use client";

import { Loader2, Plus, X } from "lucide-react";
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
              id: Date.now() + 1,
              name: "YouTube",
              url: "https://youtube.com",
              favicon: null,
              faviconLoaded: false,
              faviconFailed: false,
            },
          ];
    }
    return [];
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

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

  // Test if image loads
  const testImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  };

  // Try fetching favicon from known services + fallback to page icon
  const getBestFavicon = async (url) => {
    try {
      const domain = new URL(url.startsWith("http") ? url : `https://${url}`)
        .hostname;
      const candidates = [
        `https://icons.duckduckgo.com/ip3/${domain}.ico`,
        `https://${domain}/favicon.ico`,
        `https://api.faviconkit.com/${domain}/64`,
      ];

      for (const iconUrl of candidates) {
        if (await testImage(iconUrl)) return iconUrl;
      }

      // Optionally try to parse favicon from HTML page (can fail due to CORS)
      const fetchIconFromPage = async (siteUrl) => {
        try {
          const response = await fetch(siteUrl, { mode: "cors" });
          const html = await response.text();
          const doc = new DOMParser().parseFromString(html, "text/html");
          const iconLink =
            doc.querySelector("link[rel='icon']") ||
            doc.querySelector("link[rel='shortcut icon']") ||
            doc.querySelector("link[rel*='apple-touch-icon']");
          if (iconLink) {
            let iconHref = iconLink.getAttribute("href");
            if (iconHref.startsWith("/")) {
              const base = new URL(siteUrl);
              iconHref = base.origin + iconHref;
            }
            return iconHref;
          }
        } catch {
          return null;
        }
        return null;
      };

      const pageIcon = await fetchIconFromPage(url);
      if (pageIcon && (await testImage(pageIcon))) {
        return pageIcon;
      }
    } catch {
      return null;
    }
    return null;
  };

  const generateLetterIcon = (name) => {
    const letter = name.charAt(0).toUpperCase();
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-green-500 to-green-600",
      "bg-gradient-to-br from-purple-500 to-purple-600",
      "bg-gradient-to-br from-red-500 to-red-600",
      "bg-gradient-to-br from-yellow-500 to-yellow-600",
      "bg-gradient-to-br from-pink-500 to-pink-600",
      "bg-gradient-to-br from-indigo-500 to-indigo-600",
      "bg-gradient-to-br from-teal-500 to-teal-600",
    ];
    const colorIndex = letter.charCodeAt(0) % colors.length;
    return {
      letter,
      colorClass: colors[colorIndex],
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentShortcuts.name || !currentShortcuts.url) return;

    setIsSubmitting(true);

    const newShortcut = {
      id: Date.now(),
      name: currentShortcuts.name,
      url: currentShortcuts.url,
      favicon: null,
      faviconLoaded: false,
      faviconFailed: false,
    };

    setCurrentShortcutsArray((prev) => [...prev, newShortcut]);
    setCurrentShortcuts({ name: "", url: "" });
    setShowAddForm(false);

    const bestIcon = await getBestFavicon(newShortcut.url);

    if (bestIcon) {
      setCurrentShortcutsArray((prev) =>
        prev.map((s) =>
          s.id === newShortcut.id
            ? {
                ...s,
                favicon: bestIcon,
                faviconLoaded: true,
                faviconFailed: false,
              }
            : s
        )
      );
    } else {
      setCurrentShortcutsArray((prev) =>
        prev.map((s) =>
          s.id === newShortcut.id ? { ...s, faviconFailed: true } : s
        )
      );
    }

    setIsSubmitting(false);
  };

  const removeShortcut = (index) => {
    setCurrentShortcutsArray((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (field, value) => {
    setCurrentShortcuts((prev) => ({ ...prev, [field]: value }));
  };

  // Drag handlers
  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    setDragOverIndex(null);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedItem !== null && draggedItem !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();
    const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (
      isNaN(sourceIndex) ||
      sourceIndex === dropIndex ||
      sourceIndex < 0 ||
      dropIndex < 0
    ) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }
    const newArray = [...currentShortcutsArray];
    const [movedItem] = newArray.splice(sourceIndex, 1);
    newArray.splice(dropIndex, 0, movedItem);
    setCurrentShortcutsArray(newArray);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleLinkClick = (e, url) => {
    if (draggedItem !== null) {
      e.preventDefault();
      return;
    }
    setTimeout(() => {
      window.open(url, "_self");
    }, 10);
    e.preventDefault();
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
            <div
              key={shortcut.id || index}
              className={`group relative transition-all duration-200 select-none cursor-grab active:cursor-grabbing ${
                dragOverIndex === index && draggedItem !== index
                  ? "scale-105 ring-2 ring-blue-400/50"
                  : ""
              } ${draggedItem === index ? "opacity-50 scale-95" : ""}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeShortcut(index);
                }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center text-xs hover:bg-red-600 z-20"
              >
                <X className="w-3 h-3" />
              </button>

              <div
                className="flex flex-col items-center"
                onClick={(e) =>
                  handleLinkClick(
                    e,
                    shortcut.url.startsWith("http")
                      ? shortcut.url
                      : `https://${shortcut.url}`
                  )
                }
              >
                <div
                  className={`w-14 h-14 bg-slate-800/20 backdrop-blur-sm rounded-full border shadow-sm transition-all duration-300 hover:scale-110 flex items-center justify-center mb-2 group-hover:shadow-blue-500/20 hover:bg-slate-700/30 ${
                    dragOverIndex === index && draggedItem !== index
                      ? "border-blue-400 shadow-lg shadow-blue-400/30"
                      : "border-slate-700/20 hover:border-blue-500/30"
                  }`}
                >
                  {shortcut.favicon &&
                  shortcut.faviconLoaded &&
                  !shortcut.faviconFailed ? (
                    <img
                      src={shortcut.favicon}
                      alt={shortcut.name}
                      className="w-8 h-8 rounded-lg pointer-events-none"
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        // If image is small (like 16x16), treat as fallback and mark failed
                        if (img.naturalWidth <= 16 && img.naturalHeight <= 16) {
                          setCurrentShortcutsArray((prev) =>
                            prev.map((s) =>
                              s.id === shortcut.id
                                ? {
                                    ...s,
                                    faviconFailed: true,
                                    faviconLoaded: false,
                                  }
                                : s
                            )
                          );
                        } else if (!shortcut.faviconLoaded) {
                          setCurrentShortcutsArray((prev) =>
                            prev.map((s) =>
                              s.id === shortcut.id
                                ? { ...s, faviconLoaded: true }
                                : s
                            )
                          );
                        }
                      }}
                      onError={() => {
                        setCurrentShortcutsArray((prev) =>
                          prev.map((s) =>
                            s.id === shortcut.id
                              ? { ...s, faviconFailed: true }
                              : s
                          )
                        );
                      }}
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-lg ${
                        generateLetterIcon(shortcut.name).colorClass
                      } flex items-center justify-center text-white font-bold text-lg shadow-inner`}
                    >
                      {generateLetterIcon(shortcut.name).letter}
                    </div>
                  )}
                </div>
                <div className="text-white font-medium text-xs group-hover:text-blue-300 transition-colors duration-300 text-center max-w-16 truncate">
                  {shortcut.name}
                </div>
              </div>
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
