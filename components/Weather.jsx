import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Current from './Current';
import Forecast from './Forecast';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
const BASE_URL = 'https://api.openweathermap.org';

export default function Weather({ coords }) {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const getWeather = async () => {
      const { data: current } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=43.6534817&lon=-79.3839347&units=metric&appid=${API_KEY}`
      );
      console.log('CURRENT', current);
      setData(current);
    };
    getWeather();
  }, []);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className='top-16 flex flex-col justify-center items-center w-full'>
      <div className='mt-4 flex flex-col h-[80vh] w-[80vw] items-start justify-center rounded-2xl perspective group'>
        <button className=' text-white text-md' onClick={handleToggle}>
          {!toggle ? 'Forecast' : 'Currently'}
        </button>
        <div
          className={`relative w-full h-full duration-1000 preserver-3d backface-hidden ${
            toggle ? 'rotate-y-180' : ''
          }`}
        >
          <div className='absolute w-full h-full'>
            <Current current={data} />
          </div>
          <div className='absolute w-full h-full rotate-y-180 backface-hidden'>
            <Forecast />
          </div>
        </div>
      </div>
    </div>
  );
}
