import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/TodoHeader";
import Menu from "./components/Menu";
import TodoList from "./components/TodoList";
import React, { useEffect, useReducer } from "react";
import TodoFooter from "./components/TodoFooter";

const dummyList = [
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
];

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "CHANGE_COMPLETE":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item.isComplete = action.payload.isComplete;
        }
        return item;
      });
    case "CHANGE_FAVIROITES":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item.isFaviroites = action.payload.isFaviroites;
        }
        return item;
      });
    // case "DELETE":
    //   return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export const TodoListDispatchContext = React.createContext();
export const TodoListStateContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const onAddContent = (content, date) => {
    dispatch({
      type: "ADD",
      payload: {
        id: data.length + 1,
        content,
        date,
      },
    });
  };

  const onChangeComplete = (id, isComplete) => {
    dispatch({
      type: "CHANGE_COMPLETE",
      payload: {
        id,
        isComplete,
      },
    });
  };

  const onChangeFaviroites = (id, isFaviroites) => {
    dispatch({
      type: "CHANGE_FAVIROITES",
      payload: {
        id,
        isFaviroites,
      },
    });
  };

  useEffect(() => {
    dispatch({ type: "INIT", payload: dummyList });
  }, []);

  return (
    <TodoListDispatchContext.Provider value={data}>
      <TodoListStateContext.Provider
        value={{ onAddContent, onChangeComplete, onChangeFaviroites }}
      >
        <BrowserRouter>
          <div className="App bg-slate-100 h-full flex">
            {/* <Routes> */}
            <Menu />
            <article className="Article h-screen w-full flex flex-col">
              <Header />
              <TodoList data={data} />
              <TodoFooter />
            </article>
            {/* </Routes> */}
          </div>
        </BrowserRouter>
      </TodoListStateContext.Provider>
    </TodoListDispatchContext.Provider>
  );
}

export default App;
