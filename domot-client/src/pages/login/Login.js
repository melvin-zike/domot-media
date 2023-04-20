import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import AnimatedShapes from "../AnimatedShapes";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <h3 class="msg-info">Sign In To Cappa </h3>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <Link to="/register">
              <span className="loginForgot">
                Don't have an account? Sign Up
              </span>
            </Link>
          </form>
        </div>

        <div className="loginLeft">
          <h3 className="loginLogo">Domot</h3>
          <span className="loginDesc">
            <p>We dey your domot!</p>
            <p>Connect with friends and the world around you on Domot.</p>
            <p>Nigeria's number 1 social media platform.</p>
          </span>
          <AnimatedShapes className="animay" />
        </div>
      </div>
    </div>
  );
}
