import { getBarChart, getLineChart } from 'Api/admin'
import BarCharts from 'Components/Admin/BarChart'
import { LinChart } from 'Components/Admin/LinChart'
import MyPieChart from 'Components/Admin/PieChart'
import { APPLICATIONS, POSTEDJOBS } from 'constants/adminConstants'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export interface DataItem {
    name: string;
    count: number;
}

const Dashboard = () => {
    const [dayData, setDayData] = useState<DataItem[]>([]);
    const [monthData, setMonthData] = useState<DataItem[]>([]);
    const [yearData, setYearData] = useState<DataItem[]>([]);
    const [active, setActive] = useState(APPLICATIONS.A);

    const [day, setDay] = useState<DataItem[]>([]);
    const [month, setMonth] = useState<DataItem[]>([]);
    const [year, setYear] = useState<DataItem[]>([]);
    const [acitveOne, setActiveOne] = useState(POSTEDJOBS.A);

    const [data, setData] = useState<DataItem[]>([]);
    const [jobData, setJobData] = useState<DataItem[]>([]);

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                const res = await getBarChart();
                if (res?.data.success) {
                    const D = res.data.data.day.map((item: any) => ({ name: `${item._id.day + '/' + item._id.month + '/' + item._id.year}`, count: item.count }));
                    setDayData(D);
                    setData(D);
                    const M = res.data.data.month.map((item: any) => ({ name: `${item._id.month + '/' + item._id.year}`, count: item.count }));
                    setMonthData(M);
                    const Y = res.data.data.year.map((item: any) => ({ name: `${item._id.year}`, count: item.count }));
                    setYearData(Y);
                } else toast.error(res?.data.message);
            } catch (error) {
                console.log(error as Error)
            }
        }
        const fetchJobGraphData = async () => {
            try {
                const res = await getLineChart();
                if (res?.data.success) {
                    const D = res.data.data.day.map((item: any) => ({ name: `${item._id.day + '/' + item._id.month + '/' + item._id.year}`, count: item.count }));
                    setDay(D);
                    setJobData(D);
                    const M = res.data.data.month.map((item: any) => ({ name: `${item._id.month + '/' + item._id.year}`, count: item.count }));
                    setMonth(M);
                    const Y = res.data.data.year.map((item: any) => ({ name: `${item._id.year}`, count: item.count }));
                    setYear(Y);
                } else toast.error(res?.data.message);
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchGraphData();
        fetchJobGraphData();
    }, [])

    const chartSelector = async (data: DataItem[], color: string) => {
        setData(data);
        setActive(color);
    }
    const LineChartSelector = async (data: DataItem[], color: string) => {
        setJobData(data);
        setActiveOne(color);
    }

    return (
        <div>
            <div className="flex justify-center p-5 text-2xl text-yellow-600 ">
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
            <div className="w-full flex justify-center gap-2 bg-gray-100 mt-8">
                <div>
                    <div className="flex justify-center text-2xl text-yellow-600">
                        {acitveOne}
                    </div>
                    <LinChart data={jobData} />
                    <div className="flex justify-center rounded-full">
                        <div className="flex gap-2 rounded-full bg-blue-400 px-5 py-2 cursor-pointer">
                            <h1 className={`${acitveOne === POSTEDJOBS.A ? 'text-white' : 'text-black'}`} onClick={() => LineChartSelector(day, POSTEDJOBS.A)}>Day</h1>
                            <h1 className={`${acitveOne === POSTEDJOBS.B ? 'text-white' : 'text-black'}`} onClick={() => LineChartSelector(month, POSTEDJOBS.B)}>Month</h1>
                            <h1 className={`${acitveOne === POSTEDJOBS.C ? 'text-white' : 'text-black'}`} onClick={() => LineChartSelector(year, POSTEDJOBS.C)}>Year</h1>
                        </div>
                    </div>
                </div>

                {/* <MyPieChart /> */}
            </div>
        </div>
    )
}

export default Dashboard
