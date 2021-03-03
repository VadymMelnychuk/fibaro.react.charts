import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper } from '@material-ui/core';
import EnergyNavigator from './EnergyNavigator/EnergyNavigator';
import Dashboard from './Dashboard/Dashboard';
import FibaroApi from '../Api/FibaroApi';

const useStyles = makeStyles((theme) => ({
    container: {
    },
    root: {
        display: 'flex',
    },
    paperTop: {
        height: 70,
        width: '100%',
        paddingBottom: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    paperNavigator: {
        height: '100%'
    },
    paperDashboard: {
        width: '100%'
    },
    content: {
        flexGrow: 1,
    },
}));

export default props => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [deviceTree, setDeviceTree] = React.useState({});
    const [selectedDeviceId, setSelectedDeviceId] = React.useState(0);

    const classes = useStyles();

    React.useEffect(() => {
        let api = new FibaroApi();
        api.GetInterfaceData().then(data => {
            let tree = data.rooms
                .map(r => {
                    let o = Object.assign({}, r);
                    o["devices"] = data.devices.filter(d => d.roomID === r.id && d.interfaces?.includes("energy"));
                    return o;
                })
                .filter(r => r.devices?.length > 0);
            setDeviceTree(tree);
            setSelectedDeviceId(tree[0].devices[0].id);
            setIsLoaded(true);
        });
    }, []);

    const handleSelected = (deviceId) => {
        setSelectedDeviceId(deviceId);
    }

    return (
        <Container maxWidth={false} className={classes.container}>
            {isLoaded
                ? <div className={classes.root}>
                    <EnergyNavigator data={deviceTree} onSelected={handleSelected} />

                    <main className={classes.content}>
                        <Paper className={classes.paperDashboard}>
                            <Paper className={classes.paperTop}></Paper>
                            <Dashboard deviceId={selectedDeviceId} />
                        </Paper>
                    </main>
                </div>
                : null
            }
        </Container >
    );
};