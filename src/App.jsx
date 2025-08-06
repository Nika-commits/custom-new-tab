import Clock from "./components/Clock";
import GoogleApps from "./components/GoogleApps";
import SearchBar from "./components/SearchBar";
import Shortcuts from "./components/Shortcuts";
import Weather from "./components/Weather";
import Welcome from "./components/Welcome";
import "./index.css";

// <div className="grid grid-cols-5 grid-rows-5 gap-4">
//     <div className="row-span-2">1</div>
//     <div className="col-span-3 row-span-2">2</div>
//     <div className="row-span-5 col-start-5">3</div>
//     <div className="col-span-3 col-start-2 row-start-3">4</div>
//     <div className="col-span-3 row-span-2 col-start-2 row-start-4">5</div>
//     <div className="row-span-3 col-start-1 row-start-3">6</div>
// </div>

function App() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <Welcome />
      <Clock />
      <SearchBar />
      <Shortcuts />
      <GoogleApps />
      <Weather />
    </div>
  );
}

export default App;
