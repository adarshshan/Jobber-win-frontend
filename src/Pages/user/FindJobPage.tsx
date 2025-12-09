import AllJobs from "Components/User/FindJobPage/AllJobs";
import AppliedJobScreen from "Components/User/FindJobPage/AppliedJobScreen";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SavedJobScreen from "Components/User/FindJobPage/SavedJobScreen";
import SideOpen from "Components/User/FindJobPage/SideOpen";
import { GiHamburgerMenu } from "react-icons/gi";

interface IFindJobPageProps {}
const FindJobPage: React.FC<IFindJobPageProps> = () => {
  const [showApplied, setShowApplied] = useState(false);
  const [showAllJobs, setShowAllJobs] = useState(true);
  const [showSave, setShowSave] = useState(false);
  const [savedJobs, setSavedJobs] = useState<any[]>();

  const openSavedJobPage = async () => {
    setShowSave(true);
    setShowApplied(false);
    setShowAllJobs(false);
  };

  const listItems = [
    {
      title: "All Jobs",
      handleClick: () => {
        setShowAllJobs(true);
        setShowApplied(false);
      },
    },
    {
      title: "Saved Jobs",
      handleClick: () => {
        setShowSave(true);
        setShowApplied(false);
        setShowAllJobs(false);
      },
    },
    {
      title: "Skill Assessment",
      handleClick: () => {},
    },
    {
      title: "Applied Jobs",
      handleClick: () => {
        setShowApplied(true);
      },
    },
  ];

  return (
    <div className="min-h-screen p-3 bg-blue-50">
      <div className="grid md:grid-cols-12 gap-2 sm:gap-5 sm:container py-5">
        <div className="col-span-12 sm:col-span-4 sm:min-h-screen">
          <div className="w-full rounded-md bg-white p-3 sm:block hidden">
            {listItems?.map((item, index) => (
              <div
                key={`menuitem-${index}`}
                onClick={item.handleClick}
                className="w-full p-4 hover:bg-gray-500 hover:text-white shadow-md m-2"
              >
                {item.title}
              </div>
            ))}
          </div>
          <SideOpen
            openSavedJobPage={openSavedJobPage}
            setShowAllJobs={setShowAllJobs}
            setShowApplied={setShowApplied}
          >
            <GiHamburgerMenu className="text-black sm:hidden " />
          </SideOpen>
        </div>
        <div className="col-span-12 sm:col-span-8 bg-white min-h-screen shadow-xl mb-16">
          {!showApplied && showAllJobs && <AllJobs />}
          {showApplied && <AppliedJobScreen />}
          {!showAllJobs && !showApplied && showSave && (
            <SavedJobScreen savedJobs={savedJobs} setSavedJobs={setSavedJobs} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FindJobPage;
