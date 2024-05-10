import { ListItem, OrderedList } from '@chakra-ui/react'
import { reportPost } from 'Api/user';
import { postReportReason } from 'constants/commonConstants';
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
                    text: "When you see somthing you don't like on JobberWin. you can report if it doesn't follow our community guideline or you can remove the person who shared if from your experience."
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
                    <ListItem onClick={() => triggerReport(postReportReason.A)} className='hover:bg-black hover:text-white'>{postReportReason.A}</ListItem>
                    <ListItem onClick={() => triggerReport(postReportReason.B)} className='hover:bg-black hover:text-white'>{postReportReason.B}</ListItem>
                    <ListItem onClick={() => triggerReport(postReportReason.C)} className='hover:bg-black hover:text-white'>{postReportReason.C}</ListItem>
                    <ListItem onClick={() => triggerReport(postReportReason.D)} className='hover:bg-black hover:text-white'>{postReportReason.D}</ListItem>
                    <ListItem onClick={() => triggerReport(postReportReason.E)} className='hover:bg-black hover:text-white'>{postReportReason.E}</ListItem>
                    <ListItem onClick={() => triggerReport(postReportReason.F)} className='hover:bg-black hover:text-white'>{postReportReason.F}</ListItem>
                    <ListItem onClick={() => triggerReport(postReportReason.G)} className='hover:bg-black hover:text-white'>{postReportReason.G}</ListItem>
                    <ListItem onClick={() => triggerReport(postReportReason.H)} className='hover:bg-black hover:text-white'>{postReportReason.H}</ListItem>
                    <ListItem onClick={() => triggerReport(postReportReason.I)} className='hover:bg-black hover:text-white'>{postReportReason.I}</ListItem>
                    <ListItem onClick={() => triggerReport(postReportReason.J)} className='hover:bg-black hover:text-white'>{postReportReason.J}</ListItem>
                    <ListItem onClick={() => triggerReport(postReportReason.K)} className='hover:bg-black hover:text-white'>{postReportReason.K}</ListItem>
                    <ListItem onClick={() => triggerReport(postReportReason.L)} className='hover:bg-black hover:text-white'>{postReportReason.L}</ListItem>
                    <ListItem onClick={() => triggerReport(postReportReason.M)} className='hover:bg-black hover:text-white'>{postReportReason.M}</ListItem>
                    <ListItem onClick={() => triggerReport(postReportReason.N)} className='hover:bg-black hover:text-white'>{postReportReason.N}</ListItem>
                </OrderedList>
            </div>
        </>
    )
}

export { ReportList } 
