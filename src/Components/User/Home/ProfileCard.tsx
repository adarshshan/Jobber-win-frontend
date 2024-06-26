import { UserData } from '@/components/user/ProfilePage';
import { Divider, Image } from '@nextui-org/react'
import React, { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom';

interface IProfilCardProps {
    userProfile: UserData | null;
}
const ProfileCard: React.FC<IProfilCardProps> = ({ userProfile }) => {
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
    return (
        <>
            <div id="profileCard" className='bg-white rounded-xl shadow-lg'>
                <div className="w-full relative" ref={parentRef}>
                    <Image
                        className="w-[7000px] h-[100px] sm:h-[80px] rounded-t-lg z-0"
                        alt="NextUI hero Image"
                        src='https://images.template.net/wp-content/uploads/2014/11/Natural-Facebook-Cover-Photo.jpg'
                    />
                    <img ref={childRef} className="absolute top-[10px] ms-2 left-[95px] b-10 w-32 h-32 sm:w-24 sm:h-24 rounded-full" src={userProfile?.profile_picture} alt="\\profile image" />

                </div>
                <div className="flex justify-center text-center">
                    <div className='mt-14 mb-10'>
                        <h1 className='font-semibold text-xl'>{userProfile?.name}</h1>
                        <p>{userProfile?.email}</p>
                        <Link to='/user/profile'>
                            <span className='outline-slate-300 border-1 text-blue-400 mt-5'>View Profile</span>
                        </Link>
                    </div>
                </div>
                <Divider className="my-4 pb-5" />
            </div>
        </>
    )
}

export default ProfileCard
