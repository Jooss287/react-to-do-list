import { useContext, useEffect, useRef, useState } from "react";
import { TodoListDispatchContext, TodoListStateContext } from "../../App";
import { EditSvg, TrashSvg } from "../../icon_components/SvgLists";

const NoteList = () => {
  const editNoteTitleRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [editNoteTitle, setEditNoteTitle] = useState("");
  const [noteId, setNoteId] = useState(0);
  const { onChangeNote, onEditNoteTitle } = useContext(TodoListStateContext);
  const { note } = useContext(TodoListDispatchContext);

  const setEditMode = (noteId, editMode) => {
    setIsEdit(editMode);
    setNoteId(noteId);
  };

  const onChangeTitle = (noteId, noteTitle) => {
    if (editNoteTitle.length >= 1) {
      onEditNoteTitle(noteId, editNoteTitle);
    }

    setEditNoteTitle("");
    setIsEdit(false);
  };

  useEffect(() => {
    if (isEdit) {
      editNoteTitleRef.current.focus();
    }
  }, [isEdit]);

  return (
    <div className="h-full grow items-center space-y-1">
      {note.map((item) => (
        <div
          className="flex flex-row w-full items-center hover:bg-menu-color-hover rounded cursor-pointer"
          key={item.noteId}
        >
          {isEdit && item.noteId === noteId ? (
            <input
              className="grow h-9 px-2 flex items-center rounded-md border-2 bg-transparent opacity-50"
              placeholder={item.noteTitle}
              ref={editNoteTitleRef}
              value={editNoteTitle}
              onChange={(e) => setEditNoteTitle(e.target.value)}
              onBlur={() => onChangeTitle(noteId, editNoteTitle)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onChangeTitle(noteId, editNoteTitle);
                }
              }}
            />
          ) : (
            <div
              className="grow h-9 px-2 flex items-center"
              onClick={() => onChangeNote(item.noteId)}
            >
              {item.noteTitle}
            </div>
          )}
          <span
            className="justify-end mr-1 opacity-50 hover:opacity-90"
            onClick={() => setEditMode(item.noteId, true)}
          >
            <EditSvg size={5} />
          </span>
          <span className="justify-end mr-1 opacity-50 hover:opacity-90">
            <TrashSvg size={5} />
          </span>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
