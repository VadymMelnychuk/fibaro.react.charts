import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default props => {
    const classes = useStyles();
    let { data } = props;
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
        <List>
            {
                data.map(r =>
                    <React.Fragment key={r.id} >
                        <ListItem key={r.id} button onClick={() => handleClick(r.id)}>
                            <ListItemText primary={r.name} />
                            {open[r.id] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open[r.id]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    r.devices.map(d =>
                                        <ListItem 
                                            key={d.id} 
                                            button 
                                            className={classes.nested} 
                                            selected={selected===d.id} 
                                            onClick={() => setSelected(d.id)}>
                                            <ListItemText primary={d.name} />
                                        </ListItem>
                                    )
                                }
                            </List>
                        </Collapse>
                    </React.Fragment>)
            }
        </List>
    )
};