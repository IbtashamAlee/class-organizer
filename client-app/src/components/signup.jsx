import React from 'react';
import {Link} from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            email: '',
            username: '',
            password: '',
            error_text: ''
        }
    }
    login(event) {
        event.preventDefault();
        if (this.state.email === '' || this.state.password === '' || this.state.username === '') {
            this.setState({error_text: 'This field is required'});
        } else this.setState({error_text: ''});
        // TODO uncomment this after adding dashboard
        // this.props.history.push('/dashboard')
    }
    render() {
        return (
            <div>
                <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
                                <img className="mx-auto h-12 w-auto"
                                     src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                                <h2 className="mt-6 text-center text-xl font-normal text-gray-900">
                                    Sign up to your account
                                </h2>
                                <p className="mt-2 text-center text-sm text-gray-600 max-w">
                                    or &nbsp;
                                    <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Login with existing account
                                    </Link>
                                </p>
                            </div>
                            <form className="space-y-6" action="/">
                                <TextField
                                    value={this.state.email}
                                    onChange={event => this.setState({email: event.target.value})}
                                    className="block w-full"
                                    id="email"
                                    label="Email"
                                    type="email"
                                    autoComplete="current-email"
                                    variant="outlined"

                                    error={this.state.email === '' && this.state.error_text !== ''}
                                    helperText={this.state.email === '' && this.state.error_text !== "" ? this.state.error_text : ''}
                                />
                                <TextField
                                    value={this.state.username}
                                    onChange={event => this.setState({username: event.target.value})}
                                    className="block w-full"
                                    id="username"
                                    label="Username"
                                    type="username"
                                    autoComplete="current-username"
                                    variant="outlined"

                                    error={this.state.username === '' && this.state.error_text !== ''}
                                    helperText={this.state.username === '' && this.state.error_text !== "" ? this.state.error_text : ''}
                                />
                                <div>
                                    <TextField
                                        value={this.state.password}
                                        onChange={event => this.setState({password: event.target.value})}
                                        className="block w-full"
                                        id="password"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        variant="outlined"
                                        error={this.state.password === '' && this.state.error_text !== ''}
                                        helperText={this.state.password === '' && this.state.error_text !== "" ? this.state.error_text : ''}
                                    />
                                </div>

                                <div>
                                    <Button onClick={this.login} variant="contained" color="primary" type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Sign up
                                    </Button>
                                </div>
                            </form>

                            <div className="mt-6 hidden">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                      or continue with
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;
