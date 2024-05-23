import { Button, Tooltip } from '@nextui-org/react';
import { closePostReport, removeReportedPost } from 'Api/admin';
import React from 'react'
import toast from 'react-hot-toast';
import { MdRemoveCircle } from 'react-icons/md';
import Swal from 'sweetalert2';
import PostViewModal from './ViewPostModal';


interface ITalbeRowProps {
    index: number;
    item: any;
    setFetchAgain?: React.Dispatch<React.SetStateAction<boolean>>
    fetchAgain?: boolean
}

const TableRow2: React.FC<ITalbeRowProps> = ({ item, index, setFetchAgain, fetchAgain }) => {

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
    const handleClosePostReport = async (reportId: string) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    closePostReport(reportId).then((res) => {
                        if (res?.data.success) {
                            if (setFetchAgain) setFetchAgain(!fetchAgain);
                            Swal.fire({
                                title: "clossed!",
                                text: res.data.message,
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

            {/* <PostViewModal postId={item?.postId?._id}>
                <td className="px-4 py-4 text-sm text-blue-500 dark:text-gray-300 whitespace-nowrap cursor-pointer">View post</td>
            </PostViewModal> */}


            <td className="px-4 py-4 text-sm text-blue-500 dark:text-gray-300 whitespace-nowrap cursor-pointer">{item.reason}</td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                    {item?.postId?.isReported ? (
                        <button className="text-red-500 cursor-not-allowed">
                            removed
                        </button>
                    ) : (
                        <button onClick={() => handlePostReport(item.postId._id)} className="text-red-500 ">
                            remove post
                        </button>
                    )}


                    {/* <button className=" text-red-500">
                        block user
                    </button> */}
                </div>
            </td>
            <td>
                <Tooltip showArrow={true} content="delete this post report" className='bg-yellow-200 px-3 rounded-xl'>
                    <Button onClick={() => handleClosePostReport(item._id)}><MdRemoveCircle className='text-red-500 text-xl' /></Button>
                </Tooltip>


            </td>
        </tr>
    )
}

export default TableRow2
