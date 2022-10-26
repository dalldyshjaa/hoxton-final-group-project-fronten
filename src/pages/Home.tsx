import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Star } from "../Icons";

import "../styles/Home.css"
export type Room = {
    id: number
    title: string
    price: string
    guestsLimit: number
    description: string
    rules: string
    country: string
    city: string
    reviewsNr: number
    review: number
    images: string
}

export function Home(setUserOn: any) {


    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/get-all-rooms")
            .then((resp) => resp.json())
            .then((rooms) => {
                setRooms(rooms);
            });
    }, []);

    // const roomss = [
    //     {
    //         id: 1,
    //         title: "Room 1",
    //         price: "100",
    //         guestsLimit: 2,
    //         description: "Room 1 description",
    //         rules: "Room 1 rules",
    //         country: "Romania",
    //         city: "Bucharest",
    //         reviewsNr: 2,
    //         review: 4,
    //         images: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg"
    //     },
    //     {
    //         id: 2,
    //         title: "Room 2",
    //         price: "200",
    //         guestsLimit: 2,
    //         description: "Room 2 description",
    //         rules: "Room 2 rules",
    //         country: "Romania",
    //         city: "Bucharest",
    //         reviewsNr: 2,
    //         review: 4,
    //         images: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg"
    //     },
    //     {
    //         id: 3,
    //         title: "Room 3",
    //         price: "300",
    //         guestsLimit: 2,
    //         description: "Room 3 description",
    //         rules: "Room 3 rules",
    //         country: "Romania",
    //         city: "Bucharest",
    //         reviewsNr: 2,
    //         review: 4,
    //         images: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg"
    //     },
    //     {
    //         id: 4,
    //         title: "Room 3",
    //         price: "300",
    //         guestsLimit: 2,
    //         description: "Room 3 description",
    //         rules: "Room 3 rules",
    //         country: "Romania",
    //         city: "Bucharest",
    //         reviewsNr: 2,
    //         review: 4,
    //         images: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg"
    //     },
    //     {
    //         id: 5,
    //         title: "Room 3",
    //         price: "300",
    //         guestsLimit: 2,
    //         description: "Room 3 description",
    //         rules: "Room 3 rules",
    //         country: "Romania",
    //         city: "Bucharest",
    //         reviewsNr: 2,
    //         review: 4,
    //         images: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg"
    //     },
    //     {
    //         id: 6,
    //         title: "Room 3",
    //         price: "300",
    //         guestsLimit: 2,
    //         description: "Room 3 description",
    //         rules: "Room 3 rules",
    //         country: "Romania",
    //         city: "Bucharest",
    //         reviewsNr: 2,
    //         review: 4,
    //         images: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg"
    //     },
    //     {
    //         id: 7,
    //         title: "Room 3",
    //         price: "300",
    //         guestsLimit: 2,
    //         description: "Room 3 description",
    //         rules: "Room 3 rules",
    //         country: "Romania",
    //         city: "Bucharest",
    //         reviewsNr: 2,
    //         review: 4,
    //         images: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg"
    //     },
    //     {
    //         id: 8,
    //         title: "Room 3",
    //         price: "300",
    //         guestsLimit: 2,
    //         description: "Room 3 description",
    //         rules: "Room 3 rules",
    //         country: "Romania",
    //         city: "Bucharest",
    //         reviewsNr: 2,
    //         review: 4,
    //         images: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg"
    //     },
    //     {
    //         id: 9,
    //         title: "Bucharest  ",
    //         price: "300",
    //         guestsLimit: 2,
    //         description: "Room 3 description",
    //         rules: "Room 3 rules",
    //         country: "Romania",
    //         city: "Bucharest",
    //         reviewsNr: 2,
    //         review: 4,
    //         images: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg"
    //     },


    // ]

    return (
        <div>
            <div className="home">
                <Link to={"/single-page"}>
                    <div className="rooms_section">
                        {rooms.map((room: Room) => (
                            <div className="room" key={room.id}>
                                <div
                                    className="room_images"
                                    style={{
                                        backgroundImage: `url(${room.images})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        width: "395px",
                                        height: "269px",
                                        borderRadius: "24px"
                                    }}
                                ></div>
                                <div>
                                    <div className="room_description">
                                        {room.description}
                                        <div className="room_review" >
                                            <div className="room_review_star">
                                                <Star />
                                            </div>
                                            {room.review}
                                        </div>
                                    </div>

                                </div>
                                <div className="room_title">
                                    {room.title}
                                </div>

                            </div>
                        ))}
                    </div>
                </Link>
            </div>
        </div>
    )
}