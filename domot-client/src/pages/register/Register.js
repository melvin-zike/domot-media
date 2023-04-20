import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
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
    <div className="register">
      <div className="registerWrapper">
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <h3 class="msg-info">Sign Up To Cappa</h3>
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="registerInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="registerInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="registerInput"
              type="password"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <span className="registerForgot">
                Already have an account? Sign In
              </span>
            </Link>
          </form>
        </div>

        <div className="registerLeft">
          <h3 className="registerLogo">Domot</h3>
          <span className="registerDesc">
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
