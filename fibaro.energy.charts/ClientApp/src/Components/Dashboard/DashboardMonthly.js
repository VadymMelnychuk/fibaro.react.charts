import React from 'react';
import FibaroApi from '../../Api/FibaroApi';
import DataLoader from './DataLoader';
import EnergyChart from './EnergyChart';

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

        const today = new Date();
        for (let index = 12; index > 0; index--) {

            let from = new Date(today.getFullYear(), today.getMonth(), 1);
            from.setMonth(-index + 2 + offset);
            let to = from.getMonth() == today.getMonth() && from.getFullYear() == today.getFullYear() 
                ? today 
                : new Date(from.getFullYear(), from.getMonth() + 1, 0);

            let fromR = from.setHours(0, 0, 0, 0) / 1000;
            let toR =to.setHours(0, 0, 0, 0) / 1000;

            let loadedData = await api.GetEnergyData(fromR, toR, deviceId);
            let item = {
                day: from.toLocaleDateString('uk-UA'),
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
                    ? <EnergyChart data={data} xAxisKey="day" yAxisKey="energy"/>
                    : <DataLoader />
            }
        </React.Fragment>
    )
};