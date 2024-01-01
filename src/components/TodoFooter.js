import React, { useContext, useRef, useState } from "react";
import { TodoListStateContext } from "../App";

const TodoFooter = ({}) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const { onAddContent } = useContext(TodoListStateContext);

  const submitTodo = () => {
    if (content.length < 1) {
      //   contentRef.current.focus();
      return;
    }

    onAddContent(content);
    console.log(content);
  };

  return (
    <footer className="Footer min-h-36 bg-teal-400 px-10 pt-8 p-2 w-full flex flex-col grow-0">
      <div className="h-14 p-2 rounded-md flex hover:bg-white items-center bg-teal-200">
        <span className="text-2xl justify-self-center mr-2">
          <svg
            class="w-4 h-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </span>
        <input
          className="placeholder:italic grow bg-transparent"
          placeholder="작업 추가"
          ref={contentRef}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></input>
        <button className="ml-2rounded bg-indigo-300 w-16" onClick={submitTodo}>
          추가
        </button>
      </div>
    </footer>
  );
};

export default React.memo(TodoFooter);
