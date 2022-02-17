import React from 'react';
import FibaroApi from '../../Api/FibaroApi';
import EnergyChart from './EnergyChart';
import RingLoader from "react-spinners/RingLoader";
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

        for (let index = 30; index > 0; index--) {
            let from = new Date((new Date()).getTime() - ((index - offset) * 24 * 60 * 60 * 1000));
            let to = new Date((new Date()).getTime() - (index - offset - 1) * 24 * 60 * 60 * 1000);

            let fromR = from.setHours(0, 0, 0, 0) / 1000;
            let toR = to.setHours(0, 0, 0, 0) / 1000;

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