import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {connect} from "react-redux";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

class Resources extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="-my-5 divide-y divide-gray-200">
                <div className="flex py-5 justify-between items-center"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          >
                    <div className="flex">
                        <div className="mr-4 flex-shrink-0 self-center">
                            <InsertDriveFileIcon fontSize="large" color="action"/>
                        </div>
                        <div>
                            <h4 className="text-md leading-5 font-medium text-on-surface truncate ">Lorem ipsum</h4>
                            <p className="mt-1 text-sm leading-5 text-on-surface-60 truncate text-gray-600">
                                Repudiandae sint consequuntur vel.
                            </p>
                        </div>
                    </div>
                    {this.props.isTutor &&
                    <div className="flex space-x-3">
                        <div className="text-red-500 inline-block">
                            <IconButton size="small" color="inherit" className="text-white">
                                <DeleteIcon style={{color: 'inherit'}}/>
                            </IconButton>
                        </div>
                    </div>
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    let isTutor = state.profile.isTutor;
    return {isTutor}
}

export default connect(mapStateToProps, {})(Resources)
