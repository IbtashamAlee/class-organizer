import axios from "axios";
import qs from "qs";

class Api {
    execute(url,method, data={}) {
        return new Promise(function (resolve, reject) {
            axios({
                method: method,
                url: url,
                data: qs.stringify(data),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((res) =>{
                resolve(res);
            }).catch((err) =>{
                reject(err);
            })
        })
    }
}

export default new Api();
