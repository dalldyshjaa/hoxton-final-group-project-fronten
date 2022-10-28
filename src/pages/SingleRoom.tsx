import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { RatingStars } from "../components/RatingStars";
import { ReservationForm } from "../components/ReservationForm";
import { SaveModal } from "../components/SaveModal";
import { Logo, Menu, More, NotSaved, ReviewStar, Saved } from "../Icons";
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
            <Logo />
          </div>
          <div
            className="header-profile-wrapper"
            onClick={() => {
              setShowMenuPopUp(!showMenuPopUp);
            }}
          >
            <Menu />
            <img
              src={
                userOn.profileImage
                  ? userOn.profileImage
                  : "https://a0.muscache.com/defaults/user_pic-50x50.png?v=3"
              }
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
          <h2>{room.title}</h2>
          <div className="images-container-top">
            <aside>
              <div className="asdasd">
                <ReviewStar size="14px" />
                <p>{room.stats.percentage.toFixed(1)} ·</p>
              </div>
              <p>{room.stats.total} reviews</p>
            </aside>
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
          <section>
            <img
              src={room.images[0].image}
              alt=""
              className="single-page-main-image"
            />
            <div className="single-page-secondary-images">
              {room.images.map((image) => (
                <>
                  {image.image !== room.images[0].image && (
                    <>
                      <img
                        src={image.image}
                        alt=""
                        className="single-page-secondary-image"
                        style={{
                          width: room.images.length === 2 ? "100%" : null,
                          height: room.images.length === 2 ? "100%" : null,
                        }}
                      />
                    </>
                  )}
                </>
              ))}
            </div>
          </section>
          {/* Fotot e dhomes ktu  */}
        </div>
        <div className="desc-comment-container">
          <div>
            <div className="single-page-host-info">
              <h2
                onClick={() => {
                  navigate(`/profile/${room.host.id}`);
                }}
              >
                {room.host.fullName}
              </h2>
              <img
                src={room.host.profileImage}
                alt=""
                onClick={() => {
                  navigate(`/profile/${room.host.id}`);
                }}
              />
            </div>
            <div className="single-page-description">{room.description}</div>

            <h3 className="reviews-h3">Reviews ({room.reviews.length})</h3>

            <div className="comments">
              {" "}
              {room.reviews.reverse().map((comment) => (
                <div className="comment-user">
                  <div className="user">
                    <div className="username">
                      <h3>
                        {comment.user.fullName}{" "}
                        <RatingStars count={comment.review} />
                      </h3>
                      <div className="date">
                        {comment.assignedAt.substring(0, 10)}
                      </div>
                    </div>
                    <div
                      className="photo-profile"
                      onClick={() => {
                        navigate(`/profile/${comment.user.id}`);
                      }}
                    >
                      <div className="img">
                        <img
                          src={
                            comment.user.profileImage
                              ? comment.user.profileImage
                              : "https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240"
                          }
                          className="comment-profile-image"
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
      <div className="iframe-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50753.70115509639!2d-121.99874030514822!3d37.33999148563857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb596e9e188fd%3A0x3b0d8391510688f0!2sApple%20Park!5e0!3m2!1sen!2s!4v1666961369199!5m2!1sen!2s"
          width="1120px"
          height="450"
          style={{ border: "0" }}
          loading="lazy"
        ></iframe>
      </div>
      <Footer />
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
