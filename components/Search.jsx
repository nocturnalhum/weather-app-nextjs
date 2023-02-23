import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useDebounce from '@/lib/useDebounce';
import { BsSearch } from 'react-icons/bs';
import Weather from './Weather';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
const BASE_URL = 'https://api.openweathermap.org';

export default function Search() {
  const [query, setQuery] = useState('');
  const [queryList, setQueryList] = useState([]);
  const [showWeather, setShowWeather] = useState(false);
  const [userCity, setUserCity] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState({});

  // Delay query value update while user inputs value to reduce number of API fetches:
  const debounceSearch = useDebounce(query, 500);

  // Get possible city locations according to query input:
  useEffect(() => {
    const getLocations = async () => {
      if (query < 1) {
        setQueryList([]);
      } else {
        setShowWeather(false);
        try {
          const { data } = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${debounceSearch}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
          );
          // console.log('Cities', data);
          setQueryList(data);
        } catch (error) {
          console.log(`${error?.name}[${error?.code}]: ${error?.message}`);
        }
      }
    };
    getLocations();
  }, [debounceSearch]);

  // Select correct city and pass geo coordinates to retrieve Weather data:
  const selectCity = async (item) => {
    const { lat, lon } = item;
    const { data: current } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${item?.lat}&lon=${item?.lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    );
    const { data: fcast } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${item?.lat}&lon=${item?.lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    );
    setCurrentWeather(current);
    setForecast(fcast);
    setUserCity(item);
    setShowWeather(true);
    setQuery('');
  };

  return (
    <div className='flex flex-col container m-auto py-6 relative z-10 max-w-lg'>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='border flex  items-center justify-between px-4 rounded-xl'
      >
        <input
          onChange={(e) => setQuery(e.target.value)}
          type='text'
          value={query}
          placeholder='Search for a city'
          className='w-full text-xl bg-transparent border-none text-white focus:outline-none py-2'
        />
        <button>
          <BsSearch size={20} color={'white'} />
        </button>
      </form>
      {query && (
        <div className='mt-3 px-0 shadow-gray-300/10 shadow-xl bg-gray-600/40 backdrop-blur-sm rounded-xl'>
          <ul className='text-gray-100 text-xl divide-solid divide-y divide-gray-200/20'>
            {queryList.map((item, index) => {
              return (
                <li
                  onClick={() => selectCity(item)}
                  key={index}
                  className='py-3 cursor-pointer hover:bg-gray-200/20 px-8 rounded-xl'
                >
                  {item?.name}, {item?.state ? item.state + ',' : ''}{' '}
                  {item?.country}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {showWeather && (
        <Weather
          currentWeather={currentWeather}
          forecast={forecast}
          userCity={userCity}
        />
      )}
    </div>
  );
}
