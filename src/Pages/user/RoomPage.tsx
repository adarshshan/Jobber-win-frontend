import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { shareVideoLink } from 'Api/chat';
import { ChatState } from 'Context/ChatProvider';

const RoomPage: React.FC = () => {
    const { roomId } = useParams();

    const {
        selectedChat,
        again,
        setAgain,
        setVideoLink } = ChatState()


    var videoUrl: any;
    if (roomId) {
        videoUrl = window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?roomID=' +
            roomId
    }
    useEffect(() => {
        const handleSendVideoLike = async () => {
            try {
                if (!selectedChat) return console.log('you are not selected any user');
                const res = await shareVideoLink(selectedChat?._id, videoUrl);
                if (res?.data.success) {
                    console.log(res.data.data); console.log('this will be teh result');
                    setVideoLink(res.data.data);
                    setAgain(!again);
                }
            } catch (error) {
                console.log(error as Error);
            }
        }
        handleSendVideoLike()
    }, [])
    const myMeeting = async (element: any) => {
        if (roomId) {
            const appID = 1526459523
            const serverSecret = process.env.REACT_APP_CIGO_SECRET || ''
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), 'user');
            const zc = ZegoUIKitPrebuilt.create(kitToken);
            zc.joinRoom({
                container: element,
                sharedLinks: [
                    {
                        name: 'Copy Link',
                        url: videoUrl

                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                showScreenSharingButton: true,
            });
        }
    }

    return (
        <div className=''>
            <div className='px-20' ref={myMeeting} />
        </div>
    )
}

export default RoomPage
