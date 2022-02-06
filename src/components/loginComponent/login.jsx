import { message } from "antd";
import React from "react";
import apiCollection from "../../resources/apiCollection";
import { postApi } from "../../resources/ApiContent";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  login = async () => {
    var values = {
      USERNAME: this.state.username,
      PASSWORD: this.state.password,
    };

    try {
      const result = await postApi(apiCollection.adminLogin, values);
      if (result.data.success) {
        message.success(result.data.message);
        localStorage.setItem("token", result.data.token);
        window.location.href = "/dashboard";
      } else {
        message.error(result.data.message);
      }
    } catch (errors) {
      message.error("Invalid Credentials");
    }
  };

  passwordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  usernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }
  render() {
    return (
        <div className="base-container" ref={this.props.containerRef}>
          <div className="header">Login</div>
          <div className="content">
            <div className="image">
              <img
                src={"/icons/undraw_secure_login_pdn4.png"}
                alt={"Login"}
                style={{ width: "240px" }}
              />
            </div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={this.usernameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={this.passwordChange}
                />
              </div>
            </div>
          </div>
          <div className="footer">
            <button type="button" className="btn" onClick={this.login}>
              Login
            </button>
          </div>
        </div>
    );
  }
}
