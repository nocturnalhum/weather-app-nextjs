import getCardinalDirection from '@/lib/getCardinalDirection';
import getTime from '@/lib/getTime';
import Image from 'next/image';
import React from 'react';

export default function Current({ currentWeather, userCity }) {
  // console.log('LOC', currentWeather.snow?.['1h']);
  // console.log('LOC', currentWeather.rain?.['1h']);

  return (
    <div className='h-full p-5 bg-gray-600/30 shadow-inner bg-clip-padding border-2 border-gray-600/70 backdrop-blur-sm border-r-gray-400 border-t-gray-500 rounded-2xl'>
      <div className='flex items-center justify-center text-2xl h-full font-extralight'>
        <div className='grid gap-2 w-full h-full portrait:grid-cols-2 portrait:grid-rows-8 landscape:grid-cols-8 text-gray-100'>
          <div className=' portrait:col-span-2 portrait:row-span-3 landscape:order-1 landscape:col-span-3 landscape:row-span-2  bg-fuchsia-700'>
            <div className='text-3xl font-normal mb-4'>
              {userCity.name.length < 20
                ? userCity.name
                : userCity.name.slice(0, 20) + '...'}
              {', '}
              {userCity.country}
            </div>
            <div className='flex items-center justify-between landscape:flex-col landscape:items-start landscape:gap-2'>
              <h2 className='text-3xl'>{getTime(0, currentWeather)}</h2>
              <div>
                <h2 className='text-lg text-orange-200'>
                  Sunrise: {getTime(currentWeather.sys.sunrise, currentWeather)}
                </h2>
                <h2 className='text-lg text-orange-600'>
                  Sunset: {getTime(currentWeather.sys.sunset, currentWeather)}
                </h2>
              </div>
            </div>
          </div>

          <div className=' rounded-md landscape:order-2 landscape:row-span-2 landscape:col-span-3 portrait:col-span-2 portrait:row-span-3  bg-fuchsia-700'>
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
              Currently: {currentWeather.weather[0].description}{' '}
              {currentWeather.rain && currentWeather.rain?.['1h'] + 'mm/h'}{' '}
              {currentWeather.snow && currentWeather.snow?.['1h'] + 'mm/h'}
            </h2>
          </div>

          <div className=' text-lg landscape:order-4  landscape:col-span-2 bg-fuchsia-700'>
            <h2>Wind: {getCardinalDirection(currentWeather.wind.deg)}</h2>
            {currentWeather.wind.gust && (
              <h2>Gust: {currentWeather.wind.gust.toFixed(1)} m/s</h2>
            )}
            <h2>Speed: {currentWeather.wind.speed.toFixed(1)}m/s</h2>
          </div>
          <div className=' text-base landscape:order-5  landscape:col-span-2  bg-fuchsia-700'>
            <h2>Humidity: {currentWeather.main.humidity}%</h2>
            <h2>Pressure: {currentWeather.main.pressure}hPa</h2>
            <h2>Cloud: {currentWeather.clouds.all}%</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
