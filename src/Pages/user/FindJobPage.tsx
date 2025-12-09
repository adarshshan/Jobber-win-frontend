import React from "react";
import { Outlet } from "react-router-dom";
import SideOpen from "Components/User/FindJobPage/SideOpen";
import { GiHamburgerMenu } from "react-icons/gi";
import LeftMenuBar from "Components/User/FindJobPage/LeftMenuBar";
import { MdAssignmentTurnedIn, MdFactCheck } from "react-icons/md";
import { BsBookmarkFill, BsBriefcase } from "react-icons/bs";

interface IFindJobPageProps {}
const FindJobPage: React.FC<IFindJobPageProps> = () => {
  const listItems = [
    {
      title: "All Jobs",
      icon: <BsBriefcase className="text-xl" />,
      pathTo: "/user/find-jobs/all-jobs",
    },
    {
      title: "Saved Jobs",
      icon: <BsBookmarkFill className="text-xl" />,
      pathTo: "/user/find-jobs/saved-jobs",
    },
    {
      title: "Skill Assessment",
      icon: <MdFactCheck className="text-xl" />,
      handleClick: () => {},
    },
    {
      title: "Applied Jobs",
      icon: <MdAssignmentTurnedIn className="text-xl" />,
      pathTo: "/user/find-jobs/applied-jobs",
    },
  ];

  return (
    <div className="min-h-screen p-3 bg-blue-50">
      <div className="grid md:grid-cols-10 gap-2 sm:gap-3 sm:container sm:py-5">
        <div className="col-span-12 sm:col-span-3 sm:min-h-screen">
          <LeftMenuBar listItems={listItems} />
          <SideOpen listItems={listItems}>
            <GiHamburgerMenu className="text-black sm:hidden " />
          </SideOpen>
        </div>
        <div className="col-span-12 sm:col-span-7 bg-white min-h-screen shadow-xl mb-16 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FindJobPage;
