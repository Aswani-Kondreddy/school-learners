import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import './learner-details.css';
import Chart from './chart';

const LearnerDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);


    useEffect(() => {
        fetch(`/learner/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result)
                console.log(data);
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (

        <>
            {
                data ?
                    <div className="main">

                        <h4>{data.name}</h4>
                        <p>Email:  <span>{data.email}</span></p>
                        <p>PhoneNo:  <span>{data.phoneNo}</span></p>
                        <p>Github:  <a href={data.github} target="_blank" >{data.github}</a></p>
                        <p>Linkedin:  <a href={data.linkedin} target="_blank">{data.linkedin}</a></p>
                        <p>FaceBook:  <a href={data.facebook} target="_blank" >{data.facebook}</a></p>
                        <Chart juneAttendance={data.juneAttendance}
                            julyAttendance={data.julyAttendance}
                            augustAttendance={data.augustAttendance} />
                    </div>
                    : <h2>Loading..</h2>
            }
        </>
    );
}

export default LearnerDetails;