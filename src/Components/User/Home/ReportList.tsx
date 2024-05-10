import { ListItem, OrderedList } from '@chakra-ui/react'
import { reportPost } from 'Api/user';
import { reason } from 'constants/commonConstants';
import React from 'react'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface IReportListProps {
    postId: string;
    onClose: () => void;
}
const ReportList: React.FC<IReportListProps> = ({ postId, onClose }) => {
    const triggerReport = async (reason: string) => {
        try {
            const res = await reportPost(reason, postId);
            onClose()
            if (res?.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Thanks for letting us to know",
                    text: "When you see somthing you don't like one JobberWin. you can report if it doesn't follow our community guideline or you can remove the person who shared if from your experience."
                });
            } else toast.error(res?.data.message);
        } catch (error) {
            console.log(error as Error);
        }
    }
    return (
        <>
            <div>
                <p className="font-semibold mb-4">Why are you reporting this post?</p>
                <OrderedList>
                    <ListItem onClick={() => triggerReport(reason.A)} className='hover:bg-black hover:text-white'>{reason.A}</ListItem>
                    <ListItem onClick={() => triggerReport(reason.B)} className='hover:bg-black hover:text-white'>{reason.B}</ListItem>
                    <ListItem onClick={() => triggerReport(reason.C)} className='hover:bg-black hover:text-white'>{reason.C}</ListItem>
                    <ListItem onClick={() => triggerReport(reason.D)} className='hover:bg-black hover:text-white'>{reason.D}</ListItem>
                    <ListItem onClick={() => triggerReport(reason.E)} className='hover:bg-black hover:text-white'>{reason.E}</ListItem>
                    <ListItem onClick={() => triggerReport(reason.F)} className='hover:bg-black hover:text-white'>{reason.F}</ListItem>
                    <ListItem onClick={() => triggerReport(reason.G)} className='hover:bg-black hover:text-white'>{reason.G}</ListItem>
                    <ListItem onClick={() => triggerReport(reason.H)} className='hover:bg-black hover:text-white'>{reason.H}</ListItem>
                    <ListItem onClick={() => triggerReport(reason.I)} className='hover:bg-black hover:text-white'>{reason.I}</ListItem>
                    <ListItem onClick={() => triggerReport(reason.J)} className='hover:bg-black hover:text-white'>{reason.J}</ListItem>
                    <ListItem onClick={() => triggerReport(reason.K)} className='hover:bg-black hover:text-white'>{reason.K}</ListItem>
                    <ListItem onClick={() => triggerReport(reason.L)} className='hover:bg-black hover:text-white'>{reason.L}</ListItem>
                    <ListItem onClick={() => triggerReport(reason.M)} className='hover:bg-black hover:text-white'>{reason.M}</ListItem>
                    <ListItem onClick={() => triggerReport(reason.N)} className='hover:bg-black hover:text-white'>{reason.N}</ListItem>
                </OrderedList>
            </div>
        </>
    )
}

export { ReportList } 
