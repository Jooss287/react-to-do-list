import React from "react";
import SmartFilter from "./SmartFilter";
import BottomNoteAddBar from "./BottomNoteAddBar";
import NoteList from "./NoteList";

const Menu = () => {
  return (
    <menu className="Menu w-80 h-screen bg-cream-white flex flex-col space-y-1 p-5">
      <SmartFilter />
      <div className="justify-self-center border-b-2 border-dashed border-neutral-400 w-full h-2" />
      <NoteList />
      <BottomNoteAddBar />
    </menu>
  );
};
export default Menu;
