import React from 'react';
import EnergyChart from './EnergyChart';
import FibaroApi from '../../Api/FibaroApi';
import DataLoader from './DataLoader';

export default props => {
    const { deviceId, offset } = props;
    const [data, setData] = React.useState({});
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(async () => {
        if (isLoaded) {
            setIsLoaded(false);
        }

        let api = new FibaroApi();
        let requestedData = [];

        for (let index = 24; index > 0; index--) {
            let from = new Date();
            from.setHours(from.getHours() - index + offset, 0, 0, 0);
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
    }, [deviceId, offset]);

    return (
        <React.Fragment>
            {
                isLoaded
                    ? <EnergyChart data={data} xAxisKey="hour" yAxisKey="energy"/>
                    : <DataLoader />
            }
        </React.Fragment>
    )
};