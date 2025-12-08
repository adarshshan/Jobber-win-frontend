import { Divider } from "@nextui-org/react";
import { deleteSkill, getAllSkills } from "Api/user";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRightLong, FaPlus } from "react-icons/fa6";
import { MdEdit, MdOutlineDeleteForever } from "react-icons/md";
import ProfileModal from "./ProfileModal";

interface ISillCardProps {
  setSkillAdd: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
  skillAdd: boolean;
}
const SkillCard: React.FC<ISillCardProps> = ({
  setSkillAdd,
  userId,
  skillAdd,
}) => {
  const [skill, setSkill] = useState<string[]>();
  const [showSkill, setShowSkill] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const result = await getAllSkills(userId);
          setSkill(result?.data.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("somthing went wrong while fetching data!");
      }
    };
    fetchData();
  }, [userId]);

  const handleDeleteSkill = async (skill: string) => {
    try {
      const result = await deleteSkill(userId, skill);
      if (result) toast.success("skill deleted successfully");
      else toast.error("somthing went wrong while deleting the skill!");
    } catch (error) {
      console.log(error as Error);
      toast.error("somthing went wrong while deleting the skill!");
    }
  };

  return (
    <>
      <div className="w-full min-h-[50px] bg-white mt-4 rounded-lg p-4 sm:p-6 sm:pt-8 shadow-lg">
        <div className="flex justify-between text-xl sm:text-2xl mx-2 sm:mx-4">
          <h1 className="font-semibold">Skills</h1>
          <div onClick={() => setSkillAdd(true)}>
            <ProfileModal
              skillAdd={skillAdd}
              setSkillAdd={setSkillAdd}
              userId={userId}
            >
              <FaPlus className="me-3" />
            </ProfileModal>
          </div>
        </div>
        <div className="text-base sm:text-lg font-semibold">
          {skill &&
            skill?.length &&
            skill.slice(0, showSkill).map((item, index) => {
              return (
                <div key={index}>
                  <Divider className="my-4" />
                  <div className="flex justify-between mx-3 sm:mx-5">
                    <p>{item}</p>
                    <MdOutlineDeleteForever
                      onClick={() => handleDeleteSkill(item)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <Divider className="my-4" />
        {showSkill === 2 && (
          <div
            onClick={() => setShowSkill(skill?.length ?? 1000)}
            className="flex justify-center cursor-pointer"
          >
            <p>Show all {skill ? skill.length - 2 : 0} Skills</p>
            <FaArrowRightLong className="text-xl m-1 ms-2" />
          </div>
        )}
        {showSkill !== 2 && (
          <div
            onClick={() => setShowSkill(2)}
            className="flex justify-center cursor-pointer"
          >
            <p>Less</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SkillCard;
