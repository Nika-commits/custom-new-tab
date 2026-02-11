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
import { GripVertical, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// --- Shortcut Item ---
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex flex-col items-center justify-center p-4 transition-all duration-200 cursor-pointer border border-transparent hover:border-zinc-800 hover:bg-zinc-900/50
        ${isDragging ? "opacity-30 scale-95" : ""}
      `}
    >
      {/* Hidden Controls */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 cursor-grab text-zinc-600 hover:text-white p-1 transition-opacity"
      >
        <GripVertical size={14} />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(shortcut.id);
        }}
        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-500 p-1 transition-opacity"
      >
        <X size={14} />
      </button>

      <a
        href={
          shortcut.url.startsWith("http")
            ? shortcut.url
            : `https://${shortcut.url}`
        }
        onClick={(e) => {
          if (isDragging) e.preventDefault();
        }}
        className="flex flex-col items-center gap-3 w-full"
        target="_self"
      >
        {/* Minimal Icon Container */}
        <div className="w-12 h-12 flex items-center justify-center  transition-all duration-300">
          {shortcut.favicon ? (
            <img
              src={shortcut.favicon}
              alt=""
              className="w-8 h-8 object-contain"
              onError={() => onFaviconError(shortcut.id)}
            />
          ) : (
            <div className="w-full h-full border border-zinc-700 flex items-center justify-center text-zinc-500 font-bold font-mono text-xl">
              {shortcut.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Text Label */}
        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 group-hover:text-zinc-300 transition-colors text-center w-full truncate">
          {shortcut.name}
        </span>
      </a>
    </div>
  );
}

// --- Main Component ---
export default function Shortcuts() {
  const [shortcuts, setShortcuts] = useState(() => {
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
      return [];
    }
  });

  const [form, setForm] = useState({ name: "", url: "" });
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  useEffect(() => {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  }, [shortcuts]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setShortcuts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const removeShortcut = (id) =>
    setShortcuts((p) => p.filter((s) => s.id !== id));

  const handleFaviconError = (id) => {
    setShortcuts((p) =>
      p.map((s) => (s.id === id ? { ...s, favicon: null } : s)),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.url.trim()) return;
    setIsSubmitting(true);

    // Quick Favicon Fetch using Google S2
    const domain = new URL(
      form.url.startsWith("http") ? form.url : `https://${form.url}`,
    ).hostname;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

    const newShortcut = {
      id: Date.now(),
      name: form.name,
      url: form.url,
      favicon: faviconUrl,
    };

    setShortcuts((p) => [...p, newShortcut]);
    setIsSubmitting(false);
    setShowForm(false);
    setForm({ name: "", url: "" });
  };

  return (
    <div className="w-full mt-4">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-zinc-900 pb-2 mb-4 px-2">
        <span className="text-[10px] font-bold text-zinc-700 tracking-widest uppercase">
          APPS_GRID //
        </span>
        <button
          onClick={() => setShowForm(true)}
          className="text-[10px] font-bold text-zinc-600 hover:text-white transition-colors hover:underline decoration-zinc-600 underline-offset-4 uppercase"
        >
          [+] ADD_NEW
        </button>
      </div>

      {/* Grid */}
      <div className="max-h-[30vh] overflow-y-auto minimal-scroll pr-1">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={shortcuts.map((s) => s.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {shortcuts.map((shortcut) => (
                <ShortcutItem
                  key={shortcut.id}
                  shortcut={shortcut}
                  onRemove={removeShortcut}
                  onFaviconError={handleFaviconError}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Modal Portal */}
      {showForm &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={() => !isSubmitting && setShowForm(false)}
          >
            <div
              className="w-full max-w-sm border border-zinc-700 bg-black p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white tracking-tight uppercase">
                  NEW_SHORTCUT
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-zinc-600 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="text-[10px] font-bold text-zinc-600 uppercase mb-2 block">
                    Display Name
                  </label>
                  <input
                    autoFocus
                    className="w-full bg-transparent border-b border-zinc-800 py-2 text-white outline-none focus:border-white transition-colors font-mono uppercase text-sm"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="E.G. TWITTER"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-600 uppercase mb-2 block">
                    Target URL
                  </label>
                  <input
                    className="w-full bg-transparent border-b border-zinc-800 py-2 text-white outline-none focus:border-white transition-colors font-mono uppercase text-sm"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    placeholder="HTTPS://..."
                  />
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    disabled={isSubmitting}
                    className="flex-1 bg-white text-black font-bold py-3 hover:bg-zinc-200 transition-colors uppercase text-sm"
                  >
                    {isSubmitting ? "SAVING..." : "CONFIRM"}
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
