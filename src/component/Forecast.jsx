import React from "react";
import { iconeUrlFromCode } from "../Services/Weather";

export default function ({ title, data }) {
  return (
    <div>
      <div className='flex items-center justify-start mt-6'>
        <p className='text-white font-medium uppercase'>{title}</p>
      </div>
      <hr className='my-2' />
      <div className='flex items-center flex-row justify-between text-white'>
        {data.map((d) => (
          <div key={d.title} className=' flex flex-col items-center justify-center '>
            <p className='font-light text-sm'> {d.title}</p>
            <img src={iconeUrlFromCode(d.icon)} alt='W' className='w-12 my-1' />
            <p className='font-medium'>{d.temp.toFixed()}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
