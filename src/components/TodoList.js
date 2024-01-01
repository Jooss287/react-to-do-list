import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import AccordianSvg from "../icon_components/AccordianSvg";
import TodoFooter from "./TodoFooter";

const TodoList = ({ data }) => {
  const [notCompleteTodo, setNotCompleteTodo] = useState([]);
  const [completeTodo, setCompleteTodo] = useState([]);
  const [completeFilter, setCompleteFilter] = useState(false);

  useEffect(() => {
    setNotCompleteTodo(
      data.filter((it) => {
        return !it.isComplete;
      })
    );

    setCompleteTodo(
      data.filter((it) => {
        return it.isComplete;
      })
    );
  }, [data]);

  return (
    <div className="TodoList pt-6 h-4/6 w-full p-10 bg-green-800 flex-col grow">
      <div className="flex flex-col space-y-1 grow">
        {notCompleteTodo.map((item) => (
          <TodoItem key={item.id} {...item} />
        ))}
        <div className="w-full bg-transparent rounded-md h-14 flex items-center">
          <button
            className="bg-sky-500 h-8 rounded-md ml-3 m-1 w-28 flex items-center cursor-pointer"
            onClick={() => setCompleteFilter(!completeFilter)}
          >
            <AccordianSvg fold={completeFilter} size={4} />
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
