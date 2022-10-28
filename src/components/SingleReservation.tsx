import { useState } from "react";
import { json } from "react-router-dom";
import { Stars } from "./Stars";

export function SingleReservation({ navigate, reservation, userOn }: any) {
  const [showForm, setShowForm] = useState(null);
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState(false);
  return (
    <>
      <div className="single-reservation">
        <img
          src={reservation.room.images[0].image}
          alt=""
          className="single-reservation-image"
          onClick={() => {
            navigate(`/single-page/${reservation.room.id}`);
          }}
        />
        <div>
          <h3
            onClick={() => {
              navigate(`/single-page/${reservation.room.id}`);
            }}
          >
            {reservation.room.title}
          </h3>
          <div
            onClick={() => {
              navigate(`/single-page/${reservation.room.id}`);
            }}
          >
            {reservation.room.description}
          </div>
          <div className="single-reservation-bottom">
            <span className="single-reservation-price">
              ${reservation.price}
            </span>
            <span
              className="single-reservation-add-review"
              onClick={() => {
                setShowForm(!showForm);
              }}
            >
              Add review
            </span>
          </div>
        </div>
      </div>
      {showForm ? (
        <form
          className="add-review-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (e.target.comment.value) {
              fetch(
                `http://localhost:5000/add-review/${reservation.room.id}/${userOn.id}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    content: e.target.comment.value,
                    count: count,
                  }),
                }
              )
                .then((resp) => resp.json())
                .then((data) => {
                  if (data.message) {
                    setSuccess(true);
                    setTimeout(setShowForm(false), 2000);
                  }
                });
            }
          }}
        >
          <textarea name="comment" placeholder="Type your comment" />
          <div>
            <div>
              Rate: <Stars count={count} setCount={setCount} />
            </div>
            {!success ? (
              <button type="submit">Add review</button>
            ) : (
              <button disabled className="successfully-added">
                Review added successfully
              </button>
            )}
          </div>
        </form>
      ) : null}
    </>
  );
}
