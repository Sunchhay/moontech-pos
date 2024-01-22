import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#F64E60',
    '#BF83FF',
    '#00C920',
];

const OrderPieChart = () => {
    return (
        <div className='-mr-4 relative'>
            <div className='absolute top-[72px] left-[56px] text-gray-600 text-sm'>Weekly</div>
            <PieChart width={150} height={150}>
                <Pie
                    data={data}
                    cx={75}
                    cy={75}
                    innerRadius={42}
                    outerRadius={55}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip contentStyle={{
                    fontSize: 12,
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingLeft: 8,
                    paddingRight: 8,
                    borderRadius: 5,
                }} />
            </PieChart>
        </div>
    )
}

export default OrderPieChart