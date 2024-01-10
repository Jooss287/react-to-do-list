import { useContext, useEffect, useRef, useState } from "react";
import { TodoListDispatchContext, TodoListStateContext } from "../../App";
import AddMenu from "./AddMenu";

const TodoHeader = () => {
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
      <AddMenu />
    </header>
  );
};

export default TodoHeader;
