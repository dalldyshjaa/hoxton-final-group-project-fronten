import { useEffect, useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {
  A,
  B,
  Close,
  LeftArrow,
  NotSaved,
  ReviewStar,
  RightArrow,
} from "../Icons";
import { SaveModal } from "./SaveModal";

export function RoomCard({ room, userOn }: any) {
  const [imageIndex, setImageIndex] = useState(0);
  let images = room.images;
  const [showArrows, setShowArrows] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [wishListPopUp, setWishListPopUp] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/is-it-saved/${room.id}/${userOn.id}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          setFavorite(false);
        } else {
          setFavorite(true);
        }
      });
  }, []);

  return (
    <>
      <div className="room-card">
        <div className="room-image-section">
          {favorite ? (
            <div className="room-card-saved">
              <B />
            </div>
          ) : (
            <div
              className="room-card-saved"
              onClick={() => {
                setWishListPopUp(true);
              }}
            >
              <A />
              {wishListPopUp && (
                <div className="add-to-wishlist-pop-up">
                  <form
                    className="add-to-wish-list-modal"
                    onSubmit={(e) => {
                      e.preventDefault();
                      // @ts-ignore
                      if (!e.target.name.value) {
                        alert("type something");
                      } else {
                        fetch(
                          `http://localhost:5000/add-to-favorite/${room.id}/${userOn.id}`,
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              // @ts-ignore
                              title: e.target.name.value,
                              image: room.images[0].image,
                            }),
                          }
                        ).then((resp) => resp.json());
                        // .then((room) => setRoom(room));
                        setWishListPopUp(false);
                      }
                    }}
                  >
                    <div className="modal-top">
                      <button
                        onClick={() => {
                          setWishListPopUp(false);
                        }}
                      >
                        <Close />
                      </button>
                      <div>Name this wishlist</div>
                      <div className="save-modal-head-empty"></div>
                    </div>
                    <div className="modal-main add-to-wish-list-modal-main">
                      <div className="name-wish-list-form">
                        <input
                          type="text"
                          placeholder="Name"
                          maxLength={50}
                          name="name"
                        />
                      </div>
                      <p className="max-characters">50 characters maximum</p>
                    </div>
                    <div className="add-to-wishlist-button-wrapper">
                      <button type="submit">Create</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
          {showArrows && (
            <div
              className="arrows-container"
              onMouseOver={() => {
                setShowArrows(true);
              }}
            >
              {imageIndex > 0 ? (
                <div
                  className="arrow-container"
                  onClick={() => {
                    setImageIndex(imageIndex - 1);
                  }}
                >
                  <LeftArrow />
                </div>
              ) : (
                <div></div>
              )}
              {imageIndex < images.length - 1 ? (
                <div
                  className="arrow-container"
                  onClick={() => {
                    setImageIndex(imageIndex + 1);
                  }}
                >
                  <RightArrow />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
          <img
            src={images[imageIndex].image}
            alt=""
            className="room-card-image"
            onMouseOver={() => {
              setShowArrows(true);
            }}
            onMouseLeave={() => {
              setShowArrows(false);
            }}
            onClick={() => {
              navigate(`/single-page/${room.id}`);
            }}
          />
        </div>
        <div className="room-card-info">
          <p>
            {room.city}, {room.country}
          </p>
          <div>
            <ReviewStar size="12px" /> {room.stats.percentage.toFixed(1)}
          </div>
        </div>
        <div className="room-title">{room.title}</div>
        <div className="room-price">
          <strong>{room.price}</strong> night
        </div>
      </div>
    </>
  );
}
