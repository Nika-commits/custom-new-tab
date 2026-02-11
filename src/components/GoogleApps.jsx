import {
  Box,
  Calendar,
  FileText,
  HardDrive,
  Image,
  Mail,
  Music,
  Youtube,
} from "lucide-react";

const APPS = [
  // Defined specific tailwind text colors for each brand
  {
    name: "MAIL",
    url: "https://mail.google.com",
    color: "text-red-500",
    icon: <Mail size={20} />,
  },
  {
    name: "YOUTUBE",
    url: "https://youtube.com",
    color: "text-red-600",
    icon: <Youtube size={20} />,
  },
  {
    name: "MUSIC",
    url: "https://music.youtube.com",
    color: "text-rose-500",
    icon: <Music size={20} />,
  },
  {
    name: "DRIVE",
    url: "https://drive.google.com",
    color: "text-blue-500",
    icon: <HardDrive size={20} />,
  },
  {
    name: "PHOTOS",
    url: "https://photos.google.com",
    color: "text-yellow-500",
    icon: <Image size={20} />,
  },
  {
    name: "DOCS",
    url: "https://docs.google.com",
    color: "text-blue-400",
    icon: <FileText size={20} />,
  },
  {
    name: "CAL",
    url: "https://calendar.google.com",
    color: "text-green-500",
    icon: <Calendar size={20} />,
  },
  {
    name: "GEMINI",
    url: "https://gemini.google.com",
    color: "text-purple-500",
    icon: <Box size={20} />,
  },
];

function GoogleApps() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-6 p-4">
      {APPS.map((app) => (
        <a
          key={app.name}
          href={app.url}
          className="group relative flex items-center justify-center w-8 h-8 transition-transform hover:scale-110 duration-200"
          target="_self"
        >
          {/* Icon with specific brand color */}
          <span
            className={`${app.color} drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]`}
          >
            {app.icon}
          </span>

          {/* Tooltip */}
          <span className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[9px] font-bold tracking-widest text-zinc-300 bg-zinc-900 border border-zinc-700 px-2 py-1 pointer-events-none uppercase">
            {app.name}
          </span>
        </a>
      ))}
    </div>
  );
}

export default GoogleApps;
