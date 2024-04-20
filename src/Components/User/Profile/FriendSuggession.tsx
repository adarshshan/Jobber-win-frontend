import { Button, Divider, User } from '@nextui-org/react'
import React from 'react'
import SingleUser from './SingleUser'

interface IFriendSuggessionProps {

}
const FriendSuggession: React.FC<IFriendSuggessionProps> = () => {
    return (
        <>
            <div id="friendsuggession" className="bg-gray-100 w-full pt-8 px-8 pb-3 rounded-lg shadow-lg text-lg">
                <h1 className="text-lg font-semibold">People you may know</h1>
                <Divider className="my-4" />
                <SingleUser name={'shanu'} description={'product Engineer'} imageUrl={"https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"} />
                <Divider className="my-4" />
                <SingleUser name={'Athira'} description={'Product Designer'} imageUrl={"https://marketplace.canva.com/EAFy6BtAOFA/1/0/1600w/canva-gold-black-modern-facebook-profile-picture-h0V1KbGIHbQ.jpg"} />
                <Divider className="my-4" />
                <SingleUser name={'Sivaprasad'} description={'Product Designer'} imageUrl={"https://i.pravatar.cc/150?u=a04258114e29026702d"} />
                <Divider className="my-4" />
                <SingleUser name={'Sujitha'} description={'Product Designer'} imageUrl={"https://media.licdn.com/dms/image/D5603AQGJTn2VyZFLfQ/profile-displayphoto-shrink_100_100/0/1705918446066?e=1718841600&v=beta&t=syC-g-nZLKr9xBtHoRRKOzXbuhRHgx9AtH5gI8PD6wQ"} />
                <Divider className="my-4" />
                <SingleUser name={'Adarsh Shanu'} description={'Software Engineer'} imageUrl={"https://i.pravatar.cc/150?u=a04258114e29026702d"} />
                <Divider className="my-4" />
                <div className="flex justify-center text-xl font-bold text-gray-400">
                    <p>Show More</p>
                </div>
            </div>
        </>
    )
}

export default FriendSuggession
