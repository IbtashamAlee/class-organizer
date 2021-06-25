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
import Profile from "./components/profile";
import ShowResource from "./components/show-resource";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/not-found" component={NotFound}/>
                <Route path="/faq" component={FAQ}/>

                <EnrouteToDashboard path="/signin" component={SignIn} />
                <EnrouteToDashboard path="/signup" component={SignUp} />

                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <ProtectedRoute exact path="/class-details/:id" component={ClassDetails} />
                <ProtectedRoute exact path="/profile" component={Profile}/>
                <Route path="/:classid/:assignmentid" component={ShowResource}/>
                <EnrouteToDashboard path="/" component={Home} />

                <Redirect to="/not-found"/>
            </Switch>
        </Router>
    );
}

export default App;
