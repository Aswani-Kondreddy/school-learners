import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './learners-list.css';
import { useSelector } from "react-redux";


const LearnersList = () => {
  const [data, setData] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    fetch("/learner/all-learners", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.learners);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (

    <>
      {
        data ?
          <div className="center">
            <h3>School Learners List</h3>
            {
              data.map(item => {
                return <div className="center">

                <Link  to={currentUser ?  "/learner/" + item._id : "/signin"}>
                  <div className="card">
                    <p>{item.name}
                    </p>
                  </div>
                  </Link>
                </div>

              })
            }
          </div>
          : <h2>Loading..</h2>
      }
    </>
  );
}

export default LearnersList;