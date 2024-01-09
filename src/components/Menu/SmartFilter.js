const SmartFilter = ({ filter, setFilter }) => {
  const initFilter = ["오늘 할 일", "중요", "계획된 일정", "작업"];

  return (
    <div className="grow-0 items-center space-y-1">
      {initFilter.map((item) => (
        <div
          className="h-9 w-full px-2 hover:bg-menu-color-hover rounded flex items-center"
          key={item}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default SmartFilter;
