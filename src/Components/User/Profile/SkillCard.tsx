import { Divider } from '@nextui-org/react'
import { deleteSkill, getAllSkills } from 'Api/user';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaArrowRightLong, FaPlus } from 'react-icons/fa6'
import { MdEdit, MdOutlineDeleteForever } from 'react-icons/md'
import ProfileModal from './ProfileModal';

interface ISillCardProps {
    setSkillAdd: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string | undefined;
    skillAdd: boolean;
}
const SkillCard: React.FC<ISillCardProps> = ({ setSkillAdd, userId, skillAdd }) => {

    const [skill, setSkill] = useState<string[]>();
    const [showSkill, setShowSkill] = useState(2);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) {
                    const result = await getAllSkills(userId);
                    setSkill(result?.data.data)
                }
            } catch (error) {
                console.log(error);
                toast.error('somthing went wrong while fetching data!');
            }
        }
        fetchData();
    });

    const handleDeleteSkill = async (skill: string) => {
        try {
            const result = await deleteSkill(userId, skill);
            if (result) toast.success('skill deleted successfully');
            else toast.error('somthing went wrong while deleting the skill!');
        } catch (error) {
            console.log(error as Error);
            toast.error('somthing went wrong while deleting the skill!');
        }
    }

    return (
        <>
            <div className="w-full min-h-[50px] bg-white mt-4 rounded-lg pt-8 p-4 shadow-lg">
                <div className="flex justify-between text-2xl mx-2">
                    <h1 className="font-semibold">Skills</h1>
                    <div onClick={() => setSkillAdd(true)}>
                        <ProfileModal skillAdd={skillAdd} setSkillAdd={setSkillAdd} userId={userId}>
                            <FaPlus className="me-3" />
                        </ProfileModal>
                    </div>
                </div>
                <div className="text-lg font-semibold">
                    {skill && skill?.length && skill.slice(0, showSkill).map((item, index) => {
                        return (
                            <div key={index}>
                                <Divider className="my-4" />
                                <div className="flex justify-between mx-5">
                                    <h1 >{item}</h1>
                                    <MdOutlineDeleteForever onClick={() => handleDeleteSkill(item)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Divider className="my-4" />
                {showSkill === 2 && <div onClick={() => setShowSkill(skill?.length ?? 1000)} className="flex justify-center cursor-pointer">
                    <h1>Show all {skill ? skill.length - 2 : 0} Skills</h1>
                    <FaArrowRightLong className="text-xl m-1 ms-2" />
                </div>}
                {showSkill !== 2 && <div onClick={() => setShowSkill(2)} className="flex justify-center cursor-pointer">
                    <h1>Less</h1>
                </div>}


            </div>
        </>
    )
}

export default SkillCard
