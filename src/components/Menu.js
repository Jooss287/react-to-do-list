import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <menu className="Menu w-60 h-screen bg-cream-white space-y-1 grid p-5">
      <p>오늘 할 일</p>
      <p>중요</p>
      <p>계획된 일정</p>
      <p>작업</p>
      <p>새 목록(최하단 위치)</p>
      <div className="justify-self-center border-b-2 border-dashed border-neutral-400 w-4/5 h-2" />
    </menu>
  );
};

export default Menu;
