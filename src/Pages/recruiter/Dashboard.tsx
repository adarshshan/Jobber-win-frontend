import { getGraphData } from 'Api/recruiter';
import BarCharts from 'Components/Admin/BarChart'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export interface DataItem {
    name: string;
    count: number;
}
interface IDashboardProps {

}
const DashBoard: React.FC<IDashboardProps> = () => {
    const [data, setData] = useState<DataItem[]>([])
    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                const res = await getGraphData();
                if (res?.data.success) {
                    const D = res.data.data.map((item: any) => ({ name: `${item._id.day + '/' + item._id.month + '/' + item._id.year}`, count: item.count }));
                    setData(D);
                } else toast.error(res?.data.message);
            } catch (error) {
                console.log(error);
            }
        }
        fetchGraphData();
    })
    return (
        <>
            <div className="w-full mt-20">
                <div className="flex justify-center text-yellow-500 text-2xl mb-10">
                    <p>job application Analytics</p>
                </div>
                <BarCharts data={data} />
            </div>
        </>
    )
}

export default DashBoard
