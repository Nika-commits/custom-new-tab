// 1. Data moved outside component (Static Constant)
const APPS = [
  {
    name: "GMAIL",
    url: "https://mail.google.com/mail/u/0/#inbox",
    // Using high-res logos where possible, falling back to S2 service
    icon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
  },
  {
    name: "YOUTUBE",
    url: "https://youtube.com",
    icon: "https://www.youtube.com/favicon.ico",
  },
  {
    name: "MUSIC",
    url: "https://music.youtube.com",
    icon: "https://music.youtube.com/favicon.ico",
  },
  {
    name: "DRIVE",
    url: "https://drive.google.com",
    icon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png",
  },
  {
    name: "PHOTOS",
    url: "https://photos.google.com",
    icon: "https://www.gstatic.com/images/branding/product/1x/photos_2020q4_48dp.png",
  },
  {
    name: "DOCS",
    url: "https://docs.google.com",
    icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico",
  },
  {
    name: "CALENDAR",
    url: "https://calendar.google.com",
    icon: "https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_31.ico",
  },
  {
    name: "GEMINI",
    url: "https://gemini.google.com",
    icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
  },
];

function GoogleApps() {
  return (
    // Fixed container on the right
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 p-4">
      {/* Brutalist Sidebar Container: Dark Zinc, Thick Border, Hard Shadow */}
      <div className="flex flex-col gap-3 bg-zinc-900 border-2 border-zinc-700 p-3 shadow-[6px_6px_0px_0px_#000]">
        {/* Decorative Header */}
        <div className="border-b-2 border-zinc-800 pb-2 mb-1">
          <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-widest writing-mode-vertical">
            APPS
          </span>
        </div>

        {APPS.map((app) => (
          <a
            key={app.name}
            href={app.url}
            // 2. Semantic HTML <a> instead of button
            className="group relative w-10 h-10 flex items-center justify-center bg-zinc-800 border border-zinc-600 transition-all duration-100  hover:border-zinc-100 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#000]"
            target="_self"
            rel="noopener noreferrer"
          >
            {/* Icon: Grayscale by default, color on hover */}
            <img
              src={app.icon}
              alt={app.name}
              className="w-5 h-5 opacity-70 grayscale transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
              onError={(e) => {
                // 4. Robust Fallback
                e.target.style.display = "none";
                // Alternatively, switch source to generic google favicon service:
                // e.target.src = `https://www.google.com/s2/favicons?domain=${new URL(app.url).hostname}&sz=32`;
              }}
            />

            {/* 3. Brutalist Tooltip (CSS only) */}
            <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-100 z-50">
              <div className="flex items-center">
                <div className="bg-zinc-900 border border-zinc-500 text-zinc-100 px-2 py-1 shadow-[4px_4px_0px_0px_#000]">
                  <span className="text-[10px] font-mono font-bold tracking-widest whitespace-nowrap">
                    {app.name}
                  </span>
                </div>
                {/* Connector Line */}
                <div className="w-4 h-[2px] bg-zinc-500"></div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default GoogleApps;
