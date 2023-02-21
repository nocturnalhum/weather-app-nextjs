import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Current from './Current';
import Forecast from './Forecast';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
const BASE_URL = 'https://api.openweathermap.org';

export default function Weather({ coord }) {
  const [toggle, setToggle] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  const { lat, lon } = coord;

  useEffect(() => {
    const getWeather = async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=43.6534817&lon=-79.3839347&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
      );
      console.log('CURRENT', data.name);
      setWeatherData(data);
    };
    getWeather();
  }, [lat, lon]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className='top-16 flex flex-col justify-center items-center w-full'>
      <div className='mt-4 flex flex-col h-[80vh] w-[90vw] items-start justify-center rounded-2xl perspective group'>
        <button
          className=' text-white text-md pl-5'
          onClick={(prev) => setToggle(!prev)}
        >
          {!toggle ? 'Forecast' : 'Currently'}
        </button>
        <div
          className={`relative w-full h-full duration-1000 preserver-3d backface-hidden ${
            toggle ? 'rotate-y-180' : ''
          }`}
        >
          <div className='absolute w-full h-full'>
            <Current current={weatherData} />
          </div>
          <div className='absolute w-full h-full rotate-y-180 backface-hidden'>
            <Forecast />
          </div>
        </div>
      </div>
    </div>
  );
}
