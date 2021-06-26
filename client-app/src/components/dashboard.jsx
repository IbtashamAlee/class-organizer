import React from "react";
import Header from "./layout/header";
import Card from "./layout/card";
import Api from '../generics-services/api'
import { setClasses } from '../redux/actions/classesActions'
import { setProfile } from '../redux/actions/profileActions'
import { connect } from 'react-redux'


class Dashboard extends React.Component {

    getClasses() {
        Api.execute('/classes', 'get').then((res) => {
            this.setState({classes: res.data})
            this.props.setClasses(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    getUserProfile() {
        Api.execute('/users/me/profile', 'get').then((res) => {
            this.props.setProfile(res.data);
            this.props.history.push('/dashboard');
        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.getClasses();
        this.getUserProfile();
    }

    componentWillUnmount() {
        this.props.setClasses([]);
    }

    render() {
        return(
            <div className="mb-10">
                <Header/>
                <div className="text-gray-900 text-2xl font-medium mb-3 mt-24 xl:mt-10 md:max-w-3xl lg:max-w-6xl mx-auto max-w-xs">
                    <p>All Classes</p>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 md:max-w-3xl lg:max-w-6xl mx-auto max-w-xs md:mt-8 xl:mt-10">
                    {this.props.classes.length ?
                    this.props.classes.map((item) => (
                        <Card classId={item._id} className="mx-auto" key={item._id} image={item.image} classname={item.name}
                                   classsection={item.section} classdetails={item.details}
                        />
                    )) : <div>No Classes Found</div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let classes = state.user.classes
    return {classes};
}

export default connect(mapStateToProps, { setClasses, setProfile })(Dashboard)
