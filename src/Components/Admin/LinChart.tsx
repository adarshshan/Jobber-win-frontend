import { DataItem } from '@/components/admin/Dashboard';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


interface ILinChartProps {
    data: DataItem[];
}
export const LinChart: React.FC<ILinChartProps> = ({ data }) => {
    return (
        <LineChart width={800} height={500} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="bump" dataKey="count" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    )
}