import axios from "axios";

class Api {
    get = (url) => {
        return new Promise( (resolve, reject) =>  {
            axios.get(url).then(res => {
                console.log(res);
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default new Api();
