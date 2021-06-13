import React from "react";
import Header from "./layout/header";
import MediaCard from "./layout/card";
import Api from '../generics-services/api'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    getClasses() {
        Api.execute('/classes', 'get').then((res) => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.getClasses();
    }

    render() {
        return(
            <div>
                <Header/>
                <MediaCard image="https://www.gstatic.com/classroom/themes/img_code.jpg"
                           classname="Digital Image Processing" classdetails="FA18-BCS-B"
                />
            </div>
        )
    }
}
