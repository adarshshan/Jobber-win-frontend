import { Divider } from '@nextui-org/react'
import React from 'react'
import { FaArrowRightLong, FaPlus } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'

interface ISillCardProps {

}
const SkillCard: React.FC<ISillCardProps> = () => {
    return (
        <>
            <div className="w-full min-h-[50px] bg-gray-100 mt-4 rounded-lg pt-8 p-4 shadow-lg">
                <div className="flex justify-between text-2xl mx-2">
                    <h1 className="font-semibold">Skills</h1>
                    <div className="flex">
                        <FaPlus className="me-3" />
                        <MdEdit />
                    </div>
                </div>
                <div className="text-lg font-semibold">
                    <Divider className="my-4" />
                    <h1>Javascript</h1>
                    <Divider className="my-4" />
                    <h1>React</h1>
                    <Divider className="my-4" />
                    <h1>Mongo DB</h1>
                </div>
                <Divider className="my-4" />
                <div className="flex justify-center">
                    <h1>Show all 29 Skills</h1>
                    <FaArrowRightLong className="text-xl m-1 ms-2" />
                </div>

            </div>
        </>
    )
}

export default SkillCard
