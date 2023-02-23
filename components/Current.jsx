import Image from 'next/image';
import React from 'react';

export default function Current({ currentWeather, userCity }) {
  console.log('LOC', currentWeather.snow?.['1h']);
  console.log('LOC', currentWeather.rain?.['1h']);
  return (
    <div className='h-full p-6  bg-gray-600/30 shadow-inner bg-clip-padding border-2 border-gray-600/70 backdrop-blur-sm border-r-gray-400 border-t-gray-500 rounded-2xl'>
      <div className='flex items-center justify-center text-2xl h-full font-extralight'>
        <div className='grid gap-2 w-full h-full portrait:grid-cols-2 portrait:grid-rows-4 landscape:grid-cols-10 text-gray-100'>
          <div className=' portrait:col-span-2 landscape:order-1 landscape:col-span-3 landscape:row-span-2'>
            <h1 className='text-3xl font-normal mb-4'>
              {userCity.name.length < 12
                ? userCity.name
                : userCity.name.slice(0, 10) + '...'}
              {', '}
              {userCity.country}
            </h1>
            <div className='flex items-center justify-between landscape:flex-col landscape:items-start landscape:gap-2'>
              <h2 className='text-3xl'>3:30 PM</h2>
              <div>
                <h2 className='text-lg text-orange-200'>Sunrise: 3:30 PM</h2>
                <h2 className='text-lg text-orange-600'>Sunset: 3:30 PM</h2>
              </div>
            </div>
          </div>

          <div className=' rounded-md landscape:order-2 landscape:row-span-2 landscape:col-span-4 portrait:col-span-2 portrait:row-span-2'>
            <h1 className='text-3xl font-normal'>
              {currentWeather.weather[0].main}
            </h1>
            <div className='flex justify-start items-center my-5 gap-2'>
              <Image
                src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                height={75}
                width={75}
                alt={currentWeather.weather[0].main}
                className='bg-white/70 rounded-3xl'
              />
              <h1 className='text-6xl '>
                {Math.round(currentWeather.main.temp)}°C
              </h1>
            </div>
            <h2 className='text-xl'>
              Feels like: {Math.round(currentWeather.main.feels_like)}&deg;C
            </h2>
            <h2 className='text-xl capitalize'>
              Currently: {currentWeather.weather[0].description}
            </h2>
          </div>
          <div className='text-lg landscape:order-4  landscape:col-span-3'>
            <h2>Wind: {currentWeather.wind.deg}</h2>
            <h2>Gust: {currentWeather.wind.gust}</h2>
            <h2>Speed: {currentWeather.wind.speed}</h2>
          </div>
          <div className='text-lg landscape:order-5  landscape:col-span-3'>
            <h2>Humidity: {currentWeather.main.humidity}</h2>
            <h2>Pressure: {currentWeather.main.pressure}</h2>
            <h2>Cloud: {currentWeather.clouds.all}%</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
