import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useDebounce from '@/lib/useDebounce';
import { BsSearch } from 'react-icons/bs';
import Weather from './Weather';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
const BASE_URL = 'http://api.openweathermap.org';

export default function Search() {
  const [query, setQuery] = useState('');
  const [queryList, setQueryList] = useState([]);
  const [coord, setCoord] = useState({ lat: null, lon: null });

  // Delay query value update while user inputs value to reduce number of API fetches:
  const debounceSearch = useDebounce(query, 500);

  // Get possible city locations according to query input:
  useEffect(() => {
    const getLocations = async () => {
      if (query < 1) {
        setQueryList([]);
      } else {
        try {
          const { data } = await axios.get(
            `${BASE_URL}/geo/1.0/direct?q=${debounceSearch}&limit=5&appid=${API_KEY}`
          );
          // console.log('Cities', data);
          setQueryList(data);
        } catch (error) {
          console.log(`${error.name}[${error.code}]: ${error.message}`);
        }
      }
    };
    getLocations();
  }, [debounceSearch]);

  // Select correct city and pass geo coordinates to retrieve Weather data:
  const selectCity = (city) => {
    setCoord({ lat: city.lat, lon: city.lon });
    setQuery('');
  };

  return (
    <div className='flex flex-col container m-auto py-6 relative z-10 max-w-lg'>
      <form className='border flex  items-center justify-between px-4 rounded-xl'>
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
                  {item.name}, {item.state ? item.state + ',' : ''}{' '}
                  {item.country}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {coord.lat === null ? '' : <Weather coord={coord} />}
    </div>
  );
}
