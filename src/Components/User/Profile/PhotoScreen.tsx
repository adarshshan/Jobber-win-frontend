import { UserData } from '@/components/user/ProfilePage';
import { setProfilePic } from 'Api/user';
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoCameraSharp } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
interface IPhotoScreenProps {
    setAddProfilescreen: React.Dispatch<React.SetStateAction<boolean>>;
    setPic: React.Dispatch<React.SetStateAction<string>>;
    userProfile: UserData | null;
    pic: string;
}

const PhotoScreen: React.FC<IPhotoScreenProps> = ({ setAddProfilescreen, setPic, userProfile, pic }) => {
    const [picMessages, setPicMessage] = useState('');
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
                    setPic(data.url.toString()); console.log(pic + 'heeee');
                    if (userProfile) setProfilePic(data.url.toString(), userProfile?._id).then((result) => setAddProfilescreen(false));
                })
                .catch((err) => {
                    console.log(err);
                    setPicMessage('Somthing went wrong, please try again');
                });
        } else {
            setPicMessage('please select a valid image.');
        }
    }
    return (
        <>
            <div className="w-[700px] h-[500px] bg-gray-900 shadow-2xl rounded-2xl absolute top-[100px] left-[300px] text-white">
                <div className="flex justify-between m-5 text-2xl">
                    <h1>Profile Photo</h1>
                    <IoMdClose onClick={() => setAddProfilescreen(false)} />
                </div>
                <p className="text-red-400 font-semibold m-5">{picMessages}</p>
                <div className="flex justify-center">
                    <img className="rounded-full w-[280px] h-[280px]" src={pic ?? "https://image.europafm.com/clipping/cmsimages01/2022/07/19/8AC3EBBD-873A-4532-8F0D-68C945D6BAB6/emilia-clarke-actriz-britanica-35-anos_98.jpg?crop=3355,1888,x0,y19&width=1900&height=1069&optimize=low&format=webply"} alt="" />
                </div>
                <input type="file" id="openGallery" className="hidden"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => postDetails(e.target.files?.[0] ?? null)} />
                <hr className="mt-9" />
                <div className="flex justify-around text-xl mt-3">
                    <div className="text-center" onClick={openGallery}>
                        <IoCameraSharp className="text-4xl ms-4" />
                        <h1 id="openGallery">Add Photo</h1>
                    </div>
                    <div className="text-center">
                        <MdDelete className="text-4xl ms-2" />
                        <h1>Delete</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PhotoScreen
