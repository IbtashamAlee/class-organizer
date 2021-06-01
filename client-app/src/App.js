import './App.css';
import {Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import React from 'react'
import Home from "./components/home";
import Footer from "./components/footer";
import NotFound from "./components/not-found";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import FAQ from "./components/faq";
import Dashboard from "./components/dashboard";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/not-found" component={NotFound}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/faq" component={FAQ}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/" exact component={Home}/>

                <Redirect to="/not-found"/>
            </Switch>
        </Router>
    );
}

export default App;
