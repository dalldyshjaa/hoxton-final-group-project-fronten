import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReservationForm } from "../components/ReservationForm";
import { SaveModal } from "../components/SaveModal";
import { Menu, More, NotSaved, Saved } from "../Icons";
import { Room } from "./Home";

export function SingleRoom({ userOn, SignOut }: any) {
  const [room, setRoom] = useState<Room | null>(null);
  const [total, setTotal] = useState(0);
  const [showWishListModal, setShowWishListModal] = useState(false);

  const navigate = useNavigate();

  //to be removed
  const [showMenuPopUp, setShowMenuPopUp] = useState(false);

  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/single-room/${params.roomId}/${userOn.id}`)
      .then((resp) => resp.json())
      .then((room) => {
        setRoom(room);
        setTotal(Number(room.price.substring(1)) + 58);
      });
  }, []);
  let nightPrice = 0;
  if (!room) {
    return <h1>Loading</h1>;
  } else {
    nightPrice = Number(room.price.substring(1));
    console.log(nightPrice);
  }
  return (
    <>
      {showWishListModal && (
        <SaveModal
          userOn={userOn}
          room={room}
          setShowWishListModal={setShowWishListModal}
          setRoom={setRoom}
        />
      )}
      <div className="single-page">
        <div className="images-container">{/* Fotot e dhomes ktu  */}</div>
        <div className="desc-comment-container">
          <div>
            <div className="description">{/* Ktu desription  */}</div>
            <div className="comments">{/* Ktu komentet */}</div>
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
                        navigate("/profile");
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
          <aside className="form">
            {!room.favorite ? (
              <div
                className="save-button"
                onClick={() => {
                  setShowWishListModal(true);
                  // if (!room.favorite) {
                  //   fetch(
                  //     `http://localhost:5000/add-to-favorite/${room.id}/${userOn.id}`
                  //   );
                  // }
                }}
              >
                <>
                  <NotSaved color="#222222" height="14px" />
                  Save
                </>
              </div>
            ) : (
              <div className="save-button">
                <>
                  <Saved color="#FF385C" />
                  Saved
                </>
              </div>
            )}
            <ReservationForm
              userOn={userOn}
              setTotal={setTotal}
              total={total}
              nightPrice={nightPrice}
              room={room}
            />
          </aside>
        </div>
      </div>
    </>
  );
}
