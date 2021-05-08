import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [prods, setProds] = useState([]);
    useEffect(() => {
        axios.get('/products').then(res=> {
            setProds(res);
        }).catch(err=> {
            console.log(err);
        })
    },[])
  return (
      <div>
         {/* {prods.map((p, index) => {
              <p key={index}>{p}</p>
          })}*/prods}
      </div>
  );
}

export default App;
