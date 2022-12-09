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
    <div className=' flex items-center space-x-7 justify-center my-6'>
      {cities.map((city) => (
        <button key={city.id} onClick={() => setQuery({ q: city.title })} className='text-white text-lg font-medium '>
          {city.title}
        </button>
      ))}
    </div>
  );
}
