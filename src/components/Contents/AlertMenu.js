import { useContext, useEffect, useRef, useState } from "react";
import { AlertSvg } from "../../icon_components/SvgLists";
import Dropdown from "../Button/Dropdown";
import Calendar from "react-calendar";
import TimePicker from "../TimePicker";
import { AddContentContext } from "./TodoFooter";
import "moment/locale/ko";

const AlertMenu = () => {
  const moment = require("moment");
  const calendarRef = useRef();
  const [isCalendarMode, setIscalendarMode] = useState(false);
  const [value, setValue] = useState(new Date());
  const { alert, setAlert } = useContext(AddContentContext);
  const [currentAlertString, setCurrentAlertString] = useState("");
  const [currentCalendarString, setCurrentCalendarString] = useState("");

  const menuContents = [
    { label: "내일", clickEvent: () => {} },
    { label: "다음 주", clickEvent: () => {} },
    {
      label: "날짜및시간 선택",
      clickEvent: () => {
        setIscalendarMode(true);
      },
    },
    {
      label: "삭제",
      clickEvent: () => {
        setAlert(null);
      },
    },
  ];

  const calendarOnChange = (date) => {
    setValue(date);
  };

  const timeOnChange = (time) => {
    const newTime = value;
    newTime.setHours(time.substring(0, 2));
    newTime.setMinutes(time.substring(2, 4));
    setValue(newTime);
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
    if (!alert) {
      setCurrentAlertString("");
      setCurrentCalendarString("");
      return;
    }

    const today = moment();
    let CalendarString = "";
    if (!today.isSame(alert, "year")) {
      CalendarString += alert.format("YYYY년 ");
    }
    CalendarString += moment(alert).format("MM월 DD일 ddd");
    const alertString = moment(alert).format("h:mm a에 미리 알리기");
    setCurrentAlertString(alertString);
    setCurrentCalendarString(CalendarString);
  }, [alert]);

  return (
    <div className="relative">
      {isCalendarMode && (
        <div
          className="absolute z-1 -top-60 -left-28 bg-menu-color opacity-100"
          ref={calendarRef}
        >
          <Calendar
            locale="en"
            onChange={calendarOnChange}
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false}
            formatDay={(locale, date) => moment(date).format("D")}
          />
          <div>
            <TimePicker onChangeTime={timeOnChange} />
          </div>
          <div className="flex flex-row space-x-2 justify-center m-2">
            <button
              className="grow border-2 rounded-md bg-btn-color text-menu-color"
              onClick={() => {
                setIscalendarMode(false);
              }}
            >
              취소
            </button>
            <button
              className="grow border-2 rounded-md bg-btn-color text-menu-color"
              onClick={() => {
                setAlert(new Date(value));
                setIscalendarMode(false);
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}

      <Dropdown
        menuBtn={() => {
          return (
            <span className="flex items-center text-center justify-end">
              <AlertSvg size={6} />
              <span className="flex flex-col items-start">
                <span className="text-sm pl-1 w-auto">
                  {currentAlertString}
                </span>
                <span className="text-xs pl-1 w-auto">
                  {currentCalendarString}
                </span>
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

export default AlertMenu;
