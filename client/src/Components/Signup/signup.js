import React, { Component } from "react";
import "./signup.css";
import { Link, withRouter } from "react-router-dom";
import M from "materialize-css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    fetch("/auth/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 yellow darken-3" });
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          const { history } = this.props;
          if (history) history.push("/signin");
        }
      });

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.state.email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      return;
    }
    if (this.state.name.length < 4) {
      M.toast({
        html: "Name should have atleast 4 letters",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    if (this.state.password.length < 6) {
      M.toast({
        html: "Password should have atleast 6 letters",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    if (this.state.password != this.state.confirmPassword) {
      M.toast({
        html: "Passwords doesn't match",
        classes: "#c62828 red darken-3",
      });
      return;
    }
  }

  render() {
  
    return (
      <div>
        <form className="main-form" onSubmit={this.onSubmit}>
          <h2 style={{ textAlign: "center" }}>SignUp</h2>
          <div className="input-field">
            <label>Name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="input-field">
            <label>Email</label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="input-field">
            <label>Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="input-field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={this.state.confirmPassword}
              onChange={this.onChangeConfirmPassword}
            />
          </div>
          <div className="input-field">
            <input type="submit" value="SignUp" />
          </div>

          <p style={{ textAlign: "center" }}>
            <Link to="/signin" style={{ color: "black" }}>
              Already have an account!
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);
