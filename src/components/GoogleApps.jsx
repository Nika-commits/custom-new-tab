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

// Lucide icons work well with minimalist designs
const APPS = [
  { name: "MAIL", url: "https://mail.google.com", icon: <Mail size={16} /> },
  { name: "YOUTUBE", url: "https://youtube.com", icon: <Youtube size={16} /> },
  {
    name: "MUSIC",
    url: "https://music.youtube.com",
    icon: <Music size={16} />,
  },
  {
    name: "DRIVE",
    url: "https://drive.google.com",
    icon: <HardDrive size={16} />,
  },
  {
    name: "PHOTOS",
    url: "https://photos.google.com",
    icon: <Image size={16} />,
  },
  {
    name: "DOCS",
    url: "https://docs.google.com",
    icon: <FileText size={16} />,
  },
  {
    name: "CAL",
    url: "https://calendar.google.com",
    icon: <Calendar size={16} />,
  },
  { name: "GEMINI", url: "https://gemini.google.com", icon: <Box size={16} /> },
];

function GoogleApps() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-6 p-4">
      {APPS.map((app) => (
        <a
          key={app.name}
          href={app.url}
          className="group relative flex items-center justify-center w-6 h-6"
          target="_self"
        >
          <span className="text-zinc-700 group-hover:text-white transition-colors duration-300">
            {app.icon}
          </span>

          {/* Minimal Tooltip */}
          <span className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[9px] font-bold tracking-widest text-zinc-400 bg-black border border-zinc-900 px-2 py-1 pointer-events-none">
            {app.name}
          </span>
        </a>
      ))}
    </div>
  );
}

export default GoogleApps;
