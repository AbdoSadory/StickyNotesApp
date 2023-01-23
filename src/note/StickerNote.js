import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

const StickerNote = ({ element, newNote, delNote }) => {
  const pin = useRef();
  const addNoteBtn = useRef();
  const note = useRef();
  const isDraggable = useRef(false);
  const coordinations = useRef({
    coorX: 0,
    coorY: 0,
    coorLastX: 0,
    coorLastY: 0,
  });
  let formElement = useRef();
  const [noteBody, setNoteBody] = useState(element.note);
  const editBtn = useRef();
  const generateNumberWithLimits = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const generateRandomColor = () => {
    const maxValue = 0xffffff; // 16777215
    const randomNumber = Math.floor(Math.random() * maxValue).toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setNoteBody(e.target.elements.textAreaName.value);
    formElement.current.style.top = "unset";
    formElement.current.style.bottom = "100%";
  };
  const clickAndHold = (ele) => {
    let timer;
    const onMouseDown = () => {
      timer = setInterval(newNote, 100);
    };
    const stopInterval = () => {
      clearInterval(timer);
    };

    ele.addEventListener("mousedown", onMouseDown);
    ele.addEventListener("mouseup", stopInterval);
    ele.addEventListener("mouseout", stopInterval);

    const cleanUp = () => {
      ele.removeEventListener("mousedown", onMouseDown);
      ele.removeEventListener("mouseup", stopInterval);
      ele.removeEventListener("mouseout", stopInterval);
      stopInterval();
    };
    return cleanUp;
  };

  useEffect(() => {
    // document.addEventListener("click", (e) => {
    //   const isClosed = e.target.closest(".note_borders");
    //   if (!isClosed) {
    //     formElement.current && (formElement.current.style.top = "unset");
    //     formElement.current && (formElement.current.style.bottom = "100%");
    //   }
    // });
    const checkClickOutside = (e) => {
      // if the target "element" isn't the formElement.current do the Statement
      // why after deleting i have to check if the formElement isn't null !
      if (formElement.current) {
        if (!formElement.current.contains(e.target))
          formElement.current && (formElement.current.style.top = "unset");
        formElement.current && (formElement.current.style.bottom = "100%");
      }
    };
    document.addEventListener("click", checkClickOutside, true);
  }, []);
  useEffect(() => {
    if (!note.current) return;
    let top = generateNumberWithLimits(390, 25);
    let left = generateNumberWithLimits(1290, 45);
    note.current.style.top = `${top}px`;
    coordinations.current.coorLastY = top;
    note.current.style.left = `${left}px`;
    coordinations.current.coorLastX = left;
    note.current.style.transform = `rotateZ(${generateNumberWithLimits(
      20,
      -20
    )}deg)`;
    note.current.style.backgroundColor = `${generateRandomColor()}`;
  }, []);
  useEffect(() => {
    if (!pin.current || !note.current) return;

    const pinElement = pin.current;
    const noteElement = note.current;

    const onMouseDown = (e) => {
      // console.log("down");
      isDraggable.current = true;
      coordinations.current.coorX = `${e.clientX}`;
      coordinations.current.coorY = `${e.clientY}`;
    };
    const onMouseUp = (e) => {
      isDraggable.current = false;
      // console.log("up");
    };
    const onMouseMove = (e) => {
      if (isDraggable.current) {
        // console.log("move");
        let nextX =
          +e.clientX -
          coordinations.current.coorX +
          coordinations.current.coorLastX;
        let nextY =
          +e.clientY -
          coordinations.current.coorY +
          coordinations.current.coorLastY;
        noteElement.style.left = `${nextX}px`;
        noteElement.style.top = `${nextY}px`;
      }
    };
    const onMouseLeave = (e) => {
      isDraggable.current = false;
      // console.log("leave");
      coordinations.current.coorLastX = noteElement.offsetLeft;
      coordinations.current.coorLastY = noteElement.offsetTop;
    };
    pinElement.addEventListener("mousedown", (e) => {
      onMouseDown(e);
    });
    pinElement.addEventListener("mouseup", (e) => {
      onMouseUp(e);
    });
    noteElement.addEventListener("mousemove", (e) => {
      onMouseMove(e);
    });
    noteElement.addEventListener("mouseleave", (e) => {
      onMouseLeave(e);
    });
    const cleanUp = () => {
      pinElement.removeEventListener("mousedown", (e) => {
        onMouseDown(e);
      });
      pinElement.removeEventListener("mouseup", (e) => {
        onMouseUp(e);
      });
      pinElement.removeEventListener("mousemove", (e) => {
        onMouseMove(e);
      });
      noteElement.removeEventListener("mousemove", (e) => {
        onMouseMove(e);
      });
      noteElement.removeEventListener("mouseleave", (e) => {
        onMouseLeave(e);
      });
    };
    return cleanUp;
  }, []);
  useEffect(() => {
    const addBtn = addNoteBtn.current;
    clickAndHold(addBtn);
    // why i need to put it in dependency array ?
  }, []);
  return (
    <div
      className={`${styles.parent} note_borders`}
      ref={note}
      key={element.id}
    >
      <div className={`${styles.header} m-0 p-0`}>
        <svg
          ref={pin}
          className={`${styles.pin}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          width="35"
          height="35"
        >
          <path d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z" />
        </svg>
        <form
          className={`${styles.noteForm} text-end`}
          ref={formElement}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className={`${styles.textArea_container} m-0 p-0`}>
            <textarea
              className={`${styles.textArea}`}
              name="textAreaName"
              placeholder="Your Notes"
              rows={5}
              required
            ></textarea>
            <button type="submit" className={`${styles.submit_note} m-0 p-0`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="25"
                height="25"
              >
                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 416c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
              </svg>
            </button>
          </div>
        </form>
        <div
          className={`${styles.btns_container} row justify-content-between align-items-stretch m-0 p-0`}
        >
          <div
            className={`${styles.btn} col-2 m-0 p-2`}
            ref={addNoteBtn}
            onClick={() => {
              newNote();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20"
              height="20"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </div>
          <div className={`col-2`}></div>
          <div className={`col-2`}></div>
          <div
            className={`${styles.btn} col-2 m-0 p-2`}
            ref={editBtn}
            onClick={() => {
              formElement.current.style.top = "0";
              formElement.current.style.bottom = "unset";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="20"
              height="20"
            >
              <path d="M512 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V128C576 92.65 547.3 64 512 64zM528 384c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V128c0-8.822 7.178-16 16-16h448c8.822 0 16 7.178 16 16V384zM140 152h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C152 157.3 146.7 152 140 152zM196 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C184 194.7 189.3 200 196 200zM276 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C264 194.7 269.3 200 276 200zM356 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C344 194.7 349.3 200 356 200zM460 152h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C472 157.3 466.7 152 460 152zM140 232h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C152 237.3 146.7 232 140 232zM196 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C184 274.7 189.3 280 196 280zM276 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C264 274.7 269.3 280 276 280zM356 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C344 274.7 349.3 280 356 280zM460 232h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C472 237.3 466.7 232 460 232zM400 320h-224C167.1 320 160 327.1 160 336V352c0 8.875 7.125 16 16 16h224c8.875 0 16-7.125 16-16v-16C416 327.1 408.9 320 400 320z" />
            </svg>
          </div>
          <div
            className={`${styles.btn} col-2 m-0 p-2`}
            onClick={() => {
              delNote(element.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20"
              height="20"
            >
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </div>
        </div>
      </div>
      <div className={`${styles.note_body}`}>{noteBody}</div>
    </div>
  );
};
export default StickerNote;
