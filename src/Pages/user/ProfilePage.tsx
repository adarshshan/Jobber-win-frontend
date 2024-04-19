
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import { getProfile } from "../../Api/user";
import { Button, Card, CardBody, CardHeader, Divider, Image, Link, User } from "@nextui-org/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../@/components/ui/alert-dialog"


interface UserData {
    _id?: string;
    name?: string;
    email?: string;
    isBlocked?: boolean;
    role?: string;
    profile_picture: string;
}

const ProfilePage: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserData | null>(null);

    // const { user } = useAppSelector((state) => state.auth)

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('ehlloo');
                const response = await getProfile();
                if (response) setUserProfile(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div className='flex flex-col items-center w-full gap-4 pt-4 justify-center '>
                {/* userprofile */}
                <Card className='w-[400px]'>
                    <CardBody>
                        <div className=' grid grid-cols-3 gap-4 w-full'>
                            <div className="flex flex-col  col-span-1 items-center relative">
                                <Image className=' h-48  object-cover' shadow="sm" radius="lg" alt="Profile pic" src="https://media.licdn.com/media/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png" />
                                <Button size="sm" className="absolute z-10 bottom-2 opacity-60 ml-2 fill-secondary-400 px-2 py-1" color="secondary" > Change Image </Button>
                            </div>
                            <div className=' grid grid-rows-2   col-span-2'>
                                <div className="flex justify-between items-start row-span-1">
                                    <div className="flex flex-col gap-0 w-full">
                                        <div className='flex items-center w-full '>
                                            <h3 className="font-semibold ">Adarsh C</h3>
                                            <div className="ml-2 fill-secondary-400 size-4">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlSpace="preserve"
                                                    width="10px"
                                                    height="10px"
                                                    viewBox="0 0 477.873 477.873"
                                                >
                                                    <path d="M392.533 238.937c-9.426 0-17.067 7.641-17.067 17.067V426.67c0 9.426-7.641 17.067-17.067 17.067H51.2c-9.426 0-17.067-7.641-17.067-17.067V85.337c0-9.426 7.641-17.067 17.067-17.067H256c9.426 0 17.067-7.641 17.067-17.067S265.426 34.137 256 34.137H51.2C22.923 34.137 0 57.06 0 85.337V426.67c0 28.277 22.923 51.2 51.2 51.2h307.2c28.277 0 51.2-22.923 51.2-51.2V256.003c0-9.425-7.641-17.066-17.067-17.066z" />
                                                    <path d="M458.742 19.142A65.328 65.328 0 0 0 412.536.004a64.85 64.85 0 0 0-46.199 19.149L141.534 243.937a17.254 17.254 0 0 0-4.113 6.673l-34.133 102.4c-2.979 8.943 1.856 18.607 10.799 21.585 1.735.578 3.552.873 5.38.875a17.336 17.336 0 0 0 5.393-.87l102.4-34.133c2.515-.84 4.8-2.254 6.673-4.13l224.802-224.802c25.515-25.512 25.518-66.878.007-92.393zm-24.139 68.277L212.736 309.286l-66.287 22.135 22.067-66.202L390.468 43.353c12.202-12.178 31.967-12.158 44.145.044a31.215 31.215 0 0 1 9.12 21.955 31.043 31.043 0 0 1-9.13 22.067z" />
                                                </svg>
                                            </div>
                                            <div className='flex items-center w-full '>
                                                <p className="text-small text-foreground/80">shanu</p>
                                                <div className="ml-2 fill-secondary-400 size-4">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlSpace="preserve"
                                                        width="10px"
                                                        height="10px"
                                                        viewBox="0 0 477.873 477.873"
                                                    >
                                                        <path d="M392.533 238.937c-9.426 0-17.067 7.641-17.067 17.067V426.67c0 9.426-7.641 17.067-17.067 17.067H51.2c-9.426 0-17.067-7.641-17.067-17.067V85.337c0-9.426 7.641-17.067 17.067-17.067H256c9.426 0 17.067-7.641 17.067-17.067S265.426 34.137 256 34.137H51.2C22.923 34.137 0 57.06 0 85.337V426.67c0 28.277 22.923 51.2 51.2 51.2h307.2c28.277 0 51.2-22.923 51.2-51.2V256.003c0-9.425-7.641-17.066-17.067-17.066z" />
                                                        <path d="M458.742 19.142A65.328 65.328 0 0 0 412.536.004a64.85 64.85 0 0 0-46.199 19.149L141.534 243.937a17.254 17.254 0 0 0-4.113 6.673l-34.133 102.4c-2.979 8.943 1.856 18.607 10.799 21.585 1.735.578 3.552.873 5.38.875a17.336 17.336 0 0 0 5.393-.87l102.4-34.133c2.515-.84 4.8-2.254 6.673-4.13l224.802-224.802c25.515-25.512 25.518-66.878.007-92.393zm-24.139 68.277L212.736 309.286l-66.287 22.135 22.067-66.202L390.468 43.353c12.202-12.178 31.967-12.158 44.145.044a31.215 31.215 0 0 1 9.12 21.955 31.043 31.043 0 0 1-9.13 22.067z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-start row-span-1 overflow-auto text-sm">
                                        <Button size="sm">Add Bio</Button>
                                    </div>
                                    <AlertDialog>
                                        <AlertDialogTrigger>Open</AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your account
                                                    and remove your data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </div>

                            </div>


                        </div>

                    </CardBody>
                </Card>



                {/* friends card. */}
                <div className='flex flex-col items-center w-full gap-4 pt-4 justify-center'>
                    <Card className="w-[400px]">
                        <div className="flex  justify-between items-center px-3">
                            <p className="text-lg text-left  py-3 bold">10 friends </p>
                            <p className="text-sm text-secondary-400">see all</p>
                        </div>
                        <Divider />
                        {/* {friends.map((friend) => (
                            <> */}

                        <CardHeader className="flex justify-between">
                            <User
                                name='shanu'
                                description={(
                                    <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
                                        {/* @{friend.username} */}
                                        shanuadarsh
                                    </Link>
                                )}
                                avatarProps={{
                                    src: "https://media.licdn.com/media/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png"
                                }}
                            />
                            <Button size="sm" >
                                Unfriend
                            </Button>
                        </CardHeader>
                        <CardHeader className="flex justify-between">
                            <User
                                name='shanu'
                                description={(
                                    <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
                                        {/* @{friend.username} */}
                                        shanuadarsh
                                    </Link>
                                )}
                                avatarProps={{
                                    src: "https://media.licdn.com/media/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png"
                                }}
                            />
                            <Button size="sm" >
                                Unfriend
                            </Button>
                        </CardHeader>

                        {/* </>
                        ))} */}
                    </Card>
                </div>



            </div>
        </>
    );
};

export default ProfilePage