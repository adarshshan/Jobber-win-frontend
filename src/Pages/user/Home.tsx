import React from 'react'
import LeftSide from 'Components/User/Home/LeftSide';
import MiddleSide from 'Components/User/Home/MiddleSide';
import FriendSuggession from 'Components/User/Profile/FriendSuggession';
interface ITestProps {

}
const Home: React.FC<ITestProps> = () => {


    return (
        <div className="container">
            <section className='grid sm:grid-cols-12 gap-5 min-h-[150px] py-5 bg-transparent'>
                <LeftSide />
                <MiddleSide />

                <div className="sm:col-span-3 shadow-lg bg-transparent min-h-[100px] rounded-lg">
                    <FriendSuggession />
                </div>
            </section>

        </div>

    )
}

export default Home
