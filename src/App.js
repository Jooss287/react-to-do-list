import "./App.css";
import TodoHeader from "./components/Contents/TodoHeader";
import Menu from "./components/Menu/Menu";
import TodoList from "./components/Contents/TodoList";
import React, { useEffect, useReducer, useState } from "react";
import TodoFooter from "./components/Contents/TodoFooter";
import { NoteReducer } from "./components/Reducer/NoteReducer";

const dummyCurrentId = 1;
const dummyList = [
  {
    noteId: 1,
    noteTitle: "새 목록입니다",
    todoContent: [
      {
        id: 1,
        content: "할 일 샘플",
        isComplete: true,
        isFaviroites: true,
        deadLine: new Date(),
      },
      {
        id: 2,
        content: "중요",
        isComplete: true,
        isFaviroites: false,
        deadLine: (() => {
          const date = new Date();
          date.setDate(date.getDate() - 1);
          return date;
        })(),
      },
      {
        id: 3,
        content: "계획된 일정",
        isComplete: true,
        isFaviroites: true,
        deadLine: (() => {
          const date = new Date();
          date.setDate(date.getDate() + 1);
          return date;
        })(),
      },
      {
        id: 4,
        content: "작업",
        isComplete: true,
        isFaviroites: false,
        deadLine: (() => {
          const date = new Date();
          date.setDate(date.getFullYear() + 1);
          return date;
        })(),
      },
      {
        id: 5,
        content: "새 목록(최하단 위치)",
        isComplete: false,
        isFaviroites: true,
      },
    ],
  },
];

export const TodoListDispatchContext = React.createContext();
export const TodoListStateContext = React.createContext();

function App() {
  const [note, dispatch] = useReducer(NoteReducer, []);
  const [currentId, setCurrentId] = useState(1);

  const onAddNote = (noteTitle) => {
    dispatch({
      type: "ADD_NOTE",
      payload: {
        noteId: note.length + 1,
        noteTitle,
        todoContent: [],
      },
    });
  };

  const onChangeNote = (id) => {
    if (id === -1 && note.length !== 0) {
      id = note[0].noteId;
    }
    setCurrentId(id);
  };

  const onEditNoteTitle = (noteId, noteTitle) => {
    dispatch({
      type: "CHANGE_NOTE_TITLE",
      payload: {
        noteId,
        noteTitle,
      },
    });
  };

  const onDeleteNote = (noteId) => {
    dispatch({
      type: "DELETE_NOTE",
      payload: noteId,
    });
  };

  const onAddContent = (content, date) => {
    const currentNote = GetCurrentNote();
    dispatch({
      type: "ADD_CONTENTS",
      currentId: currentId,
      payload: {
        id: currentNote.todoContent.length + 1,
        content,
        isComplete: false,
        isFaviroites: false,
        date,
      },
    });
  };

  const onDeleteContent = (id) => {
    dispatch({
      type: "DELETE_CONTENTS",
      currentId: currentId,
      payload: id,
    });
  };

  const onChangeComplete = (id, isComplete) => {
    dispatch({
      type: "CHANGE_COMPLETE",
      currentId: currentId,
      payload: {
        id,
        isComplete,
      },
    });
  };

  const onChangeFaviroites = (id, isFaviroites) => {
    dispatch({
      type: "CHANGE_FAVIROITES",
      currentId: currentId,
      payload: {
        id,
        isFaviroites,
      },
    });
  };

  const setDeadLine = (noteId, id, date) => {
    dispatch({
      type: "SET_DEADLINE",
      currentId: noteId,
      payload: {
        id,
        date,
      },
    });
  };

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("todoNote"));
    if (!localData) {
      localData = dummyList;
    }

    if (localData.length === 0) {
      return;
    }

    setCurrentId(dummyCurrentId);
    dispatch({
      type: "INIT",
      payload: localData,
    });
  }, []);

  const GetCurrentNote = () => {
    if (!note || note.length === 0) {
      return undefined;
    }
    return note.find((item) => item.noteId === currentId);
  };

  return (
    <TodoListDispatchContext.Provider value={{ note, currentId }}>
      <TodoListStateContext.Provider
        value={{
          onAddNote,
          onChangeNote,
          onEditNoteTitle,
          onDeleteNote,
          onAddContent,
          onDeleteContent,
          onChangeComplete,
          onChangeFaviroites,
          setDeadLine,
        }}
      >
        <div className="App bg-slate-100 h-full flex">
          <Menu />
          <article className="Article h-screen w-full flex flex-col">
            <TodoHeader />
            <TodoList />
            <TodoFooter />
          </article>
        </div>
      </TodoListStateContext.Provider>
    </TodoListDispatchContext.Provider>
  );
}

export default App;
