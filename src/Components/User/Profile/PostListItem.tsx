import React from 'react'
import { AiOutlineLike } from 'react-icons/ai'

interface IPostListItemProps {
    like: number;
}
const PostListItem: React.FC<IPostListItemProps> = ({ like }) => {
    return (
        <>
            <div id="postlist">
                <div className="flex py-2 min-h-[100px]">
                    <div className="w-2/12 min-h-3">
                        <img className="w-[90px] h-[90px] ms-4" src="https://nextui-docs-v2.vercel.app/images/album-cover.png" alt="" />
                    </div>
                    <div className="w-10/12 min-h-3 ps-3">
                        Lorem ipsum dolor sit amet consectetur  unde minus porro nobis odit esse voluptatibus voluptates enim, laboriosam incidunt quam, magnam consequuntur, deserunt qui tenetur nemo quas reiciendis!
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
