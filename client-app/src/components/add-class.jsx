import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Api from '../generics-services/api'
import {setClasses} from "../redux/actions/classesActions";
import {useDispatch, useSelector} from "react-redux";

export default function AddClassDialog() {
    const [open, setOpen] = React.useState(false);
    const [className, setClassName] = useState('');
    const [classCode, setClassCode] = useState('');
    const [detail, setDetail] = useState('');
    const [section, setSection] = useState('');
    let isTutor = useSelector((state => state.profile.isTutor));

    let dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function getClasses() {
        Api.execute('/classes', 'get').then((res) => {
            dispatch(setClasses(res.data));
        }).catch(err => {
            console.log(err);
        })
    }

    function addClass() {
        Api.execute('/classes', 'post', {
            name: className,
            section: section,
            details: detail
        }).then(() => {
            setClassName('');
            setSection('');
            setDetail('');
            handleClose();
            getClasses();
        }).catch((err) => {
            console.log(err);
        })
    }

    function addToClass() {
        Api.execute('/users/classes', 'post', {
            class_id: classCode
        }).then(() => {
            setClassCode('');
            handleClose();
            getClasses();
        }).catch((err) => {
            console.log(err);
        })
    }



    return (
        <div>
            <Button className="text-gray-600" color="inherit" title="Add class" onClick={handleClickOpen}>
                <AddOutlinedIcon/>
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                    maxWidth={'xs'}
                    fullWidth={true}
            >
                <DialogTitle id="form-dialog-title">{isTutor? <>Add Class</>: <>Add to Class</>}</DialogTitle>
                {isTutor ?
                    <DialogContent>
                        <DialogContentText>
                            Fill the detail and to add the class
                        </DialogContentText>
                        <ValidatorForm onSubmit={addClass} className="space-y-2">
                            <TextValidator
                                id="classname"
                                label="Class name"
                                value={className}
                                onChange={e => setClassName(e.target.value)}
                                fullWidth
                                validators={['required']}
                                errorMessages={['This field is required']}
                            />
                            <TextValidator
                                id="section"
                                label="Section"
                                fullWidth
                                value={section}
                                onChange={e => setSection(e.target.value)}
                                validators={['required']}
                                errorMessages={['This field is required']}
                            />
                            <TextValidator
                                id="details"
                                label="details"
                                fullWidth
                                value={detail}
                                onChange={e => setDetail(e.target.value)}
                            />
                        </ValidatorForm>
                    </DialogContent>:
                    <DialogContent>
                        <DialogContentText>
                            Fill the detail and to add the class
                        </DialogContentText>
                        <ValidatorForm onSubmit={addClass} className="space-y-2">
                            <TextValidator
                                id="classname"
                                label="Class Code"
                                value={classCode}
                                onChange={e => setClassCode(e.target.value)}
                                fullWidth
                                validators={['required']}
                                errorMessages={['This field is required']}
                            />
                        </ValidatorForm>
                    </DialogContent>
                }
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={isTutor ? addClass : addToClass} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
