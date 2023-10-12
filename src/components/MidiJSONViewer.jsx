import React, { useState } from "react";

function MidiJSONViewer({ midiFiles }) {
  const [expanded, setExpanded] = useState(false);

  const activeMidiFile = midiFiles.find((file) => file.active) || midiFiles[0];

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`midi-json-viewer ${expanded ? "expanded" : ""}`}>
      <button onClick={toggleExpand}>{expanded ? "Collapse" : "Expand"}</button>
      {activeMidiFile ? (
        <pre className="json-content">
          {JSON.stringify(activeMidiFile.data, null, 2)}
        </pre>
      ) : (
        <p>No MIDI file selected.</p>
      )}
    </div>
  );
}

export default MidiJSONViewer;
