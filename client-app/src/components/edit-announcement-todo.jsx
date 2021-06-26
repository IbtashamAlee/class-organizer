import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import IconButton from "@material-ui/core/IconButton";
import Api from "../generics-services/api";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useDispatch} from "react-redux";
import {setAnnouncements} from "../redux/actions/announcementsAction";
import {setTodos} from "../redux/actions/todosAction";

export default function EditDetail(props) {
    const [open, setOpen] = React.useState(false);
    const [newDetail, setNewDetail] = React.useState(props.info);
    let dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setNewDetail('');
        setOpen(false);
    };

    function updateDetail() {
        let detail;
        if (props.type === 'announcement') {
            detail = {
                class_id: props.classId,
                announcement_id: props.id,
                announcement: newDetail
            }
        } else {
            detail = {
                class_id: props.classId,
                todo_id: props.id,
                todo: newDetail
            }
        }
        Api.execute('/classes/' + props.type, 'put', detail).then((res) => {
            handleClose();
            console.log('Hi')
            getAnnouncementsOrTodos();
        }).catch((err) => {
            console.log(err);
        })
    }

    function getAnnouncementsOrTodos() {
        Api.execute('/classes/' + props.type + 's/' + props.classId, 'get').then((res) => {
            if (props.type === 'announcement') {
                dispatch(setAnnouncements(res.data));
            } else {
                dispatch(setTodos(res.data));
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <IconButton size="small" color="inherit" className="text-white" onClick={handleClickOpen}>
                <EditOutlinedIcon style={{color: 'inherit'}}/>
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={'xs'}>
                <DialogTitle id="form-dialog-title">Update {" " + props.type}</DialogTitle>
                <DialogContent>
                    <ValidatorForm onSubmit={updateDetail}>
                        <TextValidator
                            id={props.type}
                            label={props.type}
                            onChange={(e) => setNewDetail(e.target.value)}
                            value={newDetail}
                            type='text'
                            fullWidth
                        />
                    </ValidatorForm>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={updateDetail} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
