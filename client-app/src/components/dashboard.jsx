import React from "react";
import Header from "./layout/header";
import MediaCard from "./layout/card";
import Api from '../generics-services/api'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: []
        }
    }

    getClasses() {
        Api.execute('/classes', 'get').then((res) => {
            this.setState({classes: res.data})
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
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 md:max-w-3xl lg:max-w-6xl mx-auto md:mt-28 xl:mt-10">
                    {this.state.classes.length &&
                    this.state.classes.map((item) => (
                        <MediaCard className="mx-auto" key={item._id} image={item.image} classname={item.name}
                                   classsection={item.section} classdetails={item.details}
                        />
                    ))
                    }
                </div>
            </div>
        )
    }
}
