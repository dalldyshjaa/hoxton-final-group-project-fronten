import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Close, Plus } from "../Icons";

export function SaveModal({
  userOn,
  room,
  setShowWishListModal,
  setRoom,
}: any) {
  const [wishList, setWishlist] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/get-wishlist/${userOn.id}`)
      .then((resp) => resp.json())
      .then((wishlist) => setWishlist(wishlist));
  }, [showForm]);

  const navigate = useNavigate();

  type Room = {
    image: String;
    title: String;
    id: Number;
  };
  return (
    <div className="modal-background">
      {!showForm ? (
        <div className="save-modal">
          <div className="save-modal-head modal-top">
            <button
              onClick={() => {
                setShowWishListModal(false);
              }}
            >
              <Close />
            </button>
            <div>Your wishlist</div>
            <div className="save-modal-head-empty"></div>
          </div>
          <div className="save-modal-main">
            {room && (
              <div
                className="create-new-wishlist-button"
                onClick={() => {
                  setShowForm(true);
                }}
              >
                <button>
                  <Plus color="#222222" height="40px" />
                </button>
                <p className="main-text">Create new wishlist</p>
              </div>
            )}
            <>
              {wishList.map((room: Room) => (
                <>
                  {/* @ts-ignore  */}
                  <div
                    key={room.id}
                    onClick={() => {
                      navigate(`/single-page/${room.roomId}`);
                    }}
                  >
                    <img
                      //   @ts-ignore
                      src={room.image}
                      alt=""
                      className="wishlist-room-image"
                    />
                    <p className="main-text">{room.title}</p>
                  </div>
                </>
              ))}
            </>
          </div>
        </div>
      ) : (
        <form
          className="add-to-wish-list-modal"
          onSubmit={(e) => {
            // e.preventDefault();
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
              )
                .then((resp) => resp.json())
                .then((room) => setRoom(room));
            }
          }}
        >
          <div className="modal-top">
            <button
              onClick={() => {
                setShowForm(false);
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
      )}
    </div>
  );
}
