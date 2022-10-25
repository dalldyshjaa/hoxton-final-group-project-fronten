import { useNavigate } from "react-router-dom";
import {
  Logo,
  EmailIcon,
  PasswordIcon,
  FacebookIcon,
  GmailIcon,
  TwitterIcon,
  GitHubIcon,
} from "../Icons";

export function LogIn({ setUserOn }: any) {
  const navigate = useNavigate();
  return (
    <section>
      <main>
        <div className="account-form-logo">
          <Logo />
        </div>
        <h2>Login</h2>
        <form
          className="account-info-form"
          onSubmit={(e) => {
            e.preventDefault();
            fetch("http://localhost:5000/log-in", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                // @ts-ignore
                email: e.target.email.value,
                // @ts-ignore
                password: e.target.password.value,
              }),
            })
              .then((resp) => resp.json())
              .then((data) => {
                console.log(data);
                localStorage.token = data.token;
                setUserOn(data.user);
              });
          }}
        >
          <div className="input-wrapper">
            <EmailIcon />
            <input type="email" placeholder="Email" name="email" />
          </div>
          <div className="input-wrapper">
            <PasswordIcon />
            <input type="password" placeholder="Password" name="password" />
          </div>
          <input type="submit" value="Login" />
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
            Don't have an account yet?{" "}
            <strong
              onClick={() => {
                navigate("/sign-up");
                // setCurrent("Signup");
              }}
            >
              Register
            </strong>
          </p>
        </div>
      </main>
    </section>
  );
}
