import { useContext, useEffect, useRef, useState } from "react";
import { TodoListDispatchContext, TodoListStateContext } from "../App";

const Header = () => {
  const titleEditRef = useRef();
  const [currentNote, setCurrentNote] = useState({ noteTitle: "Unknown" });
  const [editNoteTitle, setEditNoteTitle] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { note, currentId } = useContext(TodoListDispatchContext);
  const { onEditNoteTitle } = useContext(TodoListStateContext);

  const onChangeTitle = () => {
    if (editNoteTitle.length >= 1) {
      onEditNoteTitle(currentId, editNoteTitle);
    }

    setEditNoteTitle("");
    setIsEdit(false);
  };

  const onEditMode = () => {
    setIsEdit(true);
    if (titleEditRef.current) {
      titleEditRef.current.focus();
    }
  };

  useEffect(() => {
    const currentNote = note.find((item) => item.noteId === currentId);
    if (currentNote) {
      setCurrentNote(currentNote);
    }
  }, [note, currentId]);

  useEffect(() => {
    if (isEdit) {
      titleEditRef.current.focus();
    }
  }, [isEdit]);

  return (
    <header className="App-header h-24 flex flex-row bg-content-bg pl-10 p-5 space-x-4 grow-0">
      {isEdit ? (
        <input
          className="w-64 h-10 px-2 rounded-md bg-content-box grow"
          ref={titleEditRef}
          placeholder={currentNote.noteTitle}
          value={editNoteTitle}
          onChange={(e) => setEditNoteTitle(e.target.value)}
          onBlur={onChangeTitle}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onChangeTitle();
            }
          }}
        />
      ) : (
        <h1 className="text-3xl font-bold underline grow" onClick={onEditMode}>
          {currentNote.noteTitle}
        </h1>
      )}
      <button className="">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1M1 9h14M2 5h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
          />
        </svg>
      </button>
      <button className="">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>
    </header>
  );
};

export default Header;
