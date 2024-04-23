import React from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { PostInterface } from './PostCard';

interface IPostListItemProps {
    like: number;
    postItem: PostInterface;
}
const PostListItem: React.FC<IPostListItemProps> = ({ like, postItem }) => {

    const truncateDescription = (description: string, maxLength: number) => {
        const words = description.split(' ');
        const truncatedWords = words.slice(0, maxLength);
        const truncatedDescription = truncatedWords.join(' ');
        if (words.length > maxLength) {
            return truncatedDescription + ' ...';
        } else {
            return truncatedDescription;
        }
    }

    // Example usage
    const description = "Your big description goes here...";
    const maxLength = 150;
    const truncatedDescription = truncateDescription(description, maxLength);
    console.log(truncatedDescription);

    return (
        <>
            <div id="postlist">
                <div className="flex py-2 min-h-[100px]">
                    <div className="w-2/12 min-h-3">
                        <img className="w-[90px] h-[90px] ms-4" src={postItem.imageUrl} alt="///PostImage" />
                    </div>
                    <div className="w-10/12 min-h-3 ps-3">
                        {postItem.caption && truncateDescription(postItem.caption, 40)}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex ms-2">
                        <AiOutlineLike className="text-xl text-blue-400" /><p>{like}</p>
                    </div>
                    <p className="me-2">1 comment</p>
                </div>
            </div>
        </>
    )
}

export default PostListItem
