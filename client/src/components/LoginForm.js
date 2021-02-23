import React from "react";
import { Container, btn } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import LoginImage from "../login-image.jpg";
import "../App.css";

export default function LoginForm() {
  return (
    <div className="login-container">
      <Header />
      <img
        src={LoginImage}
        alt="code your future"
        border="0"
        className="login-image"
      ></img>

      <Container className="main-container">
        <div className="signup-prompt ">
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.github_client_id}`}
            className="register text-white btn btn-dark   text-center "
          >
            <i class="fab fa-github"></i> Sign in with Github
          </a>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
