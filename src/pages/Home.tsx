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
    images: Image[];
};

export type Image = {
    id: number;
    image: string;
    roomId: number;
};




export function Home({ setUserOn }: any) {
    const [rooms, setRooms] = useState([]);
    //make a current count with id 
    const [current, setCurrent] = useState(0);
    


    const roomss = [
        {
            id: 1,
            title: "Casa de campo",
            city: "Cali",
            country: "Colombia",
            reviewsNr: 5,
            review: 4.5,
            price: "100.000",
            guestsLimit: 4,
            description: "Casa de campo con piscina y jacuzzi",
            rules: "No se permite fumar",
            images: [
                {
                    id: 1,
                    image: "https://img.freepik.com/free-photo/yellow-sofa-wooden-table-living-room-interior-with-plant_41470-3559.jpg?w=2000",
                    roomId: 1
                },
                {
                    id: 2,
                    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg",
                    roomId: 1
                },
                {
                    id: 3,
                    image: "https://media.gettyimages.com/photos/bohemian-living-room-interior-3d-render-picture-id1182454657?s=612x612",
                    roomId: 1
                }
            ]
        },
        {
            id: 2,
            title: "Casa de campo",
            city: "Cali",
            country: "Colombia",
            reviewsNr: 5,
            review: 4.5,
            price: "100.000",
            guestsLimit: 4,
            description: "Casa de campo con piscina y jacuzzi",
            rules: "No se permite fumar",
            images: [
                {
                    id: 1,
                    image: "https://media.istockphoto.com/photos/classic-gray-interior-with-armchairs-sofa-coffee-table-lamps-flowers-picture-id1210123439?b=1&k=20&m=1210123439&s=612x612&w=0&h=DxEqjv85A2bn-uJCodJG22C1L4Q2MuzFzhj4it_gVDg=",
                    roomId: 2
                },
                {
                    id: 2,
                    image: "https://media.istockphoto.com/photos/scandinavian-concept-of-living-room-interior-with-design-sofa-coffee-picture-id1251694108?k=20&m=1251694108&s=612x612&w=0&h=8zH7jqtg_QgLMJMxUq3uBpA7l47LUht32_xT4RHn1EI=",
                    roomId: 2
                },
                {
                    id: 3,
                    image: "https://media.gettyimages.com/photos/modern-living-room-interior-3d-render-picture-id1293762741?s=612x612",
                    roomId: 2
                }
            ]
        },
        {
            id: 3,
            title: "Casa de campo",
            city: "Cali",
            country: "Colombia",
            reviewsNr: 5,
            review: 4.5,
            price: "100.000",
            guestsLimit: 4,
            description: "Casa de campo con piscina y jacuzzi",
            rules: "No se permite fumar",
            images: [
                {
                    id: 1,
                    image: "https://img.freepik.com/free-photo/yellow-sofa-wooden-table-living-room-interior-with-plant_41470-3559.jpg?w=2000",
                    roomId: 3
                },
                {
                    id: 2,
                    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg",
                    roomId: 3
                },
                {
                    id: 3,
                    image: "https://media.gettyimages.com/photos/bohemian-living-room-interior-3d-render-picture-id1182454657?s=612x612",
                    roomId: 3
                }
            ]
        },

    ]

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
        setCurrent(current === 0 ? roomss.length - 1 : current - 1);
    };


    const nextSlide = () => {
        setCurrent(current === roomss.length - 1 ? 0 : current + 1);
    };

    return (
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
                                <Link to={`/single-page`}>
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
                                <Link to={`/single-page`}>{room.title}</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
