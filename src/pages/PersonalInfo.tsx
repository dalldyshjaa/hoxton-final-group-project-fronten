import { useNavigate } from "react-router-dom";
import { Logo } from "../Icons";

export function PersonalInfo({ userInfo, setUserOn }: any) {
  const navigate = useNavigate();
  return (
    <div className="personal-info">
      <h2>Personal Info</h2>
      <p>Basic info, like your name and photo</p>
      <main>
        <div className="info">
          <h3>Profile</h3>
          <p>Some info may be visible to other people</p>
        </div>
        <form
          className="user-info"
          onSubmit={(e) => {
            e.preventDefault();
            let user = structuredClone(userInfo);
            // @ts-ignore
            if (e.target.userFullName.value) {
              // @ts-ignore
              user.fullName = e.target.userFullName.value;
            }
            // @ts-ignore
            if (e.target.userPhotoUrl.value) {
              // @ts-ignore
              user.profilePic = e.target.userPhotoUrl.value;
            }
            // @ts-ignore

            console.log(user);
            fetch("http://localhost:5000/sign-up", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            })
              .then((resp) => resp.json())
              .then((data) => {
                console.log(data);
                localStorage.token = data.token;
                setUserOn(data.newUser);
                navigate("/");
              });
          }}
        >
          <div>
            <label>NAME</label>
            <span>
              <input
                type="text"
                placeholder="Enter your full name here"
                name="userFullName"
              />
            </span>
          </div>
          <div>
            <label>PHOTO (optional)</label>
            <span>
              <input
                type="text"
                placeholder="Enter photo URL here"
                name="userPhotoUrl"
              />
            </span>
          </div>
          <div className="finish-button-wrapper">
            <input
              type="submit"
              value="Finish registration"
              className="finish-registration-button"
            />
          </div>
        </form>
      </main>
    </div>
  );
}
