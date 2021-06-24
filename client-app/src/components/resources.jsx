import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {connect} from "react-redux";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import Api from "../generics-services/api";
import {setAssignments} from '../redux/actions/assignmentsAction'

class Resources extends React.Component{
    constructor(props) {
        super(props);
        this.getAssignmentsDetails = this.getAssignmentsDetails.bind(this);
    }

    getAssignmentsDetails() {
        Api.execute('/classes/assignment/' + this.props.classid, 'get').then((res) => {
            this.props.setAssignments(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    componentWillUnmount() {
        this.props.setAssignments([]);
    }

    componentDidMount() {
        this.getAssignmentsDetails();
    }

    render() {
        return(
            <div>
                {this.props.isTutor &&
                    <div className="flex justify-end mb-3">
                        <Button variant="contained" color="primary">
                            <AddIcon fontSize="small" className="mr-1"/>
                            Add Resource</Button>
                    </div>
                }
                <div className="-my-5 divide-y divide-gray-200">
                    {this.props.assignments && this.props.assignments.map((assignment) => (
                        <div key={assignment._id} className="flex py-5 justify-between items-center">
                            <div className="flex">
                                <div className="mr-4 flex-shrink-0 self-center">
                                    <InsertDriveFileIcon fontSize="large" color="action"/>
                                </div>
                                <div>
                                    <h4 className="text-md leading-5 font-medium text-on-surface truncate ">{assignment.title}</h4>
                                    <p className="mt-1 text-sm leading-5 text-on-surface-60 truncate text-gray-600">
                                        {assignment.description}
                                    </p>
                                </div>
                            </div>
                            {this.props.isTutor &&
                            <div className="flex space-x-3">
                                <div className="text-green-500">
                                    <Button variant="outlined" fontSize="small" color="inherit">View</Button>
                                </div>
                                <div className="text-red-500 inline-block">
                                    <IconButton size="small" color="inherit" className="text-white">
                                        <DeleteIcon style={{color: 'inherit'}}/>
                                    </IconButton>
                                </div>
                            </div>
                            }
                        </div>
                    ))
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    let isTutor = state.profile.isTutor;
    let assignments = state.assignments.assignments;
    return {isTutor, assignments}
}

export default connect(mapStateToProps, {setAssignments})(Resources)
