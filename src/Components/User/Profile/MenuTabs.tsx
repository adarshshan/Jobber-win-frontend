import { Chip, Tab, Tabs } from '@nextui-org/react'
import React from 'react'
import { BsFilePostFill } from 'react-icons/bs'
import { FaMusic, FaVideo } from 'react-icons/fa6'
import { GrGallery } from 'react-icons/gr'

interface IMenuTabsProps {

}
const MenuTabs: React.FC<IMenuTabsProps> = () => {
    return (
        <>
            <Tabs
                aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-[#22d3ee]",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                }}
            >
                <Tab
                    key="posts"
                    title={
                        <div className="flex items-center space-x-2">
                            <BsFilePostFill />
                            <span>Posts</span>
                            <Chip size="sm" variant="faded">9</Chip>
                        </div>
                    }
                />
                <Tab
                    key="photos"
                    title={
                        <div className="flex items-center space-x-2">
                            <GrGallery />
                            <span>Photos</span>
                            <Chip size="sm" variant="faded">9</Chip>
                        </div>
                    }
                />
                <Tab
                    key="music"
                    title={
                        <div className="flex items-center space-x-2">
                            <FaMusic />
                            <span>Music</span>
                            <Chip size="sm" variant="faded">3</Chip>
                        </div>
                    }
                />
                <Tab
                    key="videos"
                    title={
                        <div className="flex items-center space-x-2">
                            <FaVideo />
                            <span>Videos</span>
                            <Chip size="sm" variant="faded">1</Chip>
                        </div>
                    }
                />
            </Tabs>
        </>
    )
}

export default MenuTabs
