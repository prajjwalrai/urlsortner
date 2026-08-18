import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Placeholder data since backend doesn't support time-series yet
const generatePlaceholderData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
        name: day,
        clicks: Math.floor(Math.random() * 50) + 10
    }));
};

const data = generatePlaceholderData();

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-navy-800 border border-navy-600 p-3 rounded-lg shadow-xl">
                <p className="text-slate-300 text-sm font-medium mb-1">{label}</p>
                <p className="text-blue-400 font-bold">
                    {payload[0].value} <span className="text-slate-400 font-normal text-sm">clicks</span>
                </p>
            </div>
        );
    }
    return null;
};

const AnalyticsChart = () => {
    return (
        <div className="bg-navy-800 p-6 rounded-2xl shadow-sm border border-navy-700 h-full flex flex-col">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-100">Click Analytics</h3>
                <p className="text-sm text-slate-400">Placeholder data for recent engagement</p>
            </div>
            
            <div className="flex-1 min-h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            stroke="#475569" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis 
                            stroke="#475569" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                            dx={-10}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Line 
                            type="monotone" 
                            dataKey="clicks" 
                            stroke="#3B82F6" 
                            strokeWidth={3} 
                            dot={{ fill: '#1E293B', stroke: '#3B82F6', strokeWidth: 2, r: 4 }} 
                            activeDot={{ fill: '#3B82F6', stroke: '#0B1120', strokeWidth: 2, r: 6 }} 
                            animationDuration={1500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticsChart;
