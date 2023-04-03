import React from "react";

export default function TopButton({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Paris",
    },
    {
      id: 2,
      title: "Tokyo",
    },
    {
      id: 3,
      title: "Delhi",
    },
    {
      id: 4,
      title: "Toronto",
    },
    {
      id: 5,
      title: "London",
    },
  ];

  return (
    <div className=' w-3/4 flex items-center   justify-around  my-1 sm:my-6'>
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => setQuery({ q: city.title })}
          className='text-white  font-medium mx-1  text-sm sm:text-lg  '
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}
