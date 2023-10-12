import "./App.css";
import MidiDropZone from "./components/MidiDropZone";
import MidiJSONViewer from "./components/MidiJSONViewer";

function App() {
  return (
    <>
      <div className="App">
        <h1>Midi Player</h1>
        <MidiDropZone />
      </div>
    </>
  );
}

export default App;
