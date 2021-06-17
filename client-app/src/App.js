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
import {EnrouteToDashboard} from "./redirect-to-dashboard";
import ClassDetails from "./components/class-details";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/not-found" component={NotFound}/>
                <Route path="/faq" component={FAQ}/>

                <EnrouteToDashboard path="/signin" component={SignIn} />
                <EnrouteToDashboard path="/signin" component={SignUp} />

                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <ProtectedRoute exact path="/class-details" component={ClassDetails} />

                <EnrouteToDashboard path="/" component={Home} />

                <Redirect to="/not-found"/>
            </Switch>
        </Router>
    );
}

export default App;
