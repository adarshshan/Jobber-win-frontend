import React from 'react'
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'

const Cancel: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-100 h-screen">
            <div className="bg-white p-6 ">
                <div className=' w-full flex justify-center'>
                    <MdOutlineCancel className='text-9xl text-red-500' />
                </div>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Canelled!</h3>
                    <p className="text-gray-600 my-2">oops! your payment has cancelled please try again.</p>
                    <p> try again!  </p>
                    <div className="py-10 text-center">
                        <button onClick={() => navigate(-1)} className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                            GO BACK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cancel
