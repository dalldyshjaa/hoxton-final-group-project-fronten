import { useState } from "react";
import { FullRatingStar, NonFullRatingStar } from "../Icons";

export function RatingStars({ count }: any) {
  return (
    <div className="stars-container">
      <div>{count > 0 ? <FullRatingStar /> : <NonFullRatingStar />}</div>
      <div>{count > 1 ? <FullRatingStar /> : <NonFullRatingStar />}</div>
      <div>{count > 2 ? <FullRatingStar /> : <NonFullRatingStar />}</div>
      <div>{count > 3 ? <FullRatingStar /> : <NonFullRatingStar />}</div>
      <div>{count > 4 ? <FullRatingStar /> : <NonFullRatingStar />}</div>
    </div>
  );
}
