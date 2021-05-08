import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {
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
          <ul>
          { prods.map((prod, index)=> <li key={index}>{prod}</li>)}
          </ul>
      </div>
  );
}

export default App;
