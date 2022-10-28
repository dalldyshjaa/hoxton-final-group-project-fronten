import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Logo,
  EmailIcon,
  PasswordIcon,
  FacebookIcon,
  GitHubIcon,
  GmailIcon,
  TwitterIcon,
} from "../Icons";
import { PersonalInfo } from "./PersonalInfo";

export function Signup({ setUserOn }: any) {
  const [userInfo, setUserInfo] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {!successful ? (
        <section>
          <main>
            <div className="account-form-logo">
              <Logo />
            </div>
            <h2>Join thousands of users from around the world </h2>
            <form
              className="account-info-form"
              onSubmit={(e) => {
                console.log("here");
                e.preventDefault();
                let newUser = {
                  // @ts-ignore
                  email: e.target.newEmail.value,
                  // @ts-ignore
                  password: e.target.newPassword.value,
                  // @ts-ignore
                  fullName: e.target.fullName.value,
                  // @ts-ignore
                  profileImage: e.target.profileImage.value,
                };
                // @ts-ignore
                fetch("http://localhost:5000/sign-up", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newUser),
                })
                  .then((resp) => resp.json())
                  .then((data) => {
                    if (data.error) {
                      console.log("asdsad");
                    } else {
                      localStorage.token = data.token;
                      setUserOn(data.newUser);
                      navigate("/");
                    }
                  });
              }}
            >
              <div className="input-wrapper">
                <EmailIcon />
                <input type="email" placeholder="Email" name="newEmail" />
              </div>
              <div className="input-wrapper">
                <PasswordIcon />
                <input
                  type="password"
                  placeholder="Password"
                  name="newPassword"
                />
              </div>
              <div className="input-wrapper">
                <label>NAME</label>
                <span>
                  <input
                    type="text"
                    placeholder="Enter your full name here"
                    name="fullName"
                  />
                </span>
              </div>
              <div className="input-wrapper">
                <label>PHOTO (optional)</label>
                <span>
                  <input
                    type="text"
                    placeholder="Enter photo URL here"
                    name="profileImage"
                  />
                </span>
              </div>
              <input type="submit" value="Sign Up" />
            </form>
            <div className="continue">
              <p>or continue with these social profile</p>
              <div className="social-media-icons-container">
                <div className="social-media-icon">
                  <FacebookIcon />
                </div>
                <div className="social-media-icon">
                  <GmailIcon />
                </div>
                <div className="social-media-icon">
                  <TwitterIcon />
                </div>
                <div className="social-media-icon">
                  <GitHubIcon />
                </div>
              </div>
            </div>
            <div className="register-if-dont-have-acc">
              <p>
                Already have an account?{" "}
                <strong
                  onClick={(e) => {
                    navigate("/");
                  }}
                >
                  Login
                </strong>
              </p>
            </div>
          </main>
        </section>
      ) : (
        <PersonalInfo userInfo={userInfo} setUserOn={setUserOn} />
      )}
    </>
  );
}
