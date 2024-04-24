import { updateUser } from 'Api/user';
import { saveUser } from 'app/slice/AuthSlice';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux';
interface IUpdateScreenProps {
    setUpdateScreen: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string | undefined;
}
const UpdateScreen: React.FC<IUpdateScreenProps> = ({ setUpdateScreen, userId }) => {
    const [name, setName] = useState<string | undefined>();
    const [headLine, setHeadLine] = useState<string | undefined>();
    const [gender, setGender] = useState<string | undefined>();
    const [qualification, setQualification] = useState<string | undefined>();
    const [location, setLocation] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>();

    const dispatch = useDispatch();

    const handleSubmitForm = async () => {
        try {
            if (userId) {
                const result = await updateUser(userId, name, headLine, gender, qualification, location, phoneNumber);
                if (result?.data.success) toast.success('user details updated successfully');
                else toast.error(result?.data.message);
                dispatch(saveUser(result?.data.data));
                setUpdateScreen(false);
            }
        } catch (error) {
            console.log(error as Error);
            toast.error('somthing went wrong while updating the user details!');
        }
    }
    return (
        <>
            <div className="w-[700px] h-auto pb-10 bg-gray-900 shadow-2xl rounded-2xl absolute top-[100px] left-[300px] text-white ">
                <div className="flex justify-between m-4">
                    <h1>Edit Intro</h1>
                    <IoMdClose onClick={() => setUpdateScreen(false)} />
                </div>
                <div className="mx-5">
                    <label htmlFor="">Full Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="p-3 w-full border border-gray-300 rounded-full bg-transparent m-2" />
                </div>
                <div className="mx-5">
                    <label htmlFor="">Headline</label>
                    <input value={headLine} onChange={(e) => setHeadLine(e.target.value)} type="text" className="p-3 w-full border border-gray-300 rounded-full bg-transparent m-2" />
                </div>
                <div className="mx-5">
                    <label htmlFor="">Gender</label>
                    <input value={gender} onChange={(e) => setGender(e.target.value)} type="text" className="p-3 w-full border border-gray-300 rounded-full bg-transparent m-2" />
                </div>
                <div className="mx-5">
                    <label htmlFor="">Qualification</label>
                    <input value={qualification} onChange={(e) => setQualification(e.target.value)} type="text" className="p-3 w-full border border-gray-300 rounded-full bg-transparent m-2" />
                </div>
                <div className="mx-5">
                    <label htmlFor="">Location</label>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="p-3 w-full border border-gray-300 rounded-full bg-transparent m-2" />
                </div>
                <div className="mx-5">
                    <label htmlFor="">Phone number</label>
                    <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="number" className="p-3 w-full border border-gray-300 rounded-full bg-transparent m-2" />
                </div>
                <div className="flex justify-end m-4 text-white">
                    <button onClick={handleSubmitForm} className="border border-gray-300 p-3 rounded-2xl hover:bg-gray-400 hover:text-black">Save Changes</button>
                </div>
            </div>
        </>
    )
}

export default UpdateScreen
