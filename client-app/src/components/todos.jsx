import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import Api from '../generics-services/api';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import IconButton from "@material-ui/core/IconButton";
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import EditDetail from "./edit-announcement-todo";

export default class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.gettodos = this.gettodos.bind(this);
        this.deletetodo = this.deletetodo.bind(this);
        this.posttodo = this.posttodo.bind(this);

        this.state = {
            todos: '',
            updatetodo: '',
            addtodo: '',
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.gettodos();
        },300)
    }

    gettodos() {
        Api.execute('/classes/todos/' + this.props.classid, 'get').then((res) => {
            this.setState({todos: res.data})
        }).catch((err) => {
            console.log(err);
        })
    }

    posttodo(e) {
        e.preventDefault();
        Api.execute('/classes/todo', 'post', {
            class_id: this.props.classid,
            todo: this.state.addtodo
        }).then((res) => {
            this.setState({addtodo: ''});
            this.gettodos();
        }).catch((err) => {
            console.log(err);
        })
    }

    deletetodo(e) {
        Api.execute('/classes/todo', 'delete', {
            class_id: this.props.classid,
            todo_id: e.currentTarget.value
        }).then(() => {
            this.gettodos()
        }).catch((err) => {
            console.log(err);
        })
    }

    render () {
        return(
            <div>
                <ValidatorForm
                    onSubmit={this.posttodo}
                    onError={errors => console.log(errors)}
                    className="flex justify-center items-center w-full"
                >
                    <div className="block w-full">
                        <TextValidator
                            className="block w-full"
                            id="todo"
                            label="Add Todo"
                            onChange={event => this.setState({addtodo: event.target.value})}
                            name="Add-todo"
                            variant="outlined"
                            value={this.state.addtodo}
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
                        {this.state.todos &&
                        this.state.todos.map((item) => (
                            <li className="py-5" key={item.id}>
                                <div className="relative flex justify-between items-center focus-within:ring-2 focus-within:ring-indigo-500">
                                    <div className="flex items-center">
                                        <LabelImportantIcon color="action" fontSize="large" className="mr-4 mr-4 p-1 mt-1"/>
                                        <p className=" text-base text-gray-600 line-clamp-2">
                                            {item.todo}
                                        </p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <div className="text-green-500 inline-block">
                                            <EditDetail type="todo" id={item.id} classId={this.props.classid}/>
                                        </div>
                                        <div className="text-red-500 inline-block">
                                            <IconButton size="small" color="inherit" className="text-white" value={item.id} onClick={this.deletetodo}>
                                                <DeleteIcon style={{color: 'inherit'}}/>
                                            </IconButton>
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
