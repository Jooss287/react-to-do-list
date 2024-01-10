import { DotsSvg } from "../../icon_components/SvgLists";
import Dropdown from "../Button/Dropdown";

const AddMenu = () => {
  const menuContents = [
    { label: "목록 이름 바꾸기", clickEvent: () => {} },
    { label: "정렬 기준", clickEvent: () => {} },
    { label: "목록 삭제", clickEvent: () => {} },
  ];

  return (
    <div>
      <Dropdown menuBtn={<DotsSvg size={6} />} menuItems={menuContents} />
    </div>
  );
};

export default AddMenu;
