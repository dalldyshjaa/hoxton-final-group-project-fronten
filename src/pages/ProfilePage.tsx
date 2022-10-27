import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { SaveModal } from "../components/SaveModal";
import { Menu, Tick, Verified } from "../Icons";

export function ProfilePage({ userOn, SignOut }: any) {
  const [showImageInput, setShowImageInput] = useState(false);
  const [showMenuPopUp, setShowMenuPopUp] = useState(false);
  const [showWishListModal, setShowWishListModal] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [image, setImage] = useState("");

  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/profile-page/${params.userId}`)
      .then((resp) => resp.json())
      .then((user) => {
        setUser(user);
        setImage(user.profileImage);
      });
  }, []);

  return (
    <>
      {user ? (
        <>
          {showWishListModal && (
            <SaveModal
              userOn={userOn}
              // room={room}
              setShowWishListModal={setShowWishListModal}
              // setRoom={setRoom}
            />
          )}{" "}
          <div className="profile-page-header">
            <div>
              <div
                className="profile-page-header-logo-wrapper"
                onClick={() => {
                  navigate("/");
                }}
              >
                <img src="/logo.png" alt="Logo" />
              </div>
              <div
                className="header-profile-wrapper"
                onClick={() => {
                  setShowMenuPopUp(!showMenuPopUp);
                }}
              >
                <Menu />
                <img
                  src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3"
                  alt=""
                  className="header-profile-image"
                />
                {showMenuPopUp ? (
                  <div className="menu-pop-up">
                    <div className="menu-pop-up-top">
                      <div>Messages</div>
                      <div
                        onClick={() => {
                          setShowWishListModal(true);
                        }}
                      >
                        Wishlist
                      </div>
                      <div>Reservations</div>
                      <div
                        onClick={() => {
                          navigate(`/profile/${userOn.id}`);
                        }}
                      >
                        Profile
                      </div>
                    </div>
                    <div className="menu-pop-up-bottom">
                      <div>Help</div>
                      <div
                        onClick={() => {
                          SignOut();
                        }}
                      >
                        Log out
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="profile-main">
            <aside>
              <img src={image} alt="" className="profile-page-image" />
              {user.id === userOn.id ? (
                <>
                  {!showImageInput ? (
                    <p
                      className="update-photo-p"
                      onClick={() => {
                        setShowImageInput(true);
                      }}
                    >
                      Update photo
                    </p>
                  ) : (
                    <form
                      className="update-image-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        fetch(
                          `http://localhost:5000/update-profile/${userOn.id}`,
                          {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ profileImage: image }),
                          }
                        );
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Image link"
                        onChange={(e) => {
                          setImage(e.target.value);
                          if (!e.target.value) {
                            setImage(userOn.profileImage);
                          }
                        }}
                      />
                      <button className="update-image-button" type="submit">
                        Submit
                      </button>
                    </form>
                  )}
                </>
              ) : null}
              <div className="profile-main-first-div">
                <Verified />
                <h4>Identity verification</h4>
                <div className="verification-text">
                  Show others you’re really you with the identity verification
                  badge.
                </div>
                <button className="get-the-badge">Get the badge</button>
              </div>
              <div className="profile-main-second-div">
                <h3>{user.fullName} confirmed</h3>
                {true ? (
                  <div className="confirmations">
                    <Tick /> Phone number
                  </div>
                ) : null}
              </div>
            </aside>
            <section></section>
          </div>
          <Footer />
        </>
      ) : null}
    </>
  );
}
