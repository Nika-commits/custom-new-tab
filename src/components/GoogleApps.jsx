function GoogleApps() {
  const gApps = [
    { name: "Gmail", url: "https://mail.google.com/mail/u/1/#inbox" },
    { name: "YouTube", url: "https://youtube.com" },
    { name: "YouTube Music", url: "https://music.youtube.com" },
  ];
  return (
    <div className="row-span-5 col-start-5 w-fit space-y-4 mt-4">
      <p className="text-xs text-gray-500">Google Apps:</p>
      {gApps.map((app, index) => (
        <button
          key={`same-tab-${index}`}
          onClick={() => (window.location.href = app.url)}
          className="block bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-sm font-medium cursor-pointer"
        >
          {app.name}
        </button>
      ))}
    </div>
  );
}

export default GoogleApps;
