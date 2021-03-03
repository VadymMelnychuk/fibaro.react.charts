import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

export default props => {
    const { data, xAxisKey, yAxisKey } = props;

    return (
        <ResponsiveContainer width='100%' height={400}>
            <BarChart
                data={data}

            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxisKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={yAxisKey} fill="#8884d8" />
            </BarChart >
        </ResponsiveContainer>
    )
};