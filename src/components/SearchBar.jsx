export default function SearchBar() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.q.value.trim();
    if (query) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
        query
      )}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div>
        <label className="text-3xl">Search</label>
        <input
          name="q"
          type="text"
          placeholder="Search Google..."
          className="w-full p-3 rounded text-black"
        />
      </div>
    </form>
  );
}
