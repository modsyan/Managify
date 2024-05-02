import cn from "../utils/class-names";
import { menuItems } from "../data/menu-items";
import { Collapse } from "rizzui";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useState } from "react";

export default function Sidebar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <aside
      className={cn(
        "fixed min-h-screen bottom-0 start-0 z-50 h-full min-w-[270px] border-e-2 border-gray-100 bg-gray-50 2xl:w-72 font-rubik overflow-hidden",
        className
      )}
    >
      {/* title */}
      <div className="flex items-center justify-center h-16 border-b border-gray-100 ">
        <div className="text-lg font-bold text-gray-700 dark:text-gray-100 ">
          <span className="text-red-dark">MADDI</span>
        </div>
      </div>
      {menuItems.map((item) => (
        <Collapse
          key={item.name}
          defaultOpen={false}
          header={({ toggle }) => (
            <button
              onClick={toggle}
              className={`flex items-center justify-between w-full text-sm  text-left  hover:bg-gray-100  font-medium  ${
                !item.dropdownItems
                  ? "text-gray-900 font-normal my-4 mx-3 "
                  : "p-3  flex"
              }`}
            >
              <div
                className={`flex items-center " justify-between w-full `}
                onClick={() => setOpen(!open)}
              >
                <span className="flex gap-2 items-center">
                  {item.dropdownItems && (
                    <span className={`${open ? "rotate-90" : "-rotate-90"}`}>
                      <MdKeyboardArrowLeft className="" />
                    </span>
                  )}
                  <span>{item.name}</span>
                </span>{" "}
                {item.dropdownItems && <span>{item.icon}</span>}
              </div>
              {/* Assuming item.name represents the text for the button */}
            </button>
          )}
        >
          <div className="">
            {item.dropdownItems && (
              <ul className="mr-6">
                {item.dropdownItems.map((dropdownItem, index) => (
                  <Link
                    to={dropdownItem.href}
                    key={`${dropdownItem.name}-${index}`}
                  >
                    <li
                      key={`${dropdownItem.name}-${index}`}
                      className="text-sm my-2 mr-6 text-[12px] font-rubik"
                    >
                      {"· " + dropdownItem.name}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </Collapse>
      ))}
    </aside>
  );
}
