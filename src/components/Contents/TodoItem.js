import { useContext, useEffect, useState } from "react";
import { TodoListStateContext } from "../../App";
import CheckboxSvg from "../../icon_components/CheckboxSvg";
import HeartSvg from "../../icon_components/HeartSvg";
import { MenuRightBtnContext } from "./TodoList";
import { CalendarSvg, SunSvg } from "../../icon_components/SvgLists";

const TodoItem = ({ id, content, isComplete, isFaviroites, deadline }) => {
  const { setMenuVisible, setMenuPosition, setMenuTargetId } =
    useContext(MenuRightBtnContext);

  const { onChangeComplete, onChangeFaviroites } =
    useContext(TodoListStateContext);

  const [deadlineString, setDeadLineString] = useState("");
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
    if (deadline) {
      let deadlineString = "";
      const today = new Date();
      const deadlineDate = new Date(deadline);

      if (
        today.toISOString().slice(0, 10) ===
        deadlineDate.toISOString().slice(0, 10)
      ) {
        deadlineString = "오늘";
        setIsTodayTodo(true);
      } else {
        if (
          today.toISOString().slice(0, 10) >
          deadlineDate.toISOString().slice(0, 10)
        ) {
          setIsOverDue(true);
        }

        const deadlineYear =
          today.getFullYear() === deadlineDate.getFullYear()
            ? ""
            : `${deadlineDate.getFullYear()}년`;
        const deadlineMonth = deadlineDate.getMonth() + 1;
        const deadlineDay = deadlineDate.getDate();
        const deadlineDayOfWeek = dayOfWeek[deadlineDate.getDay()];

        deadlineString = `${deadlineYear}${deadlineMonth}월${deadlineDay}일 ${deadlineDayOfWeek}`;
      }

      setDeadLineString(deadlineString);
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
                <CalendarSvg size={4} /> 오늘
              </span>
            </span>
          )}
          {!isTodayTodo && !isOverDue && deadlineString && (
            <span className="text-gray-500 flex">
              <CalendarSvg size={4} />
              {deadlineString}
            </span>
          )}
          {!isTodayTodo && isOverDue && (
            <span className="text-red-500 flex">
              <CalendarSvg size={4} />
              {deadlineString}
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
