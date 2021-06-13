import './App.css';
import {Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import React from 'react'
import Home from "./components/home";
import NotFound from "./components/not-found";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import FAQ from "./components/faq";
import Dashboard from "./components/dashboard";
import {ProtectedRoute} from "./protected-route";
import auth from "./auth";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/not-found" component={NotFound}/>
                <Route exact path="/signin">
                    {auth.isAuthenticated() ? <Redirect to="/dashboard" /> : <SignIn/>}
                </Route>
                <Route exact path="/signup">
                    {auth.isAuthenticated() ? <Redirect to="/dashboard" /> : <SignUp/>}
                </Route>
                <Route path="/faq" component={FAQ}/>

                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="/">
                    {auth.isAuthenticated() ? <Redirect to="/dashboard" /> : <Home/>}
                </Route>

                <Redirect to="/not-found"/>
            </Switch>
        </Router>
    );
}

export default App;
