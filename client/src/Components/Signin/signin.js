import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../Signup/signup.css";
import M from "materialize-css";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import {LOGIN_SUCCESS} from "../../actions/types.js";

const SignIn = () => {
  const history = useHistory();
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      return;
    }

    fetch("/auth/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          M.toast({
            html: "signedin success",
            classes: "#43a047 green darken-1",
          });
          
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: data },
          });
          history.push("/");
          return Promise.resolve();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="main-form">
        <h2 style={{ textAlign: "center" }}>SignIn</h2>
        <div className="input-field">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
          />
        </div>

        <div className="input-field">
          <input type="submit" value="SignIn" onClick={() => PostData()} />
        </div>
        <div className="follow">
          <span>
            <Link to="/signup" style={{ color: "black" }}>
              Don't have an account!
            </Link>
          </span>
          
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SignIn);
