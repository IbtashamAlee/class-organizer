import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Api from "../../generics-services/api";
import { useDispatch } from "react-redux";
import { setClasses } from '../../redux/actions/classesActions'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function MediaCard(props) {
    const classes = useStyles();
    let class_id = props.classId;
    let dispatch = useDispatch();

    function getClasses() {
        Api.execute('/classes', 'get').then((res) => {
            dispatch(setClasses(res.data));
        }).catch(err => {
            console.log(err);
        })
    }

    function deleteClass() {
        Api.execute('/classes', 'delete', {class_id: props.classId}).then((res) => {
            getClasses();
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <Card className={classes.root} variant="outlined">
            <Link to={
                {
                    pathname: `/class-details/${class_id}`,
                    state: class_id
                }
            }>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.image}
                        title={props.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.classname}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {props.classsection}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.classdetails}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions className="flex justify-between">
                <Button size="small" color="primary">
                    Open
                </Button>
                <div className="text-red-500">
                    <IconButton size="small" color="inherit" onClick={deleteClass}>
                        <DeleteOutlineIcon/>
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    );
}
