import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface LeftMenuBarInterface {
  listItems: {
    title: string;
    handleClick?: () => void;
    icon: ReactNode;
    pathTo?: string;
  }[];
}
const LeftMenuBar: React.FC<LeftMenuBarInterface> = ({ listItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="w-full rounded-md bg-white sm:block hidden py-4">
      {listItems?.map((item, index) => (
        <div
          key={`menuitem-${index}`}
          onClick={() => item?.pathTo && navigate(item?.pathTo)}
          className={`${
            item?.pathTo &&
            location.pathname.includes(item?.pathTo) &&
            "bg-[#efefef] font-semibold"
          } flex gap-2 items-center w-full p-4 hover:bg-[#f5f5f5] hover:text-[black] shadow-md`}
        >
          {item?.icon}
          {item?.title}
        </div>
      ))}
    </div>
  );
};

export default LeftMenuBar;
