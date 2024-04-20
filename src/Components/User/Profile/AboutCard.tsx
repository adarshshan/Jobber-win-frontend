import React from 'react'
import { CiEdit } from 'react-icons/ci'

interface IAboutCardProps {

}
const AboutCard: React.FC<IAboutCardProps> = () => {
    return (
        <>
            <div className="w-full min-h-[50px] bg-gray-100 mt-4 rounded-lg pt-8 p-4 shadow-lg">
                <div className="flex justify-between">
                    <h1 className="text-xl font-semibold ms-5">About</h1>
                    <CiEdit className="font-semibold text-2xl me-8" />
                </div>
                <div className="text-center sm:text-left mt-3">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti numquam velit impedit error? Recusandae odio quia nesciunt deserunt pariatur! Consectetur illum sequi, a porro consequatur expedita fugit asperiores voluptatum sit molestiae qui magni enim unde totam! Dignissimos, asperiores nam cupiditate nesciunt facere nemo labore, repudiandae eveniet, hic modi explicabo! Delectus assumenda autem laboriosam.</p>
                </div>
            </div>
        </>
    )
}

export default AboutCard
