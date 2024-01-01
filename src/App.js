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
  },
  {
    id: 2,
    content: "중요",
    isComplete: true,
  },
  {
    id: 3,
    content: "계획된 일정",
    isComplete: true,
  },
  {
    id: 4,
    content: "작업",
    isComplete: true,
  },
  {
    id: 5,
    content: "새 목록(최하단 위치)",
    isComplete: false,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
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

  const onAddContent = (content) => {
    dispatch({
      type: "ADD",
      payload: {
        id: data.length + 1,
        content,
      },
    });
  };

  useEffect(() => {
    dispatch({ type: "INIT", payload: dummyList });
  }, []);

  return (
    <TodoListDispatchContext.Provider value={data}>
      <TodoListStateContext.Provider value={{ onAddContent }}>
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
