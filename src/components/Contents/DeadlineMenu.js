import { useContext, useEffect, useRef, useState } from "react";
import { CalendarSvg } from "../../icon_components/SvgLists";
import Dropdown from "../Button/Dropdown";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../css/Calendar.css";
import { AddContentContext } from "./TodoFooter";

const DeadlineMenu = () => {
  const moment = require("moment");
  const [isCalendarMode, setIscalendarMode] = useState(false);
  const { deadline, setDeadline } = useContext(AddContentContext);
  const [currentCalendarString, setCurrentCalendarString] = useState("");
  const calendarRef = useRef();

  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  let menuContents = [
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
      label: "다음 주",
      clickEvent: () => {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        setDeadline(nextWeek);
      },
    },
    {
      label: "날짜선택",
      clickEvent: () => {
        setIscalendarMode(true);
      },
    },
    {
      label: "삭제",
      clickEvent: () => {
        setDeadline(null);
      },
    },
  ];

  const IsEqualDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const calendarOnChange = (date) => {
    setDeadline(date);
    setIscalendarMode(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setIscalendarMode(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!deadline) {
      setCurrentCalendarString("");
      return;
    }

    const today = new Date();
    if (IsEqualDate(deadline, today)) {
      setCurrentCalendarString("오늘");
      return;
    }
    const tomorrow = today;
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (IsEqualDate(deadline, tomorrow)) {
      setCurrentCalendarString("내일");
      return;
    }

    let calendarString = "";
    if (deadline.getFullYear() !== today.getFullYear()) {
      calendarString += `${deadline.getFullYear()}년 `;
    }
    calendarString += `${deadline.getMonth() + 1}월 ${deadline.getDate()}일 ${
      dayOfWeek[deadline.getDay()]
    }`;
    setCurrentCalendarString(calendarString);
  }, [deadline]);

  return (
    <div className="relative">
      {isCalendarMode && (
        <div className="absolute z-1 -top-48 -left-28" ref={calendarRef}>
          <Calendar
            locale="en"
            onChange={calendarOnChange}
            value={deadline}
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false}
            formatDay={(locale, date) => moment(date).format("D")}
          />
        </div>
      )}

      <Dropdown
        menuBtn={() => {
          return (
            <span className="flex items-center text-center justify-end">
              <CalendarSvg size={6} />
              <span className="text-sm pl-1 w-auto">
                {currentCalendarString}
              </span>
            </span>
          );
        }}
        topMenu={true}
        menuItems={menuContents}
      />
    </div>
  );
};

export default DeadlineMenu;
