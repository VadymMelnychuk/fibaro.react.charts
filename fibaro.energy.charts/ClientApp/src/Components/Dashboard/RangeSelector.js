import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const EnergyRanges = [
    {
        id: 0,
        lable: "Hourly"
    },
    {
        id: 1,
        lable: "Daily"
    },
    {
        id: 2,
        lable: "Monthly"
    },

]

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit * 2,
        height: 60,
        width: '100%',
    },
    chip: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        width: 150
    },
}));

export default props => {
    const { selectedId, onSelect } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {EnergyRanges.map(item =>
                <Chip
                    key={item.lable}
                    label={item.lable}
                    color='primary'
                    onClick={() => onSelect(item.id)}
                    clickable
                    className={classes.chip}
                    variant={selectedId === item.id ? 'default' : 'outlined'}
                />
            )}
        </div>

    );
}