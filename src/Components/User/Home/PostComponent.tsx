import React from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { IoIosShareAlt } from 'react-icons/io';
import { VscSave } from 'react-icons/vsc';

const PostComponent: React.FC = () => {
    return (
        <main className="h-full w-full bg-transparent flex items-center justify-center shadow-lg rounded-xl">
            <div className="border max-w-screen-md bg-transparent mt-6 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                    <div className="gap-3.5 flex items-center">
                        <img
                            src="https://images.unsplash.com/photo-1617077644557-64be144aa306?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                            className="object-cover rounded-full w-10 h-10"
                            alt="User Avatar"
                        />
                        <div className="flex flex-col">
                            <b className="mb-2 capitalize">Adarsh C</b>
                            <time dateTime="2021-08-06T21:15:00" className="text-gray-400 text-xs">
                                06 Sep at 09:15 PM
                            </time>
                        </div>
                    </div>
                    <div className="bg-gray-100 rounded-full h-3.5 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="34px" fill="#92929D">
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                    </div>
                </div>
                <div className="whitespace-pre-wrap mt-7">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore assumenda molestias unde doloremque ut. Nesciunt, facere nam <span className='text-blue-400'>read more ...</span></div>
                <div className="mt-5 flex gap-2 justify-center border-b pb-4 flex-wrap">
                    <img
                        src="https://images.unsplash.com/photo-1610147323479-a7fb11ffd5dd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80"
                        className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
                        alt="photo"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1614914135224-925593607248?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80"
                        className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
                        alt="photo"
                    />
                </div>
                <div className="h-16 border-b flex items-center justify-around">
                    <div className="flex items-center gap-3 hover:bg-blue-50 p-3">
                        <AiOutlineLike />
                        <div className="text-sm">5 Likes</div>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-blue-50 p-3">
                        <FaRegCommentAlt />
                        <div className="text-sm">10 Comments</div>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-blue-50 p-3">
                        <IoIosShareAlt />
                        <div className="text-sm">Share</div>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-blue-50 p-3">
                        <VscSave />
                        <div className="text-sm">Saved</div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <img
                        src="https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        className="bg-yellow-500 rounded-full w-10 h-10 object-cover border"
                        alt="User Avatar"
                    />
                    <div className="flex items-center bg-gray-50 h-11 w-11/12 border rounded-2xl overflow-hidden">
                        <input type="text" className="h-full w-full bg-gray-50 outline-none px-4" placeholder="Write your comment..." name="comment" />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PostComponent;
