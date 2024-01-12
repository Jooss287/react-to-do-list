import React, { useContext, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import AccordianSvg from "../../icon_components/AccordianSvg";
import { TodoListDispatchContext, TodoListStateContext } from "../../App";

export const MenuRightBtnContext = React.createContext();

const TodoList = () => {
  const [notCompleteTodo, setNotCompleteTodo] = useState([]);
  const [completeTodo, setCompleteTodo] = useState([]);
  const [completeFilter, setCompleteFilter] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuTargetId, setMenuTargetId] = useState(0);
  const { note, currentId } = useContext(TodoListDispatchContext);
  const { onDeleteContent } = useContext(TodoListStateContext);

  useEffect(() => {
    const foundNote = note.find((item) => item.noteId === currentId);
    if (foundNote) {
      setNotCompleteTodo(foundNote.todoContent.filter((it) => !it.isComplete));
      setCompleteTodo(foundNote.todoContent.filter((it) => it.isComplete));
    }
  }, [note, currentId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuVisible && !event.target.closest(".menu-container")) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuVisible]);

  const closeMenu = () => {
    setMenuVisible(false);
    setMenuPosition({ x: 0, y: 0 });
    setMenuTargetId(0);
  };

  return (
    <div className="menu-container grow">
      <MenuRightBtnContext.Provider
        value={{ setMenuVisible, setMenuPosition, setMenuTargetId }}
      >
        <div
          className="TodoList pt-6 h-full w-full p-10 bg-content-bg flex-col overflow-y-auto"
          onClick={closeMenu}
        >
          <div className="flex flex-col space-y-1 grow">
            {notCompleteTodo.map((item) => (
              <TodoItem key={item.id} {...item} />
            ))}
            {completeTodo.length !== 0 && (
              <div className="w-full bg-transparent rounded-md h-14 flex items-center">
                <button
                  className="bg-content-btn hover:bg-content-btn-hover h-8 rounded-md ml-3 m-1 w-28 flex items-center cursor-pointer"
                  onClick={() => setCompleteFilter(!completeFilter)}
                >
                  <AccordianSvg fold={completeFilter} />
                  {`완료됨 ${completeTodo.length}`}
                </button>
              </div>
            )}
            {!completeFilter &&
              completeTodo.map((item) => <TodoItem key={item.id} {...item} />)}
          </div>
        </div>
      </MenuRightBtnContext.Provider>

      {menuVisible && (
        <div
          className="absolute bg-white shadow-md rounded-md p-2"
          style={{ top: menuPosition.y, left: menuPosition.x }}
        >
          <div className="flex flex-col cursor-pointer">
            <div className="hover:bg-gray-200 p-1 rounded-md">작업 수정</div>
            <div
              className="hover:bg-gray-200 p-1 rounded-md"
              onClick={() => {
                onDeleteContent(menuTargetId);
                closeMenu();
              }}
            >
              작업 삭제
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
