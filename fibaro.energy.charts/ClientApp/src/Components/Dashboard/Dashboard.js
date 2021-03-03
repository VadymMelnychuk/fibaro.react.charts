import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DashboardHourly from './DashboardHourly';
import DashboardDaily from './DashboardDaily';
import DashboardMonthly from './DashboardMonthly';
import RangeSelector from './RangeSelector';

const useStyles = makeStyles((theme) => ({
    dashboardRoot: {
        height: 500,
        width: '100%',
    },
    selectedDashboard: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    }
  }));

const selectedDashboard = (id, props) => {
    switch (id) {
        case 0:
            return (<DashboardHourly {...props}/>                    )
            break;
    
        case 1:
            return (<DashboardDaily {...props}/>)
            break;

        case 2:
            return (<DashboardMonthly {...props} />)
            break;
    }
}  
export default props => {
    const classes = useStyles();
    const [selectedRange, setSelectedRange] = React.useState(0);

    const handleRangeSelect = (id) => {
        setSelectedRange(id);
    }

    return (
        <div className={classes.dashboardRoot}>
            <RangeSelector selectedId={selectedRange} onSelect={handleRangeSelect}/>
            <div className={classes.selectedDashboard}>
                {selectedDashboard(selectedRange, props)}
            </div>
        </div>
    )
};