import React from 'react';
import {Link} from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "axios";
import qs from 'querystring'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            email: '',
            password: '',
            error_text: ''
        }
    }

    changeRoute = () => {
        this.props.history.push('/');
    }

    login(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/users/signin',
            data: qs.stringify({
                email: this.state.email,
                password: this.state.password
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((res) => {
            if(res.status === 200) {
                localStorage.setItem('access_token', res.data.access_token);
                this.props.history.push('/dashboard');
            } else {
                console.log(res);
            }
        }).catch((err) => {
            this.setState({error_text: "The password is invalid or the user does not exists!"})
        })
    }
    render() {
        return (
            <div>
                <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
                                <div onClick={this.changeRoute} className="cursor-pointer">
                                    <svg className="mx-auto h-30 w-auto" xmlns="http://www.w3.org/2000/svg" width={74} height={74} data-name="Layer 1" viewBox="0 0 64 64"><circle cx="23" cy="26" r="4" fill="#3b3c3d"/><path fill="#3b3c3d" d="M37,42a1,1,0,0,1-1-1V34.8027A2.8059,2.8059,0,0,0,33.1973,32H30.8027A2.8059,2.8059,0,0,0,28,34.8027V41a1,1,0,0,1-1,1H18a1,1,0,0,1-1-1V36.8027A4.8079,4.8079,0,0,1,21.8027,32H23a1,1,0,0,1,0,2H21.8027A2.8059,2.8059,0,0,0,19,36.8027V40h7V34.8027A4.8079,4.8079,0,0,1,30.8027,30h2.3946A4.8079,4.8079,0,0,1,38,34.8027V41A1,1,0,0,1,37,42Z"/><path fill="#3b3c3d" d="M46 42H31a1 1 0 0 1 0-2H45V36.8027A2.8059 2.8059 0 0 0 42.1973 34H41a1 1 0 0 1 0-2h1.1973A4.8079 4.8079 0 0 1 47 36.8027V41A1 1 0 0 1 46 42zM48 49H43a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2z"/><path fill="#3b3c3d" d="M54,8H10a2.0059,2.0059,0,0,0-2,2V54a2.0059,2.0059,0,0,0,2,2H54a2.0059,2.0059,0,0,0,2-2V10A2.0059,2.0059,0,0,0,54,8ZM51,51H13V13H51Z"/><path fill="#3b3c3d" d="M37,42a1,1,0,0,1-1-1V34.8027A2.8059,2.8059,0,0,0,33.1973,32H30.8027A2.8059,2.8059,0,0,0,28,34.8027V41a1,1,0,0,1-1,1H18a1,1,0,0,1-1-1V36.8027A4.8079,4.8079,0,0,1,21.8027,32H23a1,1,0,0,1,0,2H21.8027A2.8059,2.8059,0,0,0,19,36.8027V40h7V34.8027A4.8079,4.8079,0,0,1,30.8027,30h2.3946A4.8079,4.8079,0,0,1,38,34.8027V41A1,1,0,0,1,37,42Z"/><path fill="#3b3c3d" d="M46,42H31a1,1,0,0,1,0-2H45V36.8027A2.8059,2.8059,0,0,0,42.1973,34H41a1,1,0,0,1,0-2h1.1973A4.8079,4.8079,0,0,1,47,36.8027V41A1,1,0,0,1,46,42Z"/><circle cx="32" cy="24" r="4" fill="#3b3c3d"/><circle cx="41" cy="26" r="4" fill="#3b3c3d"/><path fill="#3b3c3d" d="M48,49H43a1,1,0,0,1,0-2h5a1,1,0,0,1,0,2Z"/></svg>
                                </div>
                                <h2 className="mt-6 text-center text-xl font-normal text-gray-900">
                                    Sign in to your account
                                </h2>
                                <p className="mt-2 text-center text-sm text-gray-600 max-w">
                                    or &nbsp;
                                    <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Create new account
                                    </Link>
                                </p>
                            </div>
                            <ValidatorForm
                                onSubmit={this.login}
                                onError={errors => console.log(errors)}
                                className="space-y-6" action="/">
                                <TextValidator
                                    className="block w-full"
                                    id="email"
                                    label="Email"
                                    onChange={event => this.setState({email: event.target.value})}
                                    name="email"
                                    autoComplete="current-email"
                                    variant="outlined"
                                    value={this.state.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['This field is required', 'Email is not valid']}
                                />
                                <TextValidator
                                    value={this.state.password}
                                    onChange={event => this.setState({password: event.target.value})}
                                    className="block w-full"
                                    id="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />
                                <div>
                                    <div className="text-sm">
                                        <Link to="/forgotpassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <p className="text-red-500 mt-2 text-sm">{this.state.error_text}</p>
                                </div>

                                <div>
                                    <Button variant="contained" color="primary" type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Sign in
                                    </Button>
                                </div>
                            </ValidatorForm>

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

export default SignIn;
