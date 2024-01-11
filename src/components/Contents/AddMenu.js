import { useContext } from "react";
import { DotsSvg } from "../../icon_components/SvgLists";
import Dropdown from "../Button/Dropdown";
import { MenuEditContext } from "./TodoHeader";
import { TodoListStateContext } from "../../App";

const AddMenu = () => {
  const { onEditMode, currentId } = useContext(MenuEditContext);
  const { onDeleteNote, onChangeNote } = useContext(TodoListStateContext);

  const menuContents = [
    {
      label: "목록 이름 바꾸기",
      clickEvent: () => {
        onEditMode();
      },
    },
    { label: "정렬 기준", clickEvent: () => {} },
    {
      label: "목록 삭제",
      clickEvent: () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) {
          return;
        }

        onChangeNote(-1);
        onDeleteNote(currentId);
      },
    },
  ];

  return (
    <div>
      <Dropdown menuBtn={<DotsSvg size={6} />} menuItems={menuContents} />
    </div>
  );
};

export default AddMenu;
