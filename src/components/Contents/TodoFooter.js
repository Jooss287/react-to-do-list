import React, { useContext, useReducer, useRef, useState } from "react";
import { TodoListStateContext } from "../../App";
import { PlusSvg } from "../../icon_components/SvgLists";
import DeadlineMenu from "./DeadlineMenu";
import AlertMenu from "./AlertMenu";
import RepeatMenu from "./RepeatMenu";

export const AddContentContext = React.createContext();

const TodoFooter = () => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const { onAddContent } = useContext(TodoListStateContext);
  const [deadline, setDeadline] = useState(null);
  const [alert, setAlert] = useState(null);
  const [repeat, setRepeat] = useState(null);

  const submitTodo = () => {
    if (content.length < 1) {
      return;
    }

    onAddContent(content, deadline, alert, repeat);
    setContent("");
  };

  return (
    <AddContentContext.Provider
      value={{ deadline, setDeadline, alert, setAlert, repeat, setRepeat }}
    >
      <footer className="Footer min-h-36 bg-content-bg px-10 pt-8 p-2 w-full flex flex-col grow-0">
        <div className="h-14 p-2 rounded-md flex space-x-2 hover:bg-content-box-hover items-center bg-content-box">
          <span className="justify-self-center mx-2">
            <PlusSvg size={4} />
          </span>
          <input
            className="placeholder:italic outline-none grow bg-transparent"
            placeholder="작업 추가"
            ref={contentRef}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitTodo();
              }
            }}
          ></input>
          <span className="justify-self-center opacity-50 hover:opacity-90">
            <DeadlineMenu />
          </span>
          <span className="justify-self-center opacity-50 hover:opacity-90">
            <AlertMenu />
          </span>
          <span className="justify-self-center ml-2 pr-2 opacity-50 hover:opacity-90">
            <RepeatMenu />
          </span>
        </div>
      </footer>
    </AddContentContext.Provider>
  );
};

export default React.memo(TodoFooter);
