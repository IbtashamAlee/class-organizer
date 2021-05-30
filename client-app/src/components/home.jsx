import React from 'react'
import {Link} from "react-router-dom";

const Home = ()=> {
    return(
        <div>
            <Link to="/signin">This is home <br/> <br/> Go to Sign in page</Link>
        </div>
    )
}
export default Home;
