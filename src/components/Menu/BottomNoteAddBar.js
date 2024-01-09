import { useContext, useRef, useState } from "react";
import { TodoListStateContext } from "../../App";

const BottomNoteAddBar = () => {
  const [title, setTitle] = useState("");
  const titleRef = useRef();
  const { onAddNote } = useContext(TodoListStateContext);

  const submitTitle = () => {
    if (title.length < 1) {
      titleRef.current.focus();
      return;
    }

    onAddNote(title);
    setTitle("");
  };

  return (
    <div className="glow-0 h-14 flex items-center">
      <div
        className="h-12 p-2 w-full space-x-2 rounded-md flex hover:bg-content-box-hover items-center bg-content-box"
        onClick={() => titleRef.current.focus()}
      >
        <span className="text-2xl justify-self-center grow-0">
          <svg
            className="w-4 h-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </span>
        <input
          className="placeholder:italic outline-none grow bg-transparent min-w-16"
          placeholder="새 목록 추가"
          value={title}
          ref={titleRef}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitTitle();
            }
          }}
        ></input>
        {/* <button
          className="rounded bg-content-btn w-10 grow-0 h-4/5"
          onClick={submitTitle}
        >
          추가
        </button> */}
      </div>
    </div>
  );
};

export default BottomNoteAddBar;
