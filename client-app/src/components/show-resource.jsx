import React, {useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import Api from "../generics-services/api";

export default function ShowResource(props) {
    let {classid, assignmentid} = useParams();
    const {buffer, setBuffer} = useState([]);
    console.log(classid, assignmentid);
    function getResource() {
        Api.execute(`/classes/assignment/${classid}/${assignmentid}`, 'get').then((res) => {
            setBuffer(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getResource();
    })

    return (
        <div>{buffer}
        </div>
    )
}
