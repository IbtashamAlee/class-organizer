import React from 'react'
import {Link} from "react-router-dom";

const Home = ()=> {
    return(
        <div>
            <Link to="/footer">This is home <br/> Go to Footer</Link>
        </div>
    )
}
export default Home;
