import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import useFormValidation from "./useFormValidation";
import "../App.css";
import validate from "./SignupValidation";
import Footer from "./Footer";
import Header from "./Header";
import useQuery from "../components/useQuery";
import CityDropDownOptions from "./CityDropDownOptions";

const SignupForm = () => {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [serverError, setServerError] = useState("");

  const intialState = {
    firstName: "",
    lastName: "",
    userRole: "",
    userEmail: "",
    cyfCity: "",
    userClassId: "",
    userGithub: useQuery("githubUserName") ?? "",
    userSlack: "",
  };

  const {
    handleChange,
    input,
    handleSubmit,
    errors,
    isValid,
  } = useFormValidation(validate, intialState);

  useEffect(() => {
    if (isValid) {
      fetch(`/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: input.firstName,
          lastName: input.lastName,
          userRole: input.userRole,
          userEmail: input.userEmail,
          userSlack: input.userSlack,
          userGithub: input.userGithub,
          userClassId: input.userClassId,
          cyfCity: input.cyfCity,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setHasRegistered(true);
        })
        .catch((error) => {
          setServerError(error.message);
        });
    }
  }, [isValid]);

  return (
    <div>
      <Header />
      <div className="signup-container">
        <div className="signup-img-container">
          <img
            src="https://i.ibb.co/hVRjyML/cyf-001.jpg"
            alt="code your future"
            border="0"
            className="signup-image"
          ></img>
        </div>
        {hasRegistered ? (
          <Modal role={input.userRole} />
        ) : (
          <form onSubmit={handleSubmit} className="signup-form-container">
            <div className="sign-form">
              <label for="firstName">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={input.firstName}
                onChange={handleChange}
                name="firstName"
              />
              {errors.firstName && (
                <p className="error">*{errors.firstName} </p>
              )}
              <label for="lastName">Surname</label>
              <input
                type="text"
                placeholder="Surname"
                value={input.lastName}
                onChange={handleChange}
                name="lastName"
              />
              {errors.lastName && <p className="error">*{errors.lastName} </p>}
              <label for="userEmail">Email</label>
              <input
                type="userEmail"
                placeholder="Email"
                value={input.userEmail}
                onChange={handleChange}
                name="userEmail"
              />
              {errors.userEmail && (
                <p className="error">*{errors.userEmail} </p>
              )}

              <label for="userGithub">Github Name</label>
              <input
                type="text"
                placeholder="Github Name"
                value={input.userGithub}
                onChange={handleChange}
                name="userGithub"
              />
              <label for="userSlack">Slack Handler</label>
              <input
                type="text"
                placeholder="Slack Handler"
                value={input.userSlack}
                onChange={handleChange}
                name="userSlack"
              />
              <CityDropDownOptions
                city={input.cyfCity}
                handleChange={handleChange}
              />

              <label for="userRole">Please select a role</label>
              <select
                className="role-select"
                name="userRole"
                onChange={handleChange}
              >
                <option value="select">Select</option>
                <option value="Student">Student</option>
                <option value="Mentor">Mentor</option>
              </select>
              {errors.userRole && <p className="error">*{errors.userRole} </p>}
              <button
                to="/modal"
                className="signup-submit"
                type="submit"
                value="Submit"
                className="submit"
              >
                Submit
              </button>
              <p className="error">{serverError}</p>
            </div>
          </form>
        )}
      </div>
      <div className="sign-up-footer">
        <Footer />
      </div>
    </div>
  );
};

export default SignupForm;
