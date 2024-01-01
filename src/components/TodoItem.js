import CheckboxSvg from "../icon_components/CheckboxSvg";
import HeartSvg from "../icon_components/HeartSvg";

const TodoItem = ({ id, content }) => {
  return (
    <div className="todo-item bg-teal-300 h-14 rounded-md p-2 w-full flex items-center">
      <div className="mx-2">
        <CheckboxSvg checked={false} />
      </div>
      <content className="grow">
        <div key={id}>{content}</div>
        <div>date</div>
      </content>

      <div className="mx-2">
        <HeartSvg filled={false} />
      </div>
    </div>
  );
};

export default TodoItem;
