import React from "react";
import Announcement from '@material-ui/icons/Announcement';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import Api from '../generics-services/api';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import IconButton from "@material-ui/core/IconButton";
import EditDetail from "./edit-announcement-todo";
import {connect} from "react-redux";
import {setAnnouncements} from "../redux/actions/announcementsAction";

class Announcements extends React.Component {
    constructor(props) {
        super(props);
        this.getAnnouncements = this.getAnnouncements.bind(this);
        this.deleteAnnouncement = this.deleteAnnouncement.bind(this);
        this.postAnnouncement = this.postAnnouncement.bind(this);

        this.state = {
            announcements: '',
            addAnnouncement: '',
        }
    }

    componentWillUnmount() {
        this.props.setAnnouncements([]);
    }

    componentDidMount() {
        setTimeout(() => {
            this.getAnnouncements();
        },300)
    }

    getAnnouncements() {
        Api.execute('/classes/announcements/' + this.props.classid, 'get').then((res) => {
            this.props.setAnnouncements(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    postAnnouncement(e) {
        e.preventDefault();
        Api.execute('/classes/announcement', 'post', {
            class_id: this.props.classid,
            announcement: this.state.addAnnouncement
        }).then((res) => {
            this.setState({addAnnouncement: ''});
            this.getAnnouncements();
        }).catch((err) => {
            console.log(err);
        })
    }

    deleteAnnouncement(e) {
        Api.execute('/classes/announcement', 'delete', {
            class_id: this.props.classid,
            announcement_id: e.currentTarget.value
        }).then(() => {
            this.getAnnouncements()
        }).catch((err) => {
            console.log(err);
        })
    }

    render () {
        return(
            <div>
                {this.props.isTutor &&
                <ValidatorForm
                    onSubmit={this.postAnnouncement}
                    onError={errors => console.log(errors)}
                    className="flex justify-center items-center w-full mb-5"
                >
                    <div className="block w-full">
                        <TextValidator
                            className="block w-full"
                            id="email"
                            label="Add Announcement"
                            onChange={event => this.setState({addAnnouncement: event.target.value})}
                            name="Add-announcement"
                            variant="outlined"
                            value={this.state.addAnnouncement}
                            validators={['required']}
                            errorMessages={['This field is required']}
                        />
                    </div>
                    <div className="ml-3">
                        <Button variant="contained" color="primary" type="submit" size="medium"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Post
                        </Button>
                    </div>
                </ValidatorForm>
                }
                <div className="flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                        {this.props.announcements &&
                            this.props.announcements.map((item) => (
                                <li className="py-5" key={item.id}>
                                    <div className="relative flex justify-between items-center focus-within:ring-2 focus-within:ring-indigo-500">
                                        <div className="flex items-center justify-center">
                                            <Announcement color="action" fontSize="large" className="mr-4 p-1 mt-1"/>
                                            <p className=" text-base text-gray-600 line-clamp-2">
                                                {item.announcement}
                                            </p>
                                        </div>
                                        {this.props.isTutor &&
                                            <div className="flex space-x-3">
                                                <div className="text-green-500 inline-block">
                                                    <EditDetail type="announcement" id={item.id} classId={this.props.classid}/>
                                                </div>
                                                <div className="text-red-500 inline-block">
                                                    <IconButton size="small" color="inherit" className="text-white" value={item.id} onClick={this.deleteAnnouncement}>
                                                        <DeleteIcon style={{color: 'inherit'}}/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </li>
                            ))
                        }

                    </ul>
                </div>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    let announcements = state.announcements.announcements;
    let isTutor = state.profile.isTutor;
    return {announcements, isTutor}
}

export default connect(mapStateToProps, { setAnnouncements })(Announcements)
