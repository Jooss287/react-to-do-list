import { RepeatSvg } from "../../icon_components/SvgLists";
import Dropdown from "../Button/Dropdown";

const RepeatMenu = () => {
  const menuContents = [
    {
      label: "매일",
      clickEvent: () => {},
    },
    { label: "평일", clickEvent: () => {} },
    {
      label: "매주",
      clickEvent: () => {},
    },
    { label: "매월", clickEvent: () => {} },
    {
      label: "매년",
      clickEvent: () => {},
    },
    { label: "사용자 지정", clickEvent: () => {} },
  ];

  return (
    <div>
      <Dropdown
        menuBtn={<RepeatSvg size={6} />}
        topMenu={true}
        menuItems={menuContents}
      />
    </div>
  );
};

export default RepeatMenu;
