import "./App.css";
import StickerNote from "./note/StickerNote";

function App() {
  let notes = [
    { id: 1, note: "note number 1" },
    { id: 2, note: "note number 2" },
    { id: 3, note: "note number 3" },
    { id: 4, note: "note number 4" },
  ];
  return (
    <div className="App">
      <StickerNote />
    </div>
  );
}

export default App;
