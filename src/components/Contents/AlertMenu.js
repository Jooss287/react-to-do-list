import { AlertSvg } from "../../icon_components/SvgLists";
import Dropdown from "../Button/Dropdown";

const AlertMenu = () => {
  const menuContents = [
    {
      label: "오늘",
      clickEvent: () => {},
    },
    { label: "내일", clickEvent: () => {} },
    {
      label: "날짜선택",
      clickEvent: () => {},
    },
  ];

  return (
    <div>
      <Dropdown
        menuBtn={<AlertSvg size={6} />}
        topMenu={true}
        menuItems={menuContents}
      />
    </div>
  );
};

export default AlertMenu;
