import React from 'react';
import { KeyboardArrowRight } from '@material-ui/icons';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        padding: theme.spacing.unit * 2,
        height: 60,
        width: '100%',
    },
    space: {
        marginLeft: 'auto'
    }
}));

export default props => {
    const { offset, onOffset } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button 
                variant="outlined"
                startIcon={<KeyboardArrowLeft/>}
                onClick={() => onOffset(offset - 1)}
            >
                Left shift
            </Button>
            <div className={classes.space}/>
            <Button 
                variant="outlined"
                endIcon={<KeyboardArrowRight/>}
                disabled={ offset >= 0 }
                onClick={() => onOffset(offset + 1)}
            >
                Right shift
            </Button>
        </div>

    );
}