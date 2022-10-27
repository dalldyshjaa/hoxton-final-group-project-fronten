import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReservationForm } from "../components/ReservationForm";
import { Room } from "./Home";

export function SingleRoom({ userOn }: any) {
  const [room, setRoom] = useState<Room | null>(null);
  const [total, setTotal] = useState(0);
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/single-room/${params.roomId}`)
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
    <div className="single-page">
      <div className="images-container">{/* Fotot e dhomes ktu  */}</div>
      <div className="desc-comment-container">
        <div>
          <div className="description">{/* Ktu desription  */}</div>
          <div className="comments">
            {room.comments.map((comment) => (
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
      </div>
    </div>
  );
}
