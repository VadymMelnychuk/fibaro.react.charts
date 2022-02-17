import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DashboardHourly from './DashboardHourly';
import DashboardDaily from './DashboardDaily';
import DashboardMonthly from './DashboardMonthly';
import RangeSelector from './RangeSelector';
import OffsetSelector from './OffsetSelector';

const useStyles = makeStyles((theme) => ({
    dashboardRoot: {
        height: 540,
        width: '100%',
    },
    selectedDashboard: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    }
  }));

const selectedDashboard = (id, rangeOffset, props) => {
    switch (id) {
        case 0:
            return (<DashboardHourly offset={rangeOffset} {...props}/>)
            break;
    
        case 1:
            return (<DashboardDaily offset={rangeOffset} {...props}/>)
            break;

        case 2:
            return (<DashboardMonthly offset={rangeOffset} {...props} />)
            break;
    }
}  

export default props => {
    const classes = useStyles();
    let saveRange = window.localStorage.getItem('range');
    saveRange = isNaN(saveRange) ? 0 :Number.parseInt(saveRange);    
    const [selectedRange, setSelectedRange] = React.useState(saveRange);
    const [rangeOffset, setRangeOffset] = React.useState(0);

    const handleRangeSelect = (id) => {
        window.localStorage.setItem('range', id);
        setSelectedRange(id);
    }

    const handleOffsetSelect = (newOffset) =>{
        setRangeOffset(newOffset);
    }

    return (
        <div className={classes.dashboardRoot}>
            <RangeSelector selectedId={selectedRange} onSelect={handleRangeSelect}/>
            <div className={classes.selectedDashboard}>
                {selectedDashboard(selectedRange, rangeOffset, props)}
            </div>
            <OffsetSelector offset={rangeOffset} onOffset={handleOffsetSelect}/>
        </div>
    )
};