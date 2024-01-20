import { useEffect, useState } from "react";
import { DownSvg, UpSvg } from "../icon_components/SvgLists";
import "moment/locale/ko";

const TimePicker = ({ onChangeTime }) => {
  const moment = require("moment");
  const [time, setTime] = useState(new moment());

  useEffect(() => {
    if (onChangeTime) {
      const hhmm = time.format("HHmm");
      onChangeTime(hhmm);
    }
  }, [time]);

  return (
    <div className="flex flex-row justify-center m-2 border-collapse space-x-0">
      <div className="grow flex items-center">
        <button className="h-6 w-full border rounded-l-md flex justify-center items-center">
          {time.format("a")}
        </button>
      </div>
      <div className="grow border text-center">
        <button
          className="h-3 w-full flex justify-center items-center"
          onClick={() => {
            setTime(moment(time).add(1, "hour"));
          }}
        >
          <UpSvg size={4} />
        </button>
        <div className="h-6 w-full border flex justify-center items-center">
          {time.format("hh")}
        </div>
        <button
          className="h-3 w-full flex justify-center items-center"
          onClick={() => {
            setTime(moment(time).subtract(1, "hour"));
          }}
        >
          <DownSvg size={4} />
        </button>
      </div>
      <div className="grow border text-center">
        <button
          className="h-3 w-full flex justify-center items-center"
          onClick={() => {
            setTime(moment(time).add(10, "minute"));
          }}
        >
          <UpSvg size={4} />
        </button>
        <div className="h-6 w-full border flex justify-center items-center">
          {time.format("mm")}
        </div>
        <button
          className="h-3 w-full flex justify-center items-center"
          onClick={() => {
            setTime(moment(time).subtract(10, "minute"));
          }}
        >
          <DownSvg size={4} />
        </button>
      </div>
    </div>
  );
};

export default TimePicker;
