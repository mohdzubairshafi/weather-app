import React from "react";
import { formatToLocalTime } from "../Services/Weather";

export default function TimeAndLocation({ weather: { name, country, dt, timezone } }) {
  return (
    <div className=' w-3/4 px-1'>
      <div className='  flex items-center justify-center my-1 sm:my-3'>
        <p className='text-white text-[13px]  sm:text-lg font-light'>{formatToLocalTime(dt, timezone)}</p>
      </div>
      <div className='flex items-center justify-center my-1'>
        <p className='text-white text-sm sm:text-xl font-medium'>
          {name} , {country}
        </p>
      </div>
    </div>
  );
}
