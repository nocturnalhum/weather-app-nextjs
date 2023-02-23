import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Current from './Current';
import Forecast from './Forecast';

export default function Weather({ userCity, currentWeather, forecast }) {
  const [toggle, setToggle] = useState(false);
  // console.log('CURR WEATHER', currentWeather);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className='top-16 flex flex-col justify-center items-center w-full'>
      <div className='mt-4 flex flex-col h-[80vh] w-[90vw] items-start justify-center rounded-2xl perspective group'>
        <button className='text-white text-md pl-5' onClick={handleToggle}>
          {!toggle ? 'Forecast' : 'Currently'}
        </button>
        <div
          className={`relative w-full h-full duration-1000 ease-out preserver-3d  ${
            toggle ? 'rotate-y-180' : ''
          }`}
        >
          <div
            className={`absolute w-full h-full duration-300 ${
              toggle ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Current currentWeather={currentWeather} userCity={userCity} />
          </div>
          <div
            className={`absolute w-full h-full rotate-y-180  duration-300 ${
              toggle ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Forecast forecast={forecast} />
          </div>
        </div>
      </div>
    </div>
  );
}
