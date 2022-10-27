import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, Search, Menu } from "../Icons";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { Footer } from "../components/Footer";

import "../styles/Home.css";
import { SaveModal } from "../components/SaveModal";
import { RoomCard } from "../components/RoomCard";
export type Room = {
  id: number;
  title: string;
  price: string;
  guestsLimit: number;
  description: string;
  rules: string;
  country: string;
  city: string;
  reviewsNr: number;
  review: number;
  favorite: boolean;
  images: Image[];
};

export type Image = {
  id: number;
  image: string;
  roomId: number;
};

// export function Home(setUserOn: any) {
//   const [rooms, setRooms] = useState([]);

export function Home({ userOn, setUserOn, SignOut }: any) {
  const [rooms, setRooms] = useState([]);
  const [roomsToShow, setRoomsToShow] = useState([]);
  //make a current count with id
  const [current, setCurrent] = useState(0);
  const [showMenuPopUp, setShowMenuPopUp] = useState(false);
  const [showWishListModal, setShowWishListModal] = useState(false);

  // ]

  let defaultRooms: Room[];
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/get-all-rooms/${userOn.id}`)
      .then((resp) => resp.json())
      .then((rooms) => {
        setRooms(rooms);
        setRoomsToShow(rooms);
      });
  }, []);

  function handleSubmit(event: any) {
    event.preventDefault();

    let location = event.target.location.value;
    let guests = Number(event.target.guests.value);
    console.log(location, guests);

    if (!(location || guests)) {
      setRoomsToShow(structuredClone(rooms));
      return;
    }
    const roomsCopy = structuredClone(rooms);

    const filteredRooms = roomsCopy.filter(
      (room: Room) =>
        location === room.country ||
        (location === room.city && guests <= room.guestsLimit)
    );
    setRoomsToShow(filteredRooms);
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? rooms.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === rooms.length - 1 ? 0 : current + 1);
  };

  // return (
  //   <div>
  //     <div className="home">
  //       <Link to={"/single-page"}>
  //         <div className="rooms_section">
  //           {rooms.map((room: Room) => (
  //             <div className="room" key={room.id}>
  //               <div
  //                 className="room_images"
  //                 style={{
  //                   backgroundImage: `url(${room.images})`,
  //                   backgroundSize: "cover",
  //                   backgroundPosition: "center",
  //                   width: "395px",
  //                   height: "269px",
  //                   borderRadius: "24px",
  //                 }}
  //               ></div>
  //               <div>
  //                 <div className="room_description">
  //                   {room.description}
  //                   <div className="room_review">
  //                     <div className="room_review_star">
  //                       <Star />
  //                     </div>
  //                     {room.review}
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="room_title">{room.title}</div>
  //             </div>
  //           ))}
  //         </div>
  //       </Link>
  //     </div>
  //   </div>
  // );

  return (
    <>
      {" "}
      {showWishListModal && (
        <SaveModal
          userOn={userOn}
          // room={room}
          setShowWishListModal={setShowWishListModal}
          // setRoom={setRoom}
        />
      )}
      <div>
        <div className="home">
          <div className="header">
            <div
              className="logo"
              onClick={() => {
                setRoomsToShow(rooms);
              }}
            >
              <img src="logo.png" alt="logo" />
            </div>
            <div className="search">
              <form onSubmit={handleSubmit}>
                <input type="text" name="location" placeholder="Add location" />
                <input type="text" name="guests" placeholder="Add guests" />
                <button className="search-button">
                  <Search />
                </button>
              </form>
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
          <div className="rooms_section">
            {roomsToShow.map((room) => (
              <RoomCard room={room} userOn={userOn} />
            ))}
            {/* {rooms.map((room: Room) => (
              <div className="room" key={room.id}>
                <ul className="list">
                  <BsArrowLeftCircle
                    className="leftArrow"
                    onClick={prevSlide}
                  />
                  {room.images.map((images: Image, index: number) => (
                    <li
                      className={index === current ? "slide active " : "slide "}
                      key={images.id}
                    >
                      {index == current && (
                        <div>
                          <Link to={`/single-page/${room.id}`}>
                            <div
                              className="room_image"
                              key={images.id}
                              style={{
                                backgroundImage: `url(${images.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: "395px",
                                height: "269px",
                                borderRadius: "24px",
                                backgroundRepeat: "no-repeat",
                              }}
                            ></div>
                          </Link>
                        </div>
                      )}
                    </li>
                  ))}
                  <BsArrowRightCircle
                    className="rightArrow"
                    onClick={nextSlide}
                  />
                </ul>
                <div>
                  <Link to={`/single-page/${room.id}`}>
                    <div className="room_description">
                      {room.city}, {room.country}
                      <div className="room_review">
                        <div className="room_review_star">
                          <Star />
                        </div>
                        {room.review}
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="room_title">
                  <Link to={`/single-page/${room.id}`}>{room.title}</Link>
                </div>
              </div>
            ))} */}
          </div>
        </div>
        
      </div>
     <Footer />
    </>
  );
}
