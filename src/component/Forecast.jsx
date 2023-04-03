import React from "react";
import { iconeUrlFromCode } from "../Services/Weather";

export default function Forecast({ title, data }) {
  return (
    <div className='w-3/4'>
      <div className='  flex items-center justify-start mt-3'>
        <p className='text-white font-medium uppercase'>{title}</p>
      </div>
      <hr className='my-1' />
      <div className=' flex items-center flex-row justify-between text-white  overflow-auto'>
        {data.map((d) => (
          <div key={d.title} className=' flex flex-col items-center justify-center '>
            <p className='font-light text-xs'> {d.title}</p>
            <img src={iconeUrlFromCode(d.icon)} alt='W' className='w-14 my-0' />
            <p className='font-medium'>{d.temp.toFixed()}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
