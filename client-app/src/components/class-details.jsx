import React, {useEffect} from 'react';
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
import Api from '../generics-services/api';
import {useLocation} from "react-router-dom";

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
    const [classDetail, setClassDetail] = React.useState({});
    let location = useLocation();
    let class_id = location.state;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    useEffect(() => {
        Api.execute('/classes/' + class_id, 'get', ).then((res) => {
            setClassDetail(res.data);
        }).catch((err) => {
            console.log(err);
        })
    },[class_id])

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
                        <Tab label="Assignments" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <div className="mt-32">
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <Announcements classid={classDetail._id}/>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            Item Three
                        </TabPanel>
                    </SwipeableViews>
                </div>

            </div>
        </div>
    );
}
