import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import AccordianSvg from "../icon_components/AccordianSvg";

const TodoList = ({ data }) => {
  const [notCompleteTodo, setNotCompleteTodo] = useState([]);
  const [completeTodo, setCompleteTodo] = useState([]);
  const [completeFilter, setCompleteFilter] = useState(false);

  useEffect(() => {
    if (!data || !("todoContent" in data)) return;

    const currentData = data.todoContent;
    setNotCompleteTodo(
      currentData.filter((it) => {
        return !it.isComplete;
      })
    );
    setCompleteTodo(
      currentData.filter((it) => {
        return it.isComplete;
      })
    );
  }, [data]);

  return (
    <div className="TodoList pt-6 h-4/6 w-full p-10 bg-content-bg flex-col grow">
      <div className="flex flex-col space-y-1 grow">
        {notCompleteTodo.map((item) => (
          <TodoItem key={item.id} {...item} />
        ))}
        <div className="w-full bg-transparent rounded-md h-14 flex items-center">
          <button
            className="bg-content-btn hover:bg-content-btn-hover h-8 rounded-md ml-3 m-1 w-28 flex items-center cursor-pointer"
            onClick={() => setCompleteFilter(!completeFilter)}
          >
            <AccordianSvg fold={completeFilter} />
            {`완료됨 ${completeTodo.length}`}
          </button>
        </div>
        {!completeFilter &&
          completeTodo.map((item) => <TodoItem key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default TodoList;
