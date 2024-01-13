import { useContext, useEffect, useState } from "react";
import { TodoListStateContext } from "../../App";
import CheckboxSvg from "../../icon_components/CheckboxSvg";
import HeartSvg from "../../icon_components/HeartSvg";
import { MenuRightBtnContext } from "./TodoList";
import { CalenderSvg, SunSvg } from "../../icon_components/SvgLists";

const TodoItem = ({ id, content, isComplete, isFaviroites, deadLine }) => {
  const { setMenuVisible, setMenuPosition, setMenuTargetId } =
    useContext(MenuRightBtnContext);

  const { onChangeComplete, onChangeFaviroites } =
    useContext(TodoListStateContext);

  const [deadLineString, setDeadLineString] = useState("");
  const [isTodayTodo, setIsTodayTodo] = useState(false);
  const [isOverDue, setIsOverDue] = useState(false);

  const onClickComplete = () => {
    onChangeComplete(id, !isComplete);
  };

  const onClickFaviroites = () => {
    onChangeFaviroites(id, !isFaviroites);
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    setMenuTargetId(id);
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(() => {
    if (deadLine) {
      let deadLineString = "";
      const today = new Date();
      const deadLineDate = new Date(deadLine);

      if (
        today.toISOString().slice(0, 10) ===
        deadLineDate.toISOString().slice(0, 10)
      ) {
        deadLineString = "오늘";
        setIsTodayTodo(true);
      } else {
        if (
          today.toISOString().slice(0, 10) >
          deadLineDate.toISOString().slice(0, 10)
        ) {
          setIsOverDue(true);
        }

        const deadLineYear =
          today.getFullYear() === deadLineDate.getFullYear()
            ? ""
            : `${deadLineDate.getFullYear()}년`;
        const deadLineMonth = deadLineDate.getMonth() + 1;
        const deadLineDay = deadLineDate.getDate();
        const deadLineDayOfWeek = dayOfWeek[deadLineDate.getDay()];

        deadLineString = `${deadLineYear}${deadLineMonth}월${deadLineDay}일 ${deadLineDayOfWeek}`;
      }

      setDeadLineString(deadLineString);
    }
  }, []);

  return (
    <div
      className=" bg-content-box hover:bg-content-box-hover h-14 rounded-md p-2 w-full flex items-center"
      onContextMenu={handleRightClick}
    >
      <div className="mx-2 cursor-pointer" onClick={onClickComplete}>
        <CheckboxSvg checked={isComplete} />
      </div>
      <aside className="grow pl-2">
        <div key={id}>{content}</div>
        <div>
          {isTodayTodo && (
            <span className="flex space-x-1">
              <span className="text-gray-500 flex">
                <SunSvg size={4} /> 오늘 할 일
              </span>
              <span className="text-blue-700 flex">
                <CalenderSvg size={4} /> 오늘
              </span>
            </span>
          )}
          {!isTodayTodo && !isOverDue && deadLineString && (
            <span className="text-gray-500 flex">
              <CalenderSvg size={4} />
              {deadLineString}
            </span>
          )}
          {!isTodayTodo && isOverDue && (
            <span className="text-red-500 flex">
              <CalenderSvg size={4} />
              {deadLineString}
            </span>
          )}
        </div>
      </aside>

      <div className="mx-2 cursor-pointer" onClick={onClickFaviroites}>
        <HeartSvg filled={isFaviroites} size={6} />
      </div>
    </div>
  );
};

export default TodoItem;
