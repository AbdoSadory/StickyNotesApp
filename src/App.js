import { useState } from "react";
import "./App.css";
import StickerNote from "./note/StickerNote";

function App() {
  const [notes, setNotes] = useState([
    { id: 1, note: "note number 1" },
    { id: 2, note: "note number 2" },
  ]);
  const handleNewNote = () => {
    const newNoteData = { id: Math.random(), note: "new note" };
    setNotes((prevNotes) => [...prevNotes, newNoteData]);
  };
  const handleDelNote = (id) => {
    const updatedNotes = [...notes.filter((ele) => ele.id !== id)];
    setNotes(updatedNotes);
  };
  return (
    <div className="App">
      {notes.length === 0 && (
        <button
          className={`add_note_btn`}
          onClick={() => {
            handleNewNote();
          }}
        >
          Add Note
        </button>
      )}
      {notes.length > 0
        ? notes.map((ele) => (
            <StickerNote
              key={ele.id}
              element={ele}
              newNote={handleNewNote}
              delNote={handleDelNote}
            />
          ))
        : null}
    </div>
  );
}

export default App;
