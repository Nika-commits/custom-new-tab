import Clock from "./components/Clock";
import GoogleApps from "./components/GoogleApps";
import SearchBar from "./components/SearchBar";
import Shortcuts from "./components/Shortcuts";
import Welcome from "./components/Welcome";
import "./index.css";

function App() {
  return (
    <>
      <Welcome />
      <Clock />
      <SearchBar />
      <Shortcuts />
      <GoogleApps />
    </>
  );
}

export default App;
