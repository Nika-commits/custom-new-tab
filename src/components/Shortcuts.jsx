"use client";

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Loader2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// --- Sub-Component: Individual Shortcut Card ---
function ShortcutItem({ shortcut, onRemove, onFaviconError }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: shortcut.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const letter = shortcut.name.charAt(0).toUpperCase();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative h-28 flex flex-col justify-between
        bg-zinc-900 border-2 border-zinc-700
        transition-all duration-200
        ${
          isDragging
            ? "opacity-50 z-50 shadow-none scale-95"
            : "hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000]"
        }
      `}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-0 left-0 p-1 cursor-grab active:cursor-grabbing hover:bg-zinc-800 z-10 text-zinc-600 hover:text-zinc-300 transition-colors"
      >
        <GripVertical className="w-3 h-3" />
      </div>

      {/* Remove Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(shortcut.id);
        }}
        className="absolute top-0 right-0 p-1 bg-transparent hover:bg-red-600 text-transparent group-hover:text-zinc-500 hover:text-white transition-colors z-20"
        type="button"
      >
        <X className="w-3 h-3" />
      </button>

      {/* Main Link Area */}
      <a
        href={
          shortcut.url.startsWith("http")
            ? shortcut.url
            : `https://${shortcut.url}`
        }
        onClick={(e) => {
          if (isDragging) e.preventDefault();
        }}
        className="flex flex-col items-center justify-center h-full p-2 text-center no-underline gap-2"
        target="_self"
        rel="noopener noreferrer"
      >
        {/* BIGGER ICON CONTAINER (w-12 h-12) */}
        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-zinc-800 border border-zinc-600 group-hover:bg-zinc-700 transition-colors">
          {shortcut.favicon ? (
            <img
              src={shortcut.favicon}
              alt={shortcut.name}
              className="w-8 h-8 object-contain"
              onError={() => onFaviconError(shortcut.id)}
              loading="lazy"
            />
          ) : (
            <span className="text-xl font-mono font-bold text-zinc-400">
              {letter}
            </span>
          )}
        </div>

        {/* Text Area (Below Icon) */}
        <span className="text-[10px] font-mono font-bold uppercase text-zinc-400 truncate w-full px-1 tracking-wider group-hover:text-zinc-100 transition-colors">
          {shortcut.name}
        </span>
      </a>
    </div>
  );
}

