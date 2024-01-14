import { useContext, useState } from "react";
import { TodoListStateContext } from "../../App";
import { CalendarSvg } from "../../icon_components/SvgLists";
import Dropdown from "../Button/Dropdown";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../css/Calendar.css";

const DeadlineMenu = () => {
  const moment = require("moment");
  const [iscalendarMode, setIscalendarMode] = useState(false);
  const { setDeadline } = useContext(TodoListStateContext);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(null);

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
        setIscalendarMode(true);
      },
    },
  ];

  return (
    <div>
      {iscalendarMode ? (
        <div>
          <Calendar
            locale="en"
            className="w-10 h-40"
            onChange={setCalendarDate}
            value={calendarDate}
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false}
            formatDay={(locale, date) => moment(date).format("D")}
          />
        </div>
      ) : (
        <Dropdown
          menuBtn={<CalendarSvg size={6} />}
          topMenu={true}
          menuItems={menuContents}
        />
      )}
    </div>
  );
};

export default DeadlineMenu;
