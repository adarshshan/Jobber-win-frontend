import { Button, Textarea, Tooltip } from '@nextui-org/react'
import React from 'react'
import { FaRegSmile } from 'react-icons/fa'
import { GoFileMedia } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'


interface ICreatePostScreenProps {
    setCreatePostScreen: React.Dispatch<React.SetStateAction<boolean>>
}
const CreatePostScreen: React.FC<ICreatePostScreenProps> = ({ setCreatePostScreen }) => {
    return (
        <>
            <div className="w-[900px] h-[500px] bg-gray-900 shadow-2xl rounded-2xl fixed top-[80px] left-[240px] -z-0 text-white">
                <div className="flex justify-between m-4 text-xl">
                    <div className="flex justify-start">
                        <img className="rounded-full w-[50px] h-[50px] border border-x-white" src="https://media.licdn.com/dms/image/D5603AQF_xN3GHo924g/profile-displayphoto-shrink_800_800/0/1706861171963?e=1719446400&v=beta&t=ReNGteDNl9rU6N94YJI2XlyFTNSqO--qi3ryaWNhGrE" alt="" />
                        <h1 className="mt-2 ms-3 font-semibold">Adarsh C</h1>
                    </div>
                    <IoMdClose onClick={() => setCreatePostScreen(false)} className="m-3 text-2xl" />
                </div>
                <div className="w-full p-5">
                    <Textarea
                        variant={"bordered"}
                        label=""
                        labelPlacement="outside"
                        placeholder="What do you want to talk about ?"
                        className="border border-white rounded-xl p-4 h-52 text-xl"
                    />
                </div>
                <div className="flex justify-start text-white text-2xl gap-8 ms-10 mt-3">
                    <Tooltip content={"Add media"} className="text-white ">
                        <Button><GoFileMedia /></Button>
                    </Tooltip>
                    <Tooltip content={"Add imogies"} className="text-white">
                        <Button> <FaRegSmile /></Button>
                    </Tooltip>
                </div>
                <div className="flex justify-end m-5 me-10">
                    <button className="border border-white rounded-full px-8 py-2 hover:bg-gray-500">Post</button>
                </div>

            </div>
        </>
    )
}

export default CreatePostScreen
