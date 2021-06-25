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
        this.state = {
            buffer: ''
        }
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

    getResource(classid, assignmentid, mimeType) {
        Api.execute(`/classes/assignment/${classid}/${assignmentid}`, 'get').then((res) => {
            this.setState({buffer: res.data});
            console.log(`data:${mimeType};base64,`)
            //window.open(`data:${mimeType};base64,${this.state.buffer}`, '_blank')
            //this.debugBase64(`data:${mimeType};base64,${this.state.buffer}`)
            //this.debugBase64("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAKkklEQVR4nO3dMW4cRxqGYfWaoZOFADnYRMAm4gGcSKkV2KDCPcFeYQGHS0eG4TPsBTY1YQZySiV7AAqOlDiQAMGJU6E3tERB9WO+YrF6Zp4nE1rT3TND80Vp5nct67qu9wBgR3+ZfQMA7CcBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQORk9g3AUMsy9vy20+GIWYEAEBEQACICAkBEQACICAgAEQEBICIgAESWdfVFdo7X8l37+HpujgQ+xQoEgIiAABAREAAiAgJAREAAiAgIABEBASBiPxAO2tK5H0jvFIgxKw6ZFQgAEQEBICIgAEQEBICIgAAQERAAIgICQMQcCFNdvHg59PzlHMYvxYYghde//9E8Xj2/s8ePuq4/+vWr9N4/+80KBICIgAAQERAAIgICQERAAIgICAARAQEgsqw2LGCiy2K/jndX10Ov/+Vv/+l6/P/+9s/m8bMnp83jl8X5q+d/+vBB8/j1qzfN48+K+6v49XHcrEAAiAgIABEBASAiIABEBASAiIAAEBEQACLmQJiqmgOpVHMS1RxG5aLz/NWcR6/q+X/W+fy/KY779XHcrEAAiAgIABEBASAiIABEBASAiIAAEBEQACIns2+A/VbNcXzdef7q8ZfFnMPr//6refyLv37ePF7NUVRzHr3Pvzp/75xHdX8/d52dQ2cFAkBEQACICAgAEQEBICIgAEQEBICIgAAQMQfCVL1zEr1e//5H8/jXz8/bJ3haHC+MniPpvr79PmiwAgEgIiAARAQEgIiAABAREAAiAgJAREAAiCzr6ovefFq130evcr+PzsdXLq6um8dPHz5oHr9+9aZ5/Gzj+4mU5/frgQYrEAAiAgJAREAAiAgIABEBASAiIABEBASAiDkQmi5evOx6/GfFHESl2o9i9JzKu8FzIr2vT8WcByNZgQAQERAAIgICQERAAIgICAARAQEgIiAARE5m3wD7rZyDKOYozh4/6rp+NSdyr5gTqfbLePa8fX8/PW3PyVSvz9+L61eq+zfnwUhWIABEBASAiIAAEBEQACICAkBEQACICAgAEXMgdPn86vvm8bN//HhHd5Kp9sv4+bw9R/LNvfacRfX4X4vrV8o5GBjICgSAiIAAEBEQACICAkBEQACICAgAEQEBILKsqy+SH7Vfvpt7/a/+PfT0S7EfSGV9fn47N/IJy9O+8/vPl5msQACICAgAEQEBICIgAEQEBICIgAAQERAAIuZA2LTLzjmOXtV+Ict5334g1fkvi+P2A2EmKxAAIgICQERAAIgICAARAQEgIiAARAQEgIg5EIba+hxHpZrzWIs5j0o159HLnAgjWYEAEBEQACICAkBEQACICAgAEQEBICIgAETMgdBn8pxHZfScxWi9cyz2E2EkKxAAIgICQERAAIgICAARAQEgIiAARAQEgIg5EPoUcyDlHELn5Wfvp1Htd1I9v977NyfCTFYgAEQEBICIgAAQERAAIgICQERAAIgICAARcyA0VXMOld45hV6z5xx650Rmm/36sW1WIABEBASAiIAAEBEQACICAkBEQACICAgAkZPZN8BcFy9etv/C1XXfBZ6cNg/37hey9TmFre8n8q73/eWoWYEAEBEQACICAkBEQACICAgAEQEBICIgAETMgdB0+vBB8/j1qzfN471zCveKOYqt76dR6Z5T6dyvpVK9/9Uc0dnjR7d5O2yMFQgAEQEBICIgAEQEBICIgAAQERAAIgICQGRZ18kbJjBU9T393jmPZ8V+H368tq3cD6bQ+/NjTmS/WYEAEBEQACICAkBEQACICAgAEQEBICIgAETMgey52XMeFT9e27YU+4n8dHXddX5zIofNCgSAiIAAEBEQACICAkBEQACICAgAEQEBIHIy+wYYy5wHLdX71zsnUv38sd+sQACICAgAEQEBICIgAEQEBICIgAAQERAAIuZADpw5D3qMnhNhv1mBABAREAAiAgJAREAAiAgIABEBASAiIABEzIFs3MWLl83j5jyYyZzIcbMCASAiIABEBASAiIAAEBEQACICAkBEQACImAOZrJrzOH34oOv85jyYqZrzqH6+qzkSP99zWYEAEBEQACICAkBEQACICAgAEQEBICIgAETMgQxWfY999vV9j56Rzh4/ah6v5qDYNisQACICAkBEQACICAgAEQEBICIgAEQEBIDIshoEACYZPSfl19tYViAARAQEgIiAABAREAAiAgJAREAAiAgIABH7gQDTmNPYb1YgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQOZl9A9ytZVlm38JRW9e1eXzf35/q+XFYrEAAiAgIABEBASDiM5Aj9/btk6Hnv3//auj1t37+6vGV3vPPfjyHzQoEgIiAABAREAAiPgOBO7Tvcx7wPisQACICAkBEQACI+AzkyG19DmDfzz/79YORrEAAiAgIABEBASDiM5AjM3o/ikPf7wL4kxUIABEBASAiIABEltUmxrzn5mcU67fF3//hwz/v+hlIdf7KzevfNPv8s++v0nv/H53Pr5OjYgUCQERAAIgICAARcyBwQGbP+XBcrEAAiAgIABEBASBiDoQPfDSnUf39G3/eeQ5kx/Pv6tjOP/r19+uC91mBABAREAAiAgJAxBwI3CH7pXBIrEAAiAgIABEBASDiMxA2bWtzFsCfrEAAiAgIABEBASAiIABEBASAiIAAEBEQACLmQGgaPQfh/Id9fg6bFQgAEQEBICIgAETsiQ5AxAoEgIiAABAREAAiAgJAREAAiAgIABEBASDi/4XVaVn2+/8mVI0BjX5+s6/PWL1jZrN//mizAgEgIiAARAQEgIjPQG7Z27dPhp7//v2rrutXj6/0Pr/R1x/9+mz9/d36+Xtt/f6OjRUIABEBASAiIABEfAZy5MxZMJKfr8NmBQJAREAAiAgIABGfgdyxrX8PffQcyb6bPYdTmX3+2XM63C0rEAAiAgJAREAAiPgMZOMOfb+Mrd//6Nf/0N9fDpsVCAARAQEgIiAARJbVpsBdbv4b9fpt5/l++PDPu/4beXX9m+e/afTjK6PPv+v1R7/+t33+yuz3r7K195c2KxAAIgICQERAAIgICAARAQEgIiAARAQEgIg5kE4ffU+/+vs7nn/nOYFbvv5H99P5+NHXr86/6+NHv/779v7e9ut722779afNCgSAiIAAEBEQACL2A5ls9r/Bzt6PYvb1gZwVCAARAQEgIiAARHwGwk565wAYa/YcRq/Zc0bsxgoEgIiAABAREAAiPgOhyZwG+2z2nNWhswIBICIgAEQEBICIz0Bu2exPBA79+r3n3/r97fv5Zz+eu2UFAkBEQACICAgAEXuiAxCxAgEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgMj/ARYVSURm9DRHAAAAAElFTkSuQmCC");

        }).catch((err) => {
            console.log(err);
        })
    }

    debugBase64(base64URL){
        var win = window.open();
        win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
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
                                    <Button variant="outlined" fontSize="small" color="inherit" onClick={() => {this.getResource(this.props.classid, assignment._id, assignment.mimetype)}}>View</Button>
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
