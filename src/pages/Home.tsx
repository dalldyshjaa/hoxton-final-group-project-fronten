import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Search } from "../Icons";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

import "../styles/Home.css";
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

export function Home({ setUserOn }: any) {
  const [rooms, setRooms] = useState([]);
  //make a current count with id
  const [current, setCurrent] = useState(0);

  // ]

  useEffect(() => {
    fetch("http://localhost:5000/get-all-rooms")
      .then((resp) => resp.json())
      .then((rooms) => {
        setRooms(rooms);
      });
  }, []);

  function handleSubmit(event: any) {
    event.preventDefault();

    let location = event.target.location.value;
    let guests = Number(event.target.guests.value);

    const roomsCopy = structuredClone(rooms);

    const filteredRooms = roomsCopy.filter(
      (room: Room) =>
        location === (room.country || room.city) && guests <= room.guestsLimit
    );
    setRooms(filteredRooms);
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
      <div>
        <div className="home">
          <div className="header">
            <div className="logo">
              <img src="logo.png" alt="logo" />
            </div>
            <div className="search">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="location"
                  placeholder="Add location"
                  required
                />
                <input
                  type="text"
                  name="guests"
                  placeholder="Add guests"
                  required
                />
                <button className="search-button">
                  <Search />
                </button>
              </form>
            </div>
          </div>
          <div className="rooms_section">
            {rooms.map((room: Room) => (
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
                          <Link to={`/single-page`}>
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
