'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface TopJobData {
    jobName: string;
    applyCount: number;
}

interface TopJobsProps {
    temp: TopJobData[];
}

export function TopJobs({ temp }: TopJobsProps) {
    // Map the API data to the format expected by Recharts
    const chartData = temp.map((item) => ({
        name: item.jobName,
        applications: item.applyCount,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" scale="band" width={100} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [`${value} Cv`, 'Number of applicants']} />
                <Bar dataKey="applications" fill="#8884d8" radius={[0, 4, 4, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
