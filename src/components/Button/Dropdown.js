import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dropdown = ({ itemsOption, menuBtn, menuItems }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>{menuBtn}</Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute right-0 z-10 mt-2 w-${itemsOption.width} origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1">
            {menuItems.map((item) => {
              return (
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <a
                      href="#!"
                      className={classNames(
                        active
                          ? "bg-content-box-hover text-gray-900"
                          : "bg-content-box text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      onClick={item.clickEvent}
                    >
                      {item.label}
                    </a>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

Dropdown.defaultProps = {
  itemsOption: {
    width: 56,
  },
  menuBtn: "Unknown",
  menuItems: [
    {
      clickEvent: () => {},
      label: "Unknown",
    },
  ],
};

export default Dropdown;
