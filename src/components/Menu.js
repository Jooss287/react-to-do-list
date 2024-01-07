import React, { useContext, useEffect, useRef, useState } from "react";
import { TodoListStateContext } from "../App";
import { EditSvg, TrashSvg } from "../icon_components/SvgLists";

const initFilter = ["오늘 할 일", "중요", "계획된 일정", "작업"];

const Menu = ({ note }) => {
  const titleRef = useRef();
  const [title, setTitle] = useState("");
  const { onAddNote, onChangeNote } = useContext(TodoListStateContext);

  const submitTitle = () => {
    if (title.length < 1) {
      titleRef.current.focus();
      return;
    }

    onAddNote(title);
    setTitle("");
  };

  const changeCurrentNote = (id) => {
    onChangeNote(id);
  };

  useEffect(() => {}, [note]);

  return (
    <menu className="Menu w-80 h-screen bg-cream-white flex flex-col space-y-1 p-5">
      <div className="grow-0 items-center space-y-1">
        {initFilter.map((item) => (
          <div
            className="h-9 w-full px-2 hover:bg-menu-color-hover rounded flex items-center"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="justify-self-center border-b-2 border-dashed border-neutral-400 w-full h-2" />
      <div className="h-full grow items-center space-y-1">
        {note.map((item) => (
          <div
            className="flex flex-row w-full items-center hover:bg-menu-color-hover rounded cursor-pointer"
            key={item.noteId}
          >
            <div
              className="grow h-9 px-2 flex items-center "
              onClick={() => changeCurrentNote(item.noteId)}
            >
              {item.noteTitle}
            </div>
            <span className="justify-end mr-1 opacity-50 hover:opacity-90">
              <EditSvg size={5} />
            </span>
            <span className="justify-end mr-1 opacity-50 hover:opacity-90">
              <TrashSvg size={5} />
            </span>
          </div>
        ))}
      </div>
      <div className="glow-0 h-16 flex items-center">
        <div
          className="h-14 p-2 w-full space-x-2 rounded-md flex hover:bg-content-box-hover items-center bg-content-box"
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
            ref={titleRef}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          ></input>
          <button
            className="rounded bg-content-btn w-10 grow-0 h-4/5"
            onClick={submitTitle}
          >
            추가
          </button>
        </div>
      </div>
    </menu>
  );
};
export default Menu;
