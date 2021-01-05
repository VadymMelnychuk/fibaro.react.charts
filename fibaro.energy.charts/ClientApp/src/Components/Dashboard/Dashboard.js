import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import FibaroApi from '../../Api/FibaroApi';

export default props => {
    const {deviceId} = props; 
    const [data, setData] = React.useState({});
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(async () => {
        let api = new FibaroApi();
        let requestedData = [];

        for(let index = 24; index > 0; index--) {
            let from = new Date();
            from.setHours(from.getHours() - index, 0, 0, 0);
            let to = new Date(from.getTime());
            to.setHours(to.getHours() + 1);
            const fromR = from.getTime() / 1000;
            const toR = to.getTime() / 1000;

            let loadedData = await api.GetEnergyData(fromR, toR, deviceId);
            let item = {
                hour: `${from.getHours()}:00`,
                energy: loadedData.length ? loadedData[0].kWh : 0
            }
            requestedData.push(item);
        }

        setData(requestedData);
        setIsLoaded(true);
    }, [deviceId]);

    return (
        <div>
            {
                isLoaded
                    ?
                    <BarChart width={700} height={400}
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }
                        }
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="energy" fill="#8884d8" />
                    </BarChart >
                    : <React.Fragment />
            }
        </div>
    )
};