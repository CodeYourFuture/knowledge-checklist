import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import useFormValidation from "./useFormValidation";
import "../App.css";
import validate from "./SignupValidation";
import Footer from "./Footer";
import Header from "./Header";
<<<<<<< HEAD
import useQuery from "../components/useQuery";
=======
import CityDropDownOptions from "./CityDropDownOptions";

>>>>>>> 7c3c1bcab0817973d3b9ac1bf454d2c710ab4cf8
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
  console.log(intialState);
  console.log(input.cyfCity);
  console.log(input.userClassId);
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
<<<<<<< HEAD
              <label for="cyfCity">City</label>
              <input
                type="text"
                placeholder="City"
                value={input.cyfCity}
                onChange={handleChange}
                name="cyfCity"
              />
              {errors.cyfCity && <p className="error">*{errors.cyfCity} </p>}
              <label for="userClassId">Class</label>
              <input
                type="number"
                placeholder="Class"
                value={input.userClassId}
                onChange={handleChange}
                name="userClassId"
              />
              {errors.userClassId && (
                <p className="error">*{errors.userClassId} </p>
              )}
=======
              <label for="userPassword">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={input.userPassword}
                onChange={handleChange}
                name="userPassword"
              />
              {errors.userPassword && (
                <p className="error">*{errors.userPassword} </p>
              )}
              <label for="">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={input.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
              />
              {errors.confirmPassword && (
                <p className="error">*{errors.confirmPassword} </p>
              )}

>>>>>>> 7c3c1bcab0817973d3b9ac1bf454d2c710ab4cf8
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
