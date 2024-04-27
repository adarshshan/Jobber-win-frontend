import { UserData } from '@/components/user/ProfilePage';
import { Button, Divider, Image } from '@nextui-org/react'
import { cancelRequest, getSendRequests, sendRequest } from 'Api/user';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

interface IContactCardProps {
    item: UserData;
    sendReq: string[] | undefined;
    setConfirmFriend: React.Dispatch<React.SetStateAction<boolean>>;
    confirmFriend: boolean;
}
const ContactCard: React.FC<IContactCardProps> = ({ item, sendReq, setConfirmFriend, confirmFriend }) => {


    const parentRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        const centerChild = () => {
            const parent = parentRef.current;
            const child = childRef.current;

            if (parent && child) {
                const parentRect = parent.getBoundingClientRect();
                const childRect = child.getBoundingClientRect();

                const offsetX = (parentRect.width - childRect.width) / 2;
                const offsetY = (parentRect.height - childRect.height) / 2;

                child.style.left = `${offsetX}px`;
                child.style.top = `${offsetY + 35}px`;
            }
        };

        centerChild();
        window.addEventListener('resize', centerChild);
        return () => {
            window.removeEventListener('resize', centerChild);
        };
    }, []);
    const handleSendRequest = async (receiverId: string) => {
        try {
            const result = await sendRequest(receiverId);
            if (result) setConfirmFriend(!confirmFriend);
            console.log(result);
        } catch (error) {
            console.log(error as Error);
        }
    }
    const withdrawRequest = async (id: string) => {
        try {
            const res = await cancelRequest(id);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div id="profileCard" className='bg-white rounded-xl shadow-lg'>
                <div className="w-full relative" ref={parentRef}>
                    <Image
                        className="w-[7000px] h-[100px] sm:h-[80px] rounded-t-lg z-0"
                        alt="NextUI hero Image"
                        src='https://assets.bldnxt.in/catalog/product/cache/1/image/a77c1558d860704591e3027d1ebed402/n/s/nsas640659_algv640659_5be410370bebe.jpg'
                    />
                    <img ref={childRef} className="absolute top-[10px] ms-2 left-[95px] b-10 w-32 h-32 sm:w-24 sm:h-24 rounded-full" src={item.profile_picture} alt="" />

                </div>
                <div className="flex justify-center text-center">
                    <div className='mt-14 mb-10'>
                        <h1 className='font-semibold text-xl'>{item.name}</h1>
                        <p>{item.headLine}</p>
                        <Link to={`/user/view-user-profile/${item._id}`}>
                            <span className='outline-slate-300 border-1 text-blue-400 mt-5'>View Profile</span>
                        </Link>
                        {sendReq?.includes(item._id) ? <button onClick={() => withdrawRequest(item._id)} className='outline-2 rounded-full px-2 bg-slate-300 hover:bg-blue-300 ms-2 mt-2'>Requested</button>
                            : <button onClick={() => handleSendRequest(item._id)} className='outline-2 rounded-full px-2 bg-slate-300 hover:bg-blue-300 ms-2 mt-2'>Add Friend</button>}
                    </div>
                </div>
                <Divider className="my-4 pb-5" />
            </div>
        </>
    )
}

export default ContactCard;
