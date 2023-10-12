import React, { useState, useCallback } from "react";
import { Midi } from "@tonejs/midi";
import MidiJSONViewer from "./MidiJSONViewer";

function MidiDropZone(props) {
  const [midiFiles, setMidiFiles] = useState([]);

  const handleDrop = useCallback(async (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    const midiFilePromises = Array.from(files)
      .filter((file) => file.type === "audio/midi")
      .map((file) =>
        file.arrayBuffer().then((data) => ({
          data: new Midi(data),
          name: file.name,
          active: false,
        }))
      );

    const newMidiFiles = await Promise.all(midiFilePromises);
    setMidiFiles((prevMidiFiles) => [...prevMidiFiles, ...newMidiFiles]);
  }, []);

  const handleCardClick = (index) => {
    setMidiFiles((prevFiles) =>
      prevFiles.map((file, i) => ({
        ...file,
        active: i === index,
      }))
    );
  };

  return (
    <div className="midi-dropzone-container">
      <div
        className="midi-dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        Drop midi file here
      </div>
      {midiFiles.map((file, index) => (
        <div
          key={index}
          className={`midi-card ${file.active ? "active" : ""}`}
          onClick={() => handleCardClick(index)}
        >
          {file.name}
        </div>
      ))}
      {props.children}

      <MidiJSONViewer midiFiles={midiFiles} />
    </div>
  );
}

export default MidiDropZone;
