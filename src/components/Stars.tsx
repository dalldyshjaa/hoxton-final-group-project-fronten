import { useState } from "react";
import { FullRatingStar, NonFullRatingStar } from "../Icons";

export function Stars({ count, setCount }: any) {
  return (
    <div className="stars-container">
      <div
        onMouseOver={() => {
          setCount(1);
        }}
      >
        {count > 0 ? <FullRatingStar /> : <NonFullRatingStar />}
      </div>
      <div
        onMouseOver={() => {
          setCount(2);
        }}
      >
        {count > 1 ? <FullRatingStar /> : <NonFullRatingStar />}
      </div>
      <div
        onMouseOver={() => {
          setCount(3);
        }}
      >
        {count > 2 ? <FullRatingStar /> : <NonFullRatingStar />}
      </div>
      <div
        onMouseOver={() => {
          setCount(4);
        }}
      >
        {count > 3 ? <FullRatingStar /> : <NonFullRatingStar />}
      </div>
      <div
        onMouseOver={() => {
          setCount(5);
        }}
      >
        {count > 4 ? <FullRatingStar /> : <NonFullRatingStar />}
      </div>
    </div>
  );
}
