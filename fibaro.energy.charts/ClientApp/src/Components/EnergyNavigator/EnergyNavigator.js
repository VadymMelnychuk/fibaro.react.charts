import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse, ListItemIcon } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    logoPlaceholder: {
        height: 70,
    },
    logo: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        height: '90%',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    icon: {
        minWidth: theme.spacing(4),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listItem: {
        marginLeft: theme.spacing(0)
    }
}));

export default props => {
    const classes = useStyles();
    let { data, onSelected } = props;
    //const initialOpens = {};
    const initialOpens = data.reduce((res, d) => { res[d.id] = true; return res; }, {});

    const [open, setOpen] = React.useState(initialOpens);
    const [selected, setSelected] = React.useState(data[0].devices[0].id);

    const handleClick = (id) => {
        let newOpen = { ...open }
        newOpen[id] = !newOpen[id];

        setOpen(newOpen);
    };

    return (

        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.logoPlaceholder}>
                <img src="images/fibaro_logo.png" className={classes.logo} />
            </div>
            <Divider />
            <List>
                {
                    data.map(r =>
                        <React.Fragment key={r.id} >
                            <ListItem key={r.id} button onClick={() => handleClick(r.id)} className={classes.listItem} >
                                <ListItemIcon className={classes.icon}>
                                    <img src={`fibaro/image?path=fibaro/icons/rooms/${r.icon}.png`} width="24px" height="24px" />
                                </ListItemIcon>
                                <ListItemText primary={r.name} />
                                {open[r.id] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open[r.id]} timeout="auto" unmountOnExit>
                                <List component="div" >
                                    {
                                        r.devices.map(d =>
                                            <ListItem
                                                key={d.id}
                                                button
                                                className={`${classes.nested} ${classes.listItem}`}
                                                selected={selected === d.id}
                                                onClick={() => {
                                                    setSelected(d.id);
                                                    onSelected(d.id);
                                                }}>
                                                <ListItemText primary={d.name} />
                                            </ListItem>
                                        )
                                    }
                                </List>
                            </Collapse>
                        </React.Fragment>)
                }
            </List>
        </Drawer>
    )
};