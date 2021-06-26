import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Header from "./layout/header";
import Announcements from "./announcements";
import { useParams} from "react-router-dom";
import Todos from "./todos";
import Resources from "./resources";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    };
}

export default function ClassDetails(props) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    let {id} = useParams();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div>
            <Header/>
            <div className={"xl:mt-0 top-12 md:max-w-xs lg:max-w-2xl mx-auto max-w-xs"}>
                <AppBar position="fixed" color="inherit" style={{top: "69px"}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        aria-label="action tabs example"
                    >
                        <Tab label="Announcements" {...a11yProps(0)} />
                        <Tab label="Todos" {...a11yProps(1)} />
                        <Tab label="Resources" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <div className="mt-32">
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <Announcements classid={id}/>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <Todos classid={id}/>
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <Resources classid={id}/>
                        </TabPanel>
                    </SwipeableViews>
                </div>

            </div>
        </div>
    );
}