// --- Main Shortcuts Component ---
export default function Shortcuts() {
  const [shortcuts, setShortcuts] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("shortcuts");
      return stored
        ? JSON.parse(stored)
        : [
            {
              id: Date.now(),
              name: "YouTube",
              url: "https://youtube.com",
              favicon: null,
            },
          ];
    } catch {
      return [
        {
          id: Date.now(),
          name: "YouTube",
          url: "https://youtube.com",
          favicon: null,
        },
      ];
    }
  });

  const [form, setForm] = useState({ name: "", url: "" });
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const saveTimeout = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      try {
        localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
      } catch (error) {
        console.error("Failed to save shortcuts:", error);
      }
    }, 500);

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [shortcuts]);

  const getFavicon = useCallback(async (url) => {
    try {
      const domain = new URL(url.startsWith("http") ? url : `https://${url}`)
        .hostname;
      const candidates = [
        `https://icons.duckduckgo.com/ip3/${domain}.ico`,
        `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
      ];

      for (const iconUrl of candidates) {
        const valid = await new Promise((resolve) => {
          const img = new Image();
          const timer = setTimeout(() => {
            img.src = "";
            resolve(false);
          }, 3000);

          img.onload = () => {
            clearTimeout(timer);
            resolve(img.naturalWidth > 16);
          };
          img.onerror = () => {
            clearTimeout(timer);
            resolve(false);
          };
          img.src = iconUrl;
        });
        if (valid) return iconUrl;
      }
      return null;
    } catch (error) {
      console.error("Error fetching favicon:", error);
      return null;
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!form.name.trim() || !form.url.trim()) return;

      setIsSubmitting(true);

      const tempId = Date.now();
      const newShortcut = {
        id: tempId,
        name: form.name.trim(),
        url: form.url.trim(),
        favicon: null,
      };

      setShortcuts((prev) => [...prev, newShortcut]);
      setForm({ name: "", url: "" });

      const favicon = await getFavicon(newShortcut.url);

      if (favicon) {
        setShortcuts((prev) =>
          prev.map((s) => (s.id === tempId ? { ...s, favicon } : s)),
        );
      }

      setIsSubmitting(false);
      setShowForm(false);
    },
    [form, getFavicon],
  );

  const removeShortcut = useCallback((id) => {
    setShortcuts((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const handleFaviconError = useCallback((id) => {
    setShortcuts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, favicon: null } : s)),
    );
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setShortcuts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  return (
    <div
      className={`relative w-full max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      {/* CUSTOM SCROLLBAR STYLES */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #18181b; /* zinc-900 */
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #3f3f46; /* zinc-700 */
            border: 1px solid #18181b;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #52525b; /* zinc-600 */
          }
        `}
      </style>

      {/* Header */}
      <div className="flex items-center justify-between mb-2 border-b border-zinc-800 pb-1">
        <h2 className="text-[10px] font-bold font-mono text-zinc-600 uppercase tracking-widest pl-1">
          // QUICK_LINKS
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-[10px] font-mono font-bold text-zinc-500 uppercase hover:text-zinc-100 hover:bg-zinc-800 px-2 py-1 transition-colors"
          type="button"
        >
          {showForm ? "[-] CANCEL" : "[+] ADD"}
        </button>
      </div>

      {/* Grid Area - Scrollable Container with Custom Scrollbar */}
      <div className="max-h-[35vh] overflow-y-auto custom-scrollbar pr-1">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={shortcuts.map((s) => s.id)}
            strategy={rectSortingStrategy}
          >
            {/* Responsive Grid:
               - Mobile: 3 columns
               - Tablet: 4 columns
               - Desktop: 6 columns
               - Large Desktop: 8 columns (High Density)
            */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {shortcuts.map((shortcut) => (
                <ShortcutItem
                  key={shortcut.id}
                  shortcut={shortcut}
                  onRemove={removeShortcut}
                  onFaviconError={handleFaviconError}
                />
              ))}

              {shortcuts.length === 0 && (
                <div className="col-span-full py-8 text-center border-2 border-dashed border-zinc-800">
                  <span className="text-zinc-600 font-mono text-xs uppercase">
                    NO_ENTRIES_FOUND
                  </span>
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Modal - Rendered via Portal */}
      {showForm &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/80 backdrop-grayscale z-[9999] flex items-center justify-center p-4"
            onClick={() => !isSubmitting && setShowForm(false)}
          >
            <div
              className="w-full max-w-md bg-zinc-900 border-2 border-zinc-500 shadow-[8px_8px_0px_0px_#fff] p-6 relative animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6 border-b border-zinc-700 pb-2">
                <h3 className="text-lg font-bold font-mono text-zinc-100 uppercase">
                  SYSTEM_ADD_ENTRY
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-zinc-500 hover:text-red-500 transition-colors"
                  disabled={isSubmitting}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold font-mono text-zinc-500 uppercase mb-2">
                    Display_Name
                  </label>
                  <input
                    type="text"
                    placeholder="E.G. GOOGLE"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    disabled={isSubmitting}
                    className="w-full bg-black border-2 border-zinc-700 text-zinc-100 p-3 font-mono text-sm focus:outline-none focus:border-white focus:bg-zinc-900 placeholder-zinc-700 uppercase disabled:opacity-50"
                    required
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-mono text-zinc-500 uppercase mb-2">
                    Target_URL
                  </label>
                  <input
                    type="url"
                    placeholder="HTTPS://EXAMPLE.COM"
                    value={form.url}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, url: e.target.value }))
                    }
                    disabled={isSubmitting}
                    className="w-full bg-black border-2 border-zinc-700 text-zinc-100 p-3 font-mono text-sm focus:outline-none focus:border-white focus:bg-zinc-900 placeholder-zinc-700 uppercase disabled:opacity-50"
                    required
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-zinc-100 text-black border-2 border-zinc-100 py-3 font-mono font-bold uppercase hover:bg-white hover:border-white disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        PROCESSING
                      </>
                    ) : (
                      "CONFIRM_SAVE"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    disabled={isSubmitting}
                    className="px-6 border-2 border-zinc-700 text-zinc-500 font-mono font-bold uppercase hover:border-zinc-500 hover:text-zinc-300 disabled:opacity-50"
                  >
                    ABORT
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
