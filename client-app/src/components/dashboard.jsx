import React from 'react'
import {Button} from "@material-ui/core";
import {useHistory} from 'react-router-dom'

const Dashboard = ()=> {
    let history = useHistory();

    function logout() {
        localStorage.clear();
        history.push('/dashboard');
    }

    return(
        <div>
            You are logged In. <br/>
            Dashboard empty!

            <div>
                <Button variant="contained" color="primary" onClick={logout}>Logout</Button>
            </div>
        </div>
    )
}
export default Dashboard;
