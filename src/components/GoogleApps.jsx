function GoogleApps() {
  const gApps = [
    {
      name: "Gmail",
      url: "https://mail.google.com/mail/u/0/#inbox",
      favicon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
      color: "from-red-500/20 to-red-600/20",
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      favicon: "https://www.youtube.com/favicon.ico",
      color: "from-red-600/20 to-red-700/20",
    },
    {
      name: "YouTube Music",
      url: "https://music.youtube.com",
      favicon: "https://music.youtube.com/favicon.ico",
      color: "from-red-500/20 to-pink-600/20",
    },
    {
      name: "Drive",
      url: "https://drive.google.com",
      favicon:
        "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png",
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      name: "Photos",
      url: "https://photos.google.com",
      favicon:
        "https://www.google.com/photos/about/static/images/icon_photos_192.png",
      color: "from-green-500/20 to-green-600/20",
    },
    {
      name: "Docs",
      url: "https://docs.google.com",
      favicon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico",
      color: "from-blue-600/20 to-indigo-600/20",
    },
    {
      name: "Calendar",
      url: "https://calendar.google.com",
      favicon:
        "https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_31.ico",
      color: "from-orange-500/20 to-orange-600/20",
    },
    {
      name: "Gemini",
      url: "https://gemini.google.com",
      favicon:
        "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
      color: "from-purple-500/20 to-purple-600/20",
    },
  ];

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col items-center space-y-2 p-6">
      <div className="flex flex-col p-4 bg-slate-800/20 backdrop-blur-sm rounded-xl space-y-2">
        {gApps.map((app, index) => (
          <button
            key={`google-app-${index}`}
            onClick={() => window.open(app.url, "_self")}
            className={`
              group relative w-12 h-12 rounded-xl
              bg-slate-800/20 backdrop-blur-sm border border-slate-700/10
              hover:border-slate-600/30 hover:scale-105 hover:bg-slate-700/30
              transition-all duration-200 ease-out
              shadow-sm hover:shadow-lg
              flex items-center justify-center
              cursor-pointer overflow-hidden
            `}
            title={app.name}
          >
            <img
              src={app.favicon}
              alt={app.name}
              className="relative z-10 w-7 h-7 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-200"
              onError={(e) => {
                e.target.src = `https://www.google.com/s2/favicons?domain=${
                  new URL(app.url).hostname
                }&sz=32`;
              }}
            />

            {/* Tooltip */}
            <div className="absolute right-14 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-slate-800/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg border border-slate-700/30 shadow-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-20">
              {app.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default GoogleApps;
