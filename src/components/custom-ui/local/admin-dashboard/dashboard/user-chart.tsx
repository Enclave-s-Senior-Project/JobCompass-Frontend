'use client';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type props = {
    totalEnterprise?: number;
    totalCandidate?: number;
    totalJob?: number;
};

export function UserStats({ totalCandidate, totalEnterprise, totalJob }: props) {
    const data = [
        { name: 'Jobs', value: totalJob, color: '#8884d8' },
        { name: 'Enterprises', value: totalEnterprise, color: '#82ca9d' },
        { name: 'Candidates', value: totalCandidate, color: '#ffc658' },
    ];
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}`, 'Number']} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
