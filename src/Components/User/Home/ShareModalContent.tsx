import { accessChat } from 'Api/chat';
import { getAllUsers, postShareSuggession } from 'Api/user';
import { ChatState } from 'Context/ChatProvider';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface IShareModalConitentProps {
    onClose: () => void;
    postId:string;
}
const ShareModalContent: React.FC<IShareModalConitentProps> = ({ onClose,postId }) => {
    const [suggession, setSuggession] = useState([]);
    const [search, setSearch] = useState('');

    const navigate = useNavigate()

    const {
        setSelectedChat,
        chats,
        setChats,
        setPostId
    } = ChatState();

    useEffect(() => {
        const fetchSuggession = async () => {
            try {
                const res = await postShareSuggession();
                if (res?.data.success) {
                    setSuggession(res.data.data);
                } else toast.error(res?.data.message);
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchSuggession()
    }, [])

    const handleSearchUsers = async () => {
        try {
            if (search.length) {
                const res = await getAllUsers(search);
                if (res?.data.success) {
                    setSuggession(res.data.data);
                }
            }
        } catch (error) {
            console.log(error as Error);
        }
    }

    const handleAccessChat = async (id: string,postId:string) => {
        try {
            const res = await accessChat(id);
            if (res?.data.success) {
                const data = res.data.data;
                if (!chats.find((c: any) => c._id === data._id)) setChats([data, ...chats]);
                setSelectedChat(data);
                setPostId(postId);
                onClose()
                navigate('/user/message');
            } else console.log('Something went wrong while invoking the accessChats function');
        } catch (error) {
            console.log(error as Error);
        }
    }
    
    return (
        <div>
            <hr />
            <div className="flex gap-4 bg-slate-100">
                <p className='m-auto text-lg font-semibold'>To: </p>
                <input type="text"
                    className='w-full p-3 bg-transparent  outline-none'
                    value={search}
                    onChange={(e: any) => setSearch(e.target.value)}
                    onKeyUp={handleSearchUsers}
                    placeholder='Search' />
            </div>

            <hr />
            <div>
                {!search && <p>Suggested</p>}
                {suggession.length ? suggession.map((item: any) => (
                    <div key={item._id}
                        onClick={() => {
                            handleAccessChat(item._id,postId);
                        }}
                        className="flex justify-start mt-2">
                        <img className='w-14 h-14 rounded-full' src={item.profile_picture} alt='///' />
                        <div className='mt-1 ms-2 font-normal'>
                            <h3 className=' text-lg'>{item.name}</h3>
                            <p>{item.headLine}</p>
                        </div>
                    </div>
                )) : (<h1 className='flex justify-center p-5 text-yellow-700'>No result</h1>)}
            </div>

        </div>
    )
}

export default ShareModalContent
