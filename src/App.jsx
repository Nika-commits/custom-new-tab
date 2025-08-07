import Clock from "./components/Clock";
import GoogleApps from "./components/GoogleApps";
import SearchBar from "./components/SearchBar";
import Shortcuts from "./components/Shortcuts";
import Weather from "./components/Weather";
import Welcome from "./components/Welcome";
import "./index.css";

function App() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <Clock />
      <Welcome />
      <SearchBar />
      <Shortcuts />
      {/* col-span-3 row-span-2 col-start-2 row-start-4 max-w-4xl mx-auto p-6
 w-full" */}

      <GoogleApps />
      <Weather />
    </div>
  );
}

export default App;
