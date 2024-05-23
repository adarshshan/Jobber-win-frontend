import { getBarChart } from 'Api/admin'
import BarCharts from 'Components/Admin/BarChart'
import { LinChart } from 'Components/Admin/LinChart'
import MyPieChart from 'Components/Admin/PieChart'
import { APPLICATIONS } from 'constants/adminConstants'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'



export interface DataItem {
    name: string;
    pv: number;
    amt: number;
}

const Dashboard = () => {
    const [dayData, setDayData] = useState<DataItem[]>([]);
    const [monthData, setMonthData] = useState<DataItem[]>([]);
    const [yearData, setYearData] = useState<DataItem[]>([]);
    const [active, setActive] = useState(APPLICATIONS.A);

    const [data, setData] = useState<DataItem[]>([])

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                const res = await getBarChart();
                if (res?.data.success) {
                    const D = res.data.data.day.map((item: any) => ({ name: `${item._id.day + '/' + item._id.month + '/' + item._id.year}`, pv: item.count }));
                    setDayData(D);
                    setData(D);
                    const M = res.data.data.month.map((item: any) => ({ name: `${item._id.month + '/' + item._id.year}`, pv: item.count }));
                    setMonthData(M);
                    const Y = res.data.data.year.map((item: any) => ({ name: `${item._id.year}`, pv: item.count }));
                    setYearData(Y);
                } else toast.error(res?.data.message);
            } catch (error) {
                console.log(error as Error)
            }
        }
        fetchGraphData();
    }, [])

    const chartSelector = async (data: DataItem[], color: string) => {
        setData(data);
        setActive(color);
    }

    return (
        <div>
            <div className="flex justify-center p-5 text-xl">
                {active}
            </div>
            <BarCharts data={data} />
            <div className="flex justify-center rounded-full">
                <div className="flex gap-2 rounded-full bg-blue-400 px-5 py-2 cursor-pointer">
                    <h1 className={`${active === APPLICATIONS.A ? 'text-white' : 'text-black'}`} onClick={() => chartSelector(dayData, APPLICATIONS.A)}>Day</h1>
                    <h1 className={`${active === APPLICATIONS.B ? 'text-white' : 'text-black'}`} onClick={() => chartSelector(monthData, APPLICATIONS.B)}>Month</h1>
                    <h1 className={`${active === APPLICATIONS.C ? 'text-white' : 'text-black'}`} onClick={() => chartSelector(yearData, APPLICATIONS.C)}>Year</h1>
                </div>
            </div>
            <div className="w-full flex justify-between gap-2 bg-gray-100">
                <LinChart />
                <MyPieChart />
            </div>
        </div>
    )
}

export default Dashboard
