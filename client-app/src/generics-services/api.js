import axios from "axios";
import qs from "qs";
import auth from "../auth";

const authAxios = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
})

class Api {
    execute(url,method, data={}) {
        return new Promise(function (resolve, reject) {
            authAxios({
                method: method,
                url: url,
                data: qs.stringify(data),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((res) =>{
                resolve(res);
            }).catch((err) =>{
                if (err.response.status === 401) {
                    auth.logout();
                }
                reject(err);
            })
        })
    }

    get(url) {
        return new Promise((resolve, reject )=> {
            axios.get(url).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        })
    }
}

export default new Api();
