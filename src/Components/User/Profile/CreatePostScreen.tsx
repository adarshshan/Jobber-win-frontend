import { Button, Textarea, Tooltip } from '@nextui-org/react'
import { createPost, getAllPosts } from 'Api/user'
import { useAppSelector } from 'app/store'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegSmile } from 'react-icons/fa'
import { GoFileMedia } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'


interface ICreatePostScreenProps {
    setCreatePostScreen: React.Dispatch<React.SetStateAction<boolean>>
}
const CreatePostScreen: React.FC<ICreatePostScreenProps> = ({ setCreatePostScreen }) => {
    const [caption, setCaption] = useState('');
    const [pic, setPic] = useState('');
    const [picMessages, setPicMessage] = useState('');


    const { user } = useAppSelector((state) => state.auth);
    
    const openGallery = () => {
        const butn = document.getElementById('openGallery');
        if (butn) butn.click();
    }

    const postDetails = (pics: File | null) => {
        if (!pics) return setPicMessage('Please Select an image!');
        setPicMessage('');
        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics)
            data.append('upload_preset', 'noteziper')
            data.append('cloud_name', 'dnn1ree80')
            fetch("https://api.cloudinary.com/v1_1/dnn1ree80/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.url.toString());
                    setPic(data.url.toString()); console.log(pic + 'heeee'); console.log('This is from the create post screen.....');

                })
                .catch((err) => {
                    console.log(err);
                    setPicMessage('Somthing went wrong, please try again');
                });
        } else {
            setPicMessage('please select a valid image.');
        }
    }
    const handleSubmit = async () => {
        try {
            if (!pic.length) {
                toast.error('Please select an image');
            } else {
                const result = await createPost(pic, user._id, caption);
                console.log(result); console.log('this is the result from the createpostScreen');
                if (result) {
                    toast.success('post uploaded successfully.')
                    setCreatePostScreen(false)
                } else {
                    toast.error('somthing went wrong while posting.');
                }
            }
        } catch (error) {
            console.log(error as Error);
        }
    }
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
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="What do you want to talk about ?"
                        className="border border-white rounded-xl p-4 h-52 text-xl"
                    />
                </div>
                <input id='openGallery' onChange={(e: React.ChangeEvent<HTMLInputElement>) => postDetails(e.target.files?.[0] ?? null)} type="file" className='hidden' />
                <div className="flex justify-start text-white text-2xl gap-8 ms-10 mt-3">
                    <Tooltip content={"Add media"} className="text-white ">
                        <Button onClick={openGallery}><GoFileMedia /></Button>
                    </Tooltip>
                    <Tooltip content={"Add imogies"} className="text-white">
                        <Button> <FaRegSmile /></Button>
                    </Tooltip>
                </div>
                <div className="flex justify-end m-5 me-10">
                    <button onClick={handleSubmit} className="border border-white rounded-full px-8 py-2 hover:bg-gray-500">Post</button>
                </div>

            </div>
        </>
    )
}

export default CreatePostScreen
