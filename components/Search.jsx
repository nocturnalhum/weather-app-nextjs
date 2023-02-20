import useDebounce from '@/lib/useDebounce';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

export default function Search() {
  const [city, setCity] = useState('');
  const [queryList, setQueryList] = useState([]);

  const debounceCitySearch = useDebounce(city, 500);

  useEffect(() => {
    const getCites = async () => {
      if (city < 1) {
        setQueryList([]);
      } else {
        console.log('FETCHING');
        const { data } = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${debounceCitySearch}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        console.log('Cities', data);
        setQueryList(data);
      }
    };
    getCites();
  }, [debounceCitySearch]);

  return (
    <div className='flex flex-col container m-auto justify-center py-6 relative z-50 max-w-lg'>
      <form className=' border flex  items-center justify-between px-6  rounded-xl'>
        <input
          onChange={(e) => setCity(e.target.value)}
          type='text'
          placeholder='Search for a city'
          className='w-full text-xl bg-transparent border-none text-white focus:outline-none py-2'
        />
        <button>
          <BsSearch size={20} color={'white'} />
        </button>
      </form>
      {city && (
        <div className='mt-3 px-6 shadow-gray-300/10 shadow-xl bg-gray-600/40 backdrop-blur-sm rounded-xl'>
          <ul className='text-gray-100 text-xl divide-solid divide-y divide-gray-200/20'>
            {queryList.map((city, index) => {
              return (
                <li key={index} className='py-3'>
                  {city.name}, {city.state ? city.state + ',' : ''}{' '}
                  {city.country}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
