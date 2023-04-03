import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { toast } from "react-toastify";
export default function Input({ setQuery, setUnits }) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }
  function clearInput() {
    setValue("");
  }
  function getdata() {
    clearInput();
    if (value !== "") setQuery({ q: value });
  }
  function handelLocationClick() {
    clearInput();
    if (navigator.geolocation) {
      toast.info("fetching user locating... ");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched. ");

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({ lat: lat, lon: lon });
      });
    }
  }
  return (
    <div className='flex flex-row  justify-center my-6'>
      <div className=' flex flex-row w-11/12 items-center justify-end space-x-4 '>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getdata();
          }}
        >
          <input
            onChange={handleChange}
            type='text'
            className=' text-lg font-light p-1 w-full shadow-xl focus:outline-none  placeholder:lowercase
          capitalize '
            name='location'
            placeholder='Search for city...'
            value={value}
          />
        </form>

        <BsSearch
          size={20}
          onClick={() => {
            getdata();
          }}
          className=' text- text-white cursor-pointer transition ease-out hover:scale-125'
        />
        <HiOutlineLocationMarker
          onClick={handelLocationClick}
          size={25}
          className=' text-white cursor-pointer transition ease-out hover:scale-125'
        />
      </div>
      <div className=' flex flex-row w-1/4 items-center justify-center'>
        <button
          name='metric'
          onClick={() => {
            setUnits("metric");
          }}
          className=' text-lg text-white font-light transition ease-out hover:scale-125'
        >
          °C
        </button>
        <p className='text-lg text-white mx-2'>|</p>
        <button
          name='imperial'
          onClick={() => {
            setUnits("imperial");
          }}
          className=' text-lg text-white font-light  transition ease-out hover:scale-125'
        >
          °F
        </button>
      </div>
    </div>
  );
}
