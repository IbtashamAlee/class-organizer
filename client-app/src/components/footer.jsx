import React, {useEffect, useState} from "react";
import axios from "axios";

function Footer() {
    const [prods, setProds] = useState([]);
    useEffect(() => {
        axios.get('/products').then(res=> {
            setProds(res.data);
            console.log(res)
        }).catch(err=> {
            console.log(err);
        })
    },[])
    return (
        <div>
            <ul className="bg-gray-600">
                {prods.map((prod, index)=> <li key={index}>{prod}</li>)}
            </ul>
        </div>
    );
}

export default Footer;
