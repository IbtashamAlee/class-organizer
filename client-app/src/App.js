import './App.css';
import {Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import React from 'react'
import Home from "./components/home";
import Footer from "./components/footer";
import NotFound from "./components/not-found";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import FAQ from "./components/faq";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/footer" component={Footer}/>
                <Route path="/not-found" component={NotFound}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/faq" component={FAQ}/>
                <Route path="/" exact component={Home}/>

                <Redirect to="/not-found"/>
            </Switch>
        </Router>
    );
}

export default App;
