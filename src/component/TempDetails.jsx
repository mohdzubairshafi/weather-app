import React from "react";
import { BsThermometerHigh } from "react-icons/bs";
import { FiDroplet } from "react-icons/fi";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { FaWind } from "react-icons/fa";
import { FiSun, FiSunset } from "react-icons/fi";
import { formatToLocalTime, iconeUrlFromCode } from "../Services/Weather";

export default function TempDetails({
  weather: { details, speed, humidity, icon, sunrise, timezone, sunset, feels_like, temp, temp_max, temp_min },
}) {
  return (
    <div>
      <div className='flex items-center justify-center py-1 text-md text-cyan-300 '>
        <p>{details} </p>
      </div>
      <div className='flex flex-row items-center  justify-around text-white py-1 px-4'>
        <img src={iconeUrlFromCode(icon)} alt='WeatherImage' className=' w-20' />
        <p className='text-3xl'>{temp.toFixed()}°</p>

        <div className=' flex flex-col space-y-1 '>
          <div className=' flex font-light text-xs items-center justify-center'>
            <BsThermometerHigh size={18} className='mr-1' /> Real fell:{" "}
            <span className='font-medium ml-1'> {feels_like}°</span>
          </div>
          <div className=' flex font-light text-xs items-center justify-center'>
            <FiDroplet size={18} className='mr-1' />
            Humidity: <span className='font-medium ml-1'> {humidity}%</span>
          </div>
          <div className=' flex font-light text-xs items-center justify-center'>
            <FaWind size={18} className='mr-1' /> Wind: <span className='font-medium ml-1'> {speed}m/s</span>
          </div>
        </div>
      </div>
      <div className=' flex justify-center items-center text-white space-x-2 text-xs py-1'>
        <FiSun />
        <p className='font-light '>
          Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
        </p>
        <p className='font-light'>|</p>
        <FiSunset size={15} />
        <p className='font-light '>
          Set: <span className='font-medium ml-1'> {formatToLocalTime(sunset, timezone, "hh:mm a")}</span>
        </p>
        <p className='font-light'>|</p>
        <AiOutlineArrowUp size={17} />
        <p className='font-light '>
          High: <span className='font-medium ml-1'>{temp_max.toFixed()}°</span>
        </p>
        <p className='font-light'>|</p>
        <AiOutlineArrowDown size={17} />
        <p className='font-light '>
          Low: <span className='font-medium ml-1'> {temp_min.toFixed()}°</span>
        </p>
      </div>
    </div>
  );
}
