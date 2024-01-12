import { useContext } from "react";
import { TodoListStateContext } from "../../App";
import CheckboxSvg from "../../icon_components/CheckboxSvg";
import HeartSvg from "../../icon_components/HeartSvg";
import { MenuRightBtnContext } from "./TodoList";

const TodoItem = ({ id, content, isComplete, isFaviroites }) => {
  const { setMenuVisible, setMenuPosition, setMenuTargetId } =
    useContext(MenuRightBtnContext);

  const { onChangeComplete, onChangeFaviroites } =
    useContext(TodoListStateContext);

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
        <div>date</div>
      </aside>

      <div className="mx-2 cursor-pointer" onClick={onClickFaviroites}>
        <HeartSvg filled={isFaviroites} size={6} />
      </div>
    </div>
  );
};

export default TodoItem;
