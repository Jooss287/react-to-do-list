import { useEffect, useState } from "react";

const Header = ({ note }) => {
  const [noteTitle, setNoteTitle] = useState("Unknown");

  useEffect(() => {
    if (!note || !("noteTitle" in note)) return;
    setNoteTitle(note.noteTitle);
  }, [note]);

  return (
    <header className="App-header h-24 flex flex-row bg-content-bg pl-10 p-5 space-x-4 grow-0">
      <h1 className="text-3xl font-bold underline grow">{noteTitle}</h1>
      <button className="">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1M1 9h14M2 5h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
          />
        </svg>
      </button>
      <button className="">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>
    </header>
  );
};

Header.defaultProps = {
  noteTitle: "Unknown",
};

export default Header;
