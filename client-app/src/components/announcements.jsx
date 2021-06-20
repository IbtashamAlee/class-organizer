import React from "react";
import Announcement from '@material-ui/icons/Announcement';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import Api from '../generics-services/api';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export default class Announcements extends React.Component {
    constructor(props) {
        super(props);
        this.updateAnnouncement = this.updateAnnouncement.bind(this);
        this.getAnnouncements = this.getAnnouncements.bind(this);
        this.deleteAnnouncement = this.deleteAnnouncement.bind(this);
        this.postAnnouncement = this.postAnnouncement.bind(this);

        this.state = {
            announcements: '',
            updateAnnouncement: '',
            addAnnouncement: '',
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.getAnnouncements();
        },300)
    }

    getAnnouncements() {
        Api.execute('/classes/announcement/' + this.props.classid, 'get').then((res) => {
            this.setState({announcements: res.data})
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

    updateAnnouncement(e) {
        e.preventDefault();
        Api.execute('/classes/announcement', 'put', {
            class_id: this.props.classid,
            announcement_id: e.currentTarget.value,
            announcement: this.state.updateAnnouncement
        }).then((res) => {
            this.getAnnouncements();
        }).catch((err) => {
            console.log(err);
        })
    }

    render () {
        return(
            <div>
                <ValidatorForm
                    onSubmit={this.postAnnouncement}
                    onError={errors => console.log(errors)}
                    className="flex justify-center items-center w-full"
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
                <div className="flow-root mt-6">
                    <ul className="-my-5 divide-y divide-gray-200">
                        {this.state.announcements &&
                            this.state.announcements.map((item) => (
                                <li className="py-5" key={item.id}>
                                    <div className="relative flex justify-between items-center focus-within:ring-2 focus-within:ring-indigo-500">
                                        <div className="flex items-center">
                                            <Announcement color="action" fontSize="large" className="mr-4"/>
                                            <p className=" text-base text-gray-600 line-clamp-2">
                                                {item.announcement}
                                            </p>
                                        </div>
                                        <div className="flex">
                                            <div className="text-green-500 inline-block">
                                                <Button size="small" color="inherit" className="text-white" value={item.id} onClick={this.updateAnnouncement}>
                                                    <EditOutlinedIcon style={{color: 'inherit'}}/>
                                                </Button>
                                            </div>
                                            <div className="text-red-500 inline-block">
                                                <Button size="small" color="inherit" className="text-white" value={item.id} onClick={this.deleteAnnouncement}>
                                                    <DeleteIcon style={{color: 'inherit'}}/>
                                                </Button>
                                            </div>
                                        </div>
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
