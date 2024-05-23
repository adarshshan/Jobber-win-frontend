import { DataItem } from '@/components/admin/Dashboard';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [{ name: 'Page A', uv: 400, pv: 10, amt: 2000 },
{ name: 'Page B', uv: 400, pv: 20, amt: 4000 },
{ name: 'Page C', uv: 40, pv: 30, amt: 400 },
{ name: 'Page D', uv: 400, pv: 40, amt: 5000 }
];

interface ILinChartProps {
    
}
export const LinChart: React.FC<ILinChartProps> = ({  }) => {
    return (
        <LineChart width={800} height={500} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    )
}