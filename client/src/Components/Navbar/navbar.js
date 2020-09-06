import "./navbar.css";
import { Link, useHistory } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {LOGOUT} from "../../actions/types.js";


const NavBar = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

    const renderList = () => {
          if(currentUser){
            return [       
              <li key="1" onClick={(e) => {
                localStorage.removeItem("user");
                dispatch({
                  type: LOGOUT,
                });
                history.push("/signin");
              }} style={{paddingRight:"20px", cursor:"pointer"}}>
               LogOut
              </li>
          ];
          } else {
            return [       
              <li key="2">
                <Link to="/signup" style={{ color: "white" }}>
                  SignUp
                </Link>
              </li>,
              <li key="3">
                <Link to="/signin" style={{ color: "white" }}>
                  SignIn
                </Link>
              </li>
          ];
          }
        }

  return (
    
    <nav>
      <div className="nav-main">
      <ul className="nav-ul">
        <li key="8">
          <Link to='/'style={{ color: "white" }}>
            School
          </Link>
        </li>
        <div className="right">{renderList()}</div>
      </ul>
    </div>
   </nav>
  );
};

export default NavBar;