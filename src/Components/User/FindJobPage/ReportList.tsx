import { ListItem, OrderedList } from '@chakra-ui/react'
import { reportJob } from 'Api/user';
import { jobReportReasons } from 'constants/commonConstants';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface IReportListProps {
    jobId: string;
    onClose: () => void;
}
const ReportList: React.FC<IReportListProps> = ({ jobId, onClose }) => {
    const [reason, setReason] = useState('');

    const triggerReport = async (reason: string) => {
        try {
            const res = await reportJob(reason, jobId);
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
                <p className="font-semibold mb-4">Why are you reporting this job?</p>
                <OrderedList>
                    <ListItem onClick={() => triggerReport(jobReportReasons.A)} className='hover:bg-black hover:text-white'>{jobReportReasons.A}</ListItem>
                    <ListItem onClick={() => triggerReport(jobReportReasons.B)} className='hover:bg-black hover:text-white'>{jobReportReasons.B}</ListItem>
                    <ListItem onClick={() => triggerReport(jobReportReasons.C)} className='hover:bg-black hover:text-white'>{jobReportReasons.C}</ListItem>
                </OrderedList>
                <input
                    type="text"
                    value={reason}
                    onChange={(e: any) => setReason(e.target.value)}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter') triggerReport(reason)
                    }}
                    className='w-full p-2 bg-gray-50 mt-3 mb-2'
                    placeholder='Other reason' />
            </div>
        </>
    )
}

export { ReportList } 
