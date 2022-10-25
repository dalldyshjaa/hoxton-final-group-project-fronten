import { Star } from "../Icons";

export function ReservationForm({ room }: any) {
  return (
    <>
      {room && (
        <form className="reservation-form">
          <div className="reservation-room-info">
            <div>
              <span className="night-price">{room.price}</span>
              <span className="text-night">night</span>
            </div>
            <div>
              <span className="star-icon">
                <Star />
              </span>
              <span className="reserve-review-percentage">{room.review} ·</span>
              <button className="reserve-button">
                <span>${room.reviewsNr} reviews</span>
              </button>
            </div>
          </div>
          <div className="reserve-form-input-unit">
            <div className="days-input-wrapper">
              <span>Days</span>
              <input
                className="days-input"
                type="number"
                placeholder="How many days?"
              />
            </div>
            <div className="guests-input-wrapper reservation-last-child">
              <span>Guests</span>
              <input type="number" placeholder="How many guests?" />
            </div>
          </div>
        </form>
      )}
    </>
  );
}
