import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import {Link} from "react-router-dom";
import AnimatedShapes from "../AnimatedShapes";


export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
          <h3 class="msg-info">Sign Up To Domot</h3>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <span className="loginForgot">Don't have an account? Sign Up</span>
            <Link to="/login">
          <button className="loginRegisterButton">Log into Account</button>
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
          <AnimatedShapes />
        </div>
      </div>
    </div>
  );
}