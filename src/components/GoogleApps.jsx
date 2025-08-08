function GoogleApps() {
  const gApps = [
    {
      name: "Gmail",
      url: "https://mail.google.com/mail/u/1/#inbox",
      favicon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
      color: "from-red-500/20 to-red-600/30",
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      favicon: "https://www.youtube.com/favicon.ico",
      color: "from-red-600/20 to-red-700/30",
    },
    {
      name: "YouTube Music",
      url: "https://music.youtube.com",
      favicon: "https://music.youtube.com/favicon.ico",
      color: "from-red-500/20 to-pink-600/30",
    },
    {
      name: "Drive",
      url: "https://drive.google.com",
      favicon:
        "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png",
      color: "from-blue-500/20 to-blue-600/30",
    },
    {
      name: "Photos",
      url: "https://photos.google.com",
      favicon:
        "https://www.google.com/photos/about/static/images/icon_photos_192.png",
      color: "from-green-500/20 to-green-600/30",
    },
    {
      name: "Docs",
      url: "https://docs.google.com",
      favicon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico",
      color: "from-blue-600/20 to-indigo-600/30",
    },
    {
      name: "Calendar",
      url: "https://calendar.google.com",
      favicon:
        "https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_31.ico",
      color: "from-orange-500/20 to-orange-600/30",
    },
    {
      name: "Gemini",
      url: "https://gemini.google.com",
      favicon:
        "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
      color: "from-purple-500/20 to-purple-600/30",
    },
    {
      name: "Colab",
      url: "https://colab.research.google.com",
      favicon: "https://colab.research.google.com/img/colab_favicon_256px.png",
      color: "from-yellow-500/20 to-orange-500/30",
    },
    {
      name: "Keep",
      url: "https://keep.google.com",
      favicon: "https://ssl.gstatic.com/keep/icon_2020q4v2_128.png",
      color: "from-yellow-400/20 to-yellow-500/30",
    },
  ];

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col items-center space-y-3">
      {/* Header */}
      {/* <div className="text-xs text-slate-400/80 font-medium tracking-wide mb-2">
        Google Apps
      </div> */}

      {/* App Icons */}
      <div
        className="flex flex-col space-y-3"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {gApps.map((app, index) => (
          <button
            key={`google-app-${index}`}
            onClick={() => window.open(app.url, "_blank")}
            className={`
              group relative w-14 h-14 rounded-2xl
              bg-gradient-to-br ${app.color}
              backdrop-blur-sm border border-white/10
              hover:border-white/20 hover:scale-105
              transition-all duration-300 ease-out
              shadow-lg hover:shadow-xl hover:shadow-black/25
              flex items-center justify-center
              cursor-pointer overflow-hidden
            `}
            title={app.name}
          >
            {/* Background glow effect */}
            <div
              className={`
              absolute inset-0 bg-gradient-to-br ${app.color}
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              rounded-2xl blur-sm
            `}
            />

            {/* Real Favicon */}
            <img
              src={app.favicon}
              alt={app.name}
              className="relative z-10 w-8 h-8 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-200"
              onError={(e) => {
                // Fallback to Google's favicon service if the direct favicon fails
                e.target.src = `https://www.google.com/s2/favicons?domain=${
                  new URL(app.url).hostname
                }&sz=32`;
              }}
            />

            {/* Subtle inner highlight */}
            <div className="absolute inset-0.5 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-60" />

            {/* Hover tooltip */}
            <div
              className={`
              absolute right-16 top-1/2 transform -translate-y-1/2
              px-3 py-1.5 bg-slate-800/90 backdrop-blur-sm
              text-white text-xs font-medium rounded-lg
              border border-white/10 shadow-lg
              opacity-0 group-hover:opacity-100
              translate-x-2 group-hover:translate-x-0
              transition-all duration-200 pointer-events-none
              whitespace-nowrap z-20
            `}
            >
              {app.name}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-slate-800/90 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default GoogleApps;
