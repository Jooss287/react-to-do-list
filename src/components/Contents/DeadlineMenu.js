import { useContext, useState } from "react";
import { TodoListStateContext } from "../../App";
import { CalenderSvg } from "../../icon_components/SvgLists";
import Dropdown from "../Button/Dropdown";

const DeadlineMenu = () => {
  const [isCalenderMode, setIsCalenderMode] = useState(false);
  const { setDeadline } = useContext(TodoListStateContext);

  const menuContents = [
    {
      label: "오늘",
      clickEvent: () => {
        setDeadline(new Date());
      },
    },
    {
      label: "내일",
      clickEvent: () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDeadline(tomorrow);
      },
    },
    {
      label: "날짜선택",
      clickEvent: () => {
        setIsCalenderMode(true);
      },
    },
  ];

  return (
    <div>
      {isCalenderMode ? (
        <div></div>
      ) : (
        <Dropdown
          menuBtn={<CalenderSvg size={6} />}
          topMenu={true}
          menuItems={menuContents}
        />
      )}
    </div>
  );
};

export default DeadlineMenu;
