import React from 'react'
import ScrollableFeed from 'react-scrollable-feed';
import { Avatar, Tooltip } from '@chakra-ui/react';
import { ChatState } from 'Context/ChatProvider';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from 'config/chatLogics';


interface IScrollableChatProps {
    messages: any[];
}
const ScrollableChat: React.FC<IScrollableChatProps> = ({ messages }) => {
    console.log(messages); console.log('from scrollable chat');
    console.log(Array.isArray(messages))
    const { userr } = ChatState()
    return (
        <ScrollableFeed>
            {messages && messages.length && messages.map((m, i) => (
                <div key={i} style={{ display: 'flex' }}>
                    {(isSameSender(messages, m, i, userr._id) || isLastMessage(messages, i, userr._id)) && (
                        <Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
                            <Avatar
                                mt='7px'
                                mr={1}
                                size='sm'
                                cursor='pointer'
                                name={m.sender.name}
                                src={m.sender.pic} />
                        </Tooltip>
                    )}
                    <span style={{
                        backgroundColor: `${m.sender?._id === userr._id ? '#BEE3F8' : '#B9F5D0'}`,
                        borderRadius: "20px",
                        padding: "5px 15px",
                        maxWidth: "75%",
                        marginLeft: isSameSenderMargin(messages, m, i, userr._id),
                        // marginLeft: 33,
                        marginTop: isSameUser(messages, m, i) ? 3 : 10,
                        // marginTop: 3,
                    }}>
                        {m.content}
                    </span>
                </div>
            ))}
        </ScrollableFeed>
    )
}

export default ScrollableChat
