import React from 'react';
//import NavMenu from './NavMenu';
import Grid from '@material-ui/core/Grid';
import { Container, Paper } from '@material-ui/core';
import EnergyNavigator from './EnergyNavigator/EnergyNavigator';
import Dashboard from './Dashboard/Dashboard';
import FibaroApi from '../Api/FibaroApi';

export default props => {
    //const user = localStorage.getItem('user');
    //const [interfaceData, setInterfaceData] = React.useState({});
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [deviceTree, setDeviceTree] = React.useState({});

    React.useEffect(() => {
        let api = new FibaroApi();
        api.GetInterfaceData().then(data => {
            //setInterfaceData(data);
            let tree = data.rooms
                .map(r => {
                    let o = Object.assign({}, r);
                    o["devices"] = data.devices.filter(d => d.roomID === r.id && d.interfaces?.includes("energy"));
                    return o;
                })
                .filter(r => r.devices?.length > 0);
            setDeviceTree(tree);
            setIsLoaded(true);
        });
    });
    
    return (
        <Container>
            <Paper></Paper>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper>
                        {isLoaded
                        ? <EnergyNavigator data={deviceTree}/>
                        : null
                        }
                        
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper>
                        <Dashboard/>
                    </Paper>
                </Grid>

            </Grid>
        </Container>
    );
};