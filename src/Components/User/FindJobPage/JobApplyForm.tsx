import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { storage } from 'firbase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid'
import toast from 'react-hot-toast';
import { applyJob } from 'Api/user';
import { useParams } from 'react-router-dom';

interface IJobApplyFormProps {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const JobApplyForm: React.FC<IJobApplyFormProps> = ({ setShowForm }) => {

    const [fileUpload, setFileUpload] = useState<File | null>(null);
    const [qualification, setQualification] = useState<string>('');
    const [experience, setExperience] = useState<number>(0);
    const [fileUrl, setFileUrl] = useState<string>('');

    const { jobId } = useParams()

    const uploadImage = () => {
        if (!fileUpload) return toast.error('please select a File');
        const imgRef = ref(storage, `myfiles/${fileUpload.name + v4()}`)
        uploadBytes(imgRef, fileUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setFileUrl(url);
            })
        })
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            uploadImage();
            if (jobId && fileUrl) {
                const res = await applyJob(jobId, fileUrl, qualification, experience)
                if (res?.data.success) toast.success(res.data.message);
                else toast.error(res?.data.message);
                setShowForm(false);
            }
        } catch (error) {
            console.log(error as Error)
            toast.error('Something went wrong while submitting the job application');
        }
    }

    return (
        <>
            <div className="fixed bg-gray-800 p-5 text-white w-full md:w-[900px] h-full sm:h-[500px] left-0 md:left-[250px] top-0 md:top-[80px] z-50">
                <div className="flex justify-between text-2xl">
                    <h1> Job Application</h1>
                    <IoClose onClick={() => setShowForm(false)} className='text-3xl' />
                </div>
                <hr className='mt-2' />
                <div>
                    <form onSubmit={handleSubmit}
                        className="max-w-lg mx-auto py-10">
                        <input type="text"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            placeholder='Highest Qualification' className="mb-5 mt-3 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <input type="text"
                            value={experience}
                            onChange={(e) => setExperience(parseInt(e.target.value))}
                            placeholder=' year of experience'
                            className="bg-gray-100 mt-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <label className="block mb-2 text-sm font-mediumtext-white mt-5">upload your resume</label>
                        <input type="file"
                            onChange={(event) => {
                                const selectedFile = event.target.files
                                if (selectedFile !== null && selectedFile.length > 0) {
                                    setFileUpload(selectedFile[0]);
                                }
                            }}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2" />
                        <div className="mt-1 flex justify-end p-4" >
                            <button type="submit" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Click to apply</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default JobApplyForm
