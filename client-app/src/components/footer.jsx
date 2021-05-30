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
    },[]);
    let itemsToRender;

    if (prods) {
        console.log(prods)
        itemsToRender = prods.map(item => {
            return <div key={item}>{item}</div>;
        });
    } else {
        itemsToRender = "Loading...";
    }

    return <div>{itemsToRender}</div>
}

export default Footer;
