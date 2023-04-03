import React from "react";
import { formatToLocalTime } from "../Services/Weather";

export default function TimeAndLocation({ weather: { name, country, dt, timezone } }) {
  return (
    <div>
      <div className='flex items-center justify-center my-3'>
        <p className='text-white text-lg font-extralight'>{formatToLocalTime(dt, timezone)}</p>
      </div>
      <div className='flex items-center justify-center my-1'>
        <p className='text-white text-xl font-medium'>
          {name} , {country}
        </p>
      </div>
    </div>
  );
}
