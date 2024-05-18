import { removeReportedJob, removeReportedPost } from 'Api/admin';
import React from 'react'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';


interface ITalbeRowProps {
    index: number;
    item: any;
    setFetchAgain?: React.Dispatch<React.SetStateAction<boolean>>
    fetchAgain?: boolean
}

const TableRow: React.FC<ITalbeRowProps> = ({ item, index, setFetchAgain, fetchAgain }) => {
    const handleJobReport = async (jobId: string) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, remove it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    removeReportedJob(jobId).then((res) => {
                        if (res?.data.success) {
                            if (setFetchAgain) setFetchAgain(!fetchAgain);
                            Swal.fire({
                                title: "Deleted!",
                                text: "job has been removed.",
                                icon: "success"
                            });
                        } else toast.error(res?.data.message);
                    })
                }
            });
        } catch (error) {
            console.log(error as Error)
        }
    }
    const handlePostReport = async (postId: string) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, remove it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    removeReportedPost(postId).then((res) => {
                        if (res?.data.success) {
                            if (setFetchAgain) setFetchAgain(!fetchAgain);
                            Swal.fire({
                                title: "Removed!",
                                text: "post has been removed",
                                icon: "success"
                            });
                        } else toast.error(res?.data.message);
                    })
                }
            });
        } catch (error) {
            console.log(error as Error);
        }
    }
    console.log(item); console.log('thiws is teh d item details..');
    return (
        <tr>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{index + 1}</td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.createdAt.slice(0, 10)}</td>

            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                <div className="flex items-center gap-x-2">
                    <img className="object-cover w-8 h-8 rounded-full" src={item.reportedBy.profile_picture} alt="" />

                    <div>
                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{item.reportedBy.name}</h2>
                        <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{item.reportedBy.email}</p>
                    </div>
                </div>
            </td>

            {item.postId ? (
                <td className="px-4 py-4 text-sm text-blue-500 dark:text-gray-300 whitespace-nowrap cursor-pointer">View post</td>
            ) : (
                <td className="px-4 py-4 text-sm text-blue-500 dark:text-gray-300 whitespace-nowrap cursor-pointer">View job</td>
            )}

            <td className="px-4 py-4 text-sm text-blue-500 dark:text-gray-300 whitespace-nowrap cursor-pointer">{item.reason}</td>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <h2 className="text-sm font-normal">{item.status}</h2>
                </div>
            </td>
            {item.postId ? (
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-x-6">
                        {item.postId.isReported ? (
                            <button className="text-red-500 cursor-not-allowed">
                                removed
                            </button>
                        ) : (
                            <button onClick={() => handlePostReport(item.postId._id)} className="text-red-500 ">
                                remove post
                            </button>
                        )}


                        <button className=" text-red-500">
                            block user
                        </button>
                    </div>
                </td>
            ) : (
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-x-6">
                        {item.jobId.isReported ? (
                            <button className="text-red-500 cursor-not-allowed">
                                removed
                            </button>
                        ) : (
                            <button onClick={() => { handleJobReport(item.jobId._id) }} className="text-red-500 ">
                                remove job
                            </button>
                        )}


                        <button className=" text-red-500">
                            block recruiter
                        </button>
                    </div>
                </td>
            )}

        </tr>
    )
}

export default TableRow
