import "./App.css";
import Search from "./components/search";
import { MetadataProvider } from "./metadata/metadataContext";
import Linkpreviewer from "./components/Linkpreviewer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <MetadataProvider>
        <Navbar />
        <Search />
        <Linkpreviewer />
      </MetadataProvider>
    </>
  );
}

export default App;
