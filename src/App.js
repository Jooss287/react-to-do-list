import "./App.css";
import Header from "./components/TodoHeader";
import Menu from "./components/Menu";
import TodoList from "./components/TodoList";
import React, { useEffect, useReducer, useState } from "react";
import TodoFooter from "./components/TodoFooter";

const dummyList = [
  {
    noteId: 1,
    noteTitle: "새 목록입니다",
    todoContent: [
      {
        id: 1,
        content: "오늘 할 일",
        isComplete: true,
        isFaviroites: true,
      },
      {
        id: 2,
        content: "중요",
        isComplete: true,
        isFaviroites: false,
      },
      {
        id: 3,
        content: "계획된 일정",
        isComplete: true,
        isFaviroites: true,
      },
      {
        id: 4,
        content: "작업",
        isComplete: true,
        isFaviroites: false,
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

const dummyCurrentId = 1;

const GetCurrentNote = (note, noteId) => {
  if (!note) {
    return undefined;
  }
  return note.find((item) => item.noteId === noteId);
};

const GetCurrentContents = (note, noteId, contentId) => {
  let currentNote = GetCurrentNote(note, noteId);
  if (!currentNote) {
    return undefined;
  }
  return currentNote.todoContent.find((it) => it.id === contentId);
};

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "ADD_NOTE":
      if (state.find((item) => item.noteId === action.payload.noteId)) {
        return state;
      }
      newState = [...state, action.payload];
      break;
    case "ADD_CONTENTS": {
      let currentNote = GetCurrentNote(state, action.currentId);
      let content = GetCurrentContents(
        state,
        action.currentId,
        action.payload.id
      );
      if (!currentNote || content) {
        return state;
      }
      currentNote.todoContent.push(action.payload);
      newState = JSON.parse(JSON.stringify(state));
      break;
    }
    case "CHANGE_COMPLETE": {
      let content = GetCurrentContents(
        state,
        action.currentId,
        action.payload.id
      );
      if (!content) {
        return state;
      }
      content.isComplete = action.payload.isComplete;
      newState = JSON.parse(JSON.stringify(state));
      break;
    }
    case "CHANGE_FAVIROITES": {
      let content = GetCurrentContents(
        state,
        action.currentId,
        action.payload.id
      );
      if (!content) {
        return state;
      }
      content.isFaviroites = action.payload.isFaviroites;
      newState = JSON.parse(JSON.stringify(state));
      break;
    }
    // case "DELETE":
    //   return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }

  localStorage.setItem("todoNote", JSON.stringify(newState));
  return newState;
};

export const TodoListDispatchContext = React.createContext();
export const TodoListStateContext = React.createContext();

function App() {
  const [note, dispatch] = useReducer(reducer, []);
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
    setCurrentId(id);
  };

  const onAddContent = (content, date) => {
    const currentNote = GetCurrentNote();
    console.log("onAddContent");
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

  useEffect(() => {}, [note]);

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
          onAddContent,
          onChangeComplete,
          onChangeFaviroites,
        }}
      >
        <div className="App bg-slate-100 h-full flex">
          <Menu />
          <article className="Article h-screen w-full flex flex-col">
            <Header />
            <TodoList />
            <TodoFooter />
          </article>
        </div>
      </TodoListStateContext.Provider>
    </TodoListDispatchContext.Provider>
  );
}

export default App;
