import { Button } from '../../../@/components/ui/button';
import { addSkill } from 'Api/user';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io'

interface IAddSkillScreenProps {
    setSkillAdd: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string | undefined;
}

const AddSkillScreen: React.FC<IAddSkillScreenProps> = ({ setSkillAdd, userId }) => {
    const [skill, setSkill] = useState('');

    const handleUpdateSkill = async () => {
        try {
            if (userId) {
                const result = await addSkill(userId, skill);
                if (result) toast.success('Skill added successfully');
                else toast.error('Somthing went wrong while adding the skill.');
                setSkillAdd(false)
            }
        } catch (error) {
            console.log(error as Error);
        }
    }

    return (
        <>
            <div className="w-[700px] h-[500px] bg-gray-900 shadow-2xl rounded-2xl fixed top-[100px] left-[300px] text-white">
                <div className="flex justify-between m-4 text-xl">
                    <h1>Edit About</h1>
                    <IoMdClose onClick={() => setSkillAdd(false)} className="text-4xl" />
                </div>
                <div className="m-4 p-3">
                    <p>Enter your Skill here</p>
                    <input type="text"
                        placeholder='type here'
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        className='rounded-full w-full my-8 p-5 bg-transparent border border-gray-300' />
                </div>
                <div className="flex justify-end p-5 me-10">
                    <Button onClick={handleUpdateSkill} variant="secondary">Save</Button>
                </div>
            </div>
        </>
    )
}

export default AddSkillScreen
