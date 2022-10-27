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
  const [favorite, setFavorite] = useState(false);

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
    fetch(`http://localhost:5000/is-it-saved/${params.roomId}/${userOn.id}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          setFavorite(false);
        } else {
          setFavorite(true);
        }
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
      <div className="single-page">
        <div className="images-container">
          {/* Fotot e dhomes ktu  */}
          {!favorite ? (
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
        </div>
        <div className="desc-comment-container">
          <div>
            <div className="description">{/* Ktu desription  */}</div>
            <div className="comments">
              {" "}
              {room.comments.map((comment) => (
                <div className="comment-user">
                  <div className="user">
                    <div className="username">
                      <h3>{comment.author.fullName}</h3>
                      <div className="date">
                        {comment.assignedAt.substring(0, 10)}
                      </div>
                    </div>
                    <div
                      className="photo-profile"
                      onClick={() => {
                        navigate(`/profile/${comment.authorId}`);
                      }}
                    >
                      <div className="img">
                        <img
                          src={
                            comment.author.profileImage
                              ? comment.author.profileImage
                              : "https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="comment">{comment.content}</div>
                </div>
              ))}
            </div>
          </div>
          <aside className="form">
            <ReservationForm
              userOn={userOn}
              setTotal={setTotal}
              total={total}
              nightPrice={nightPrice}
              room={room}
            />
          </aside>
          {/* //23 */}
        </div>
      </div>
    </>
  );
}
{
  /* <div className="single-page">
      // <div className="images-container">{/* Fotot e dhomes ktu  */
}
// <div className="desc-comment-container">
//   <div>
//     <div className="description">{/* Ktu desription  */}</div>
//     <div className="comments">
{
  /* {room.comments.map((comment) => (
              <div className="comment-user">
                <div className="user">
                  <div className="username">
                    <h3>{comment.author.fullName}</h3>
                    <div className="date">
                      {comment.assignedAt.substring(0, 10)}
                    </div>
                  </div>
                  <div className="photo-profile">
                    <div className="img">
                      <img
                        src={
                          comment.author.profileImage
                            ? comment.author.profileImage
                            : "https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240"
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="comment">{comment.content}</div>
              </div>
            ))} */
}
//     </div>
//   </div>
// </div> */}
