import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star } from "../Icons";
import { Room } from "../pages/Home";

export function ReservationForm({
  userOn,
  setTotal,
  room,
  total,
  nightPrice,
}: any) {
  // const [room, setRoom] = useState<Room | null>(null);
  const [days, setDays] = useState(1);
  // const [total, setTotal] = useState(0);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [alreadyReserved, setAlreadyReserved] = useState(false);
  // const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/check-if-reserved/${room.id}/${userOn.id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setAlreadyReserved(data.check);
      });
  }, []);
  // useEffect(() => {
  //   fetch(`http://localhost:5000/check-if-reserved/${room.id}/${userOn.id}`).
  //   then(resp => resp.json()).then(data => {setAlreadyReserved(data.check)})

  //     });
  // }, [])
  //
  return (
    <>
      {room && (
        <form
          className="reservation-form"
          onSubmit={(e) => {
            e.preventDefault();
            fetch(`http://localhost:5000/reserve/${room.id}/${userOn.id}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ price: total }),
            })
              .then((resp) => resp.json())
              .then((data) => {
                if (data.error) {
                  console.log(data.error, "asd");
                  setMessage("Something went wrong");
                  setColor("bad");
                } else {
                  console.log(data.message, "123");
                  setMessage("Room reserved successfully");
                  setColor("good");
                }
              });
          }}
        >
          <div className="reservation-room-info">
            <div>
              <span className="night-price">{room.price}</span>
              <span className="text-night">night</span>
            </div>
            <div>
              <span className="star-icon">
                <Star />
              </span>
              <span className="reserve-review-percentage">
                {room.stats.percentage.toFixed(1)} ·
              </span>
              <button className="reserve-button">
                <span>{room.stats.total} reviews</span>
              </button>
            </div>
          </div>
          <div className="reserve-form-input-unit">
            <div className="days-input-wrapper">
              <span>Days</span>
              <input
                className="days-input"
                type="number"
                placeholder="How many nights?"
                onChange={(e) => {
                  console.log(e.target.value);
                  // @ts-ignore
                  setTotal(
                    Number(nightPrice * Number(e.target.value) * guests + 58)
                  );
                  setDays(Number(e.target.value));
                }}
              />
            </div>
            <div className="guests-input-wrapper reservation-last-child">
              <span>Guests</span>
              <input
                type="number"
                placeholder="How many guests?"
                max={room.guestsLimit}
                min={1}
                onChange={(e) => {
                  console.log(e.target.value);
                  // @ts-ignore
                  setTotal(
                    Number(nightPrice * days * Number(e.target.value) + 58)
                  );
                  setGuests(Number(e.target.value));
                }}
              />
            </div>
          </div>
          <input
            type="submit"
            className="reserve-submit"
            value={alreadyReserved ? "Already Reserved" : "Reserve"}
            disabled={alreadyReserved ? true : false}
          />
          {message && (
            <span className={`reserve-message ${color}`}>{message}</span>
          )}
          <div className="reservation-cost-info">
            <div>
              <span>
                {room.price} x {days} night
              </span>
              {/* @ts-ignore  */}
              {room.price.substring(1) * days}
            </div>
            <div>
              <span>Service Fee</span>
              $58
            </div>
          </div>
          <hr className="break-line" />
          <div className="total-reservation-price">
            <span>Total Price</span>${total}
          </div>
        </form>
      )}
    </>
  );
}
