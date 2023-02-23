import getCardinalDirection from '@/lib/getCardinalDirection';
import getTime from '@/lib/getTime';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function Current({ currentWeather, userCity }) {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    if (window.screen.orientation.angle === 0) {
      setIsPortrait(true);
    } else {
      setIsPortrait(false);
    }
  }, [window.screen.orientation.angle]);

  const { name, country } = userCity;
  const { clouds, main, sys, timezone, visibility, weather, wind } =
    currentWeather;
  const { feel_like, grnd_level, humidity, pressure, sea_level, temp } = main;
  const { sunrise, sunset } = sys;
  const { description, icon, main: mainWeather } = weather[0];
  const { deg, gust, speed } = wind;
  console.log('WINDOW', window.screen.orientation.angle);

  const background = 'bg-fuchsia-500/0';
  return (
    <div className='h-full p-5 bg-gray-600/30 shadow-inner bg-clip-padding border-2 border-gray-600/70 backdrop-blur-sm border-r-gray-400 border-t-gray-500 rounded-2xl'>
      <div className='flex items-center justify-center text-2xl h-full font-extralight'>
        <div className='grid gap-2 landscape:grid-cols-10 landscape:grid-rows-5 w-full h-full text-gray-100 portrait:grid-rows-7  portrait:grid-cols-7'>
          {/* **************************************************************************************** */}
          <div
            className={`${background} row-span-1 col-span-10 portrait:row-span-1 portrait:col-span-7`}
          >
            <div className='text-3xl font-normal mb-4'>
              {isPortrait
                ? `${name.slice(0, 15) + '...'},  ${country}`
                : `${name},  ${country}`}
            </div>
          </div>
          {/* **************************************************************************************** */}
          <div
            className={`${background} landscape:row-span-4 landscape:col-span-3 portrait:row-span-2 portrait:col-span-7`}
          >
            {' '}
            <div className='flex justify-between flex-col items-start'>
              <h2 className='text-4xl'>{getTime(0, currentWeather)}</h2>
              <div>
                <h2 className='text-lg text-orange-200'>
                  Sunrise: {getTime(sunrise, currentWeather)}
                </h2>
                <h2 className='text-lg text-orange-600'>
                  Sunset: {getTime(sunset, currentWeather)}
                </h2>
              </div>
            </div>
          </div>
          {/* **************************************************************************************** */}
          <div
            className={`${background} landscape:row-span-4 landscape:col-span-4 portrait:row-span-3  portrait:col-span-7`}
          >
            {' '}
            <h1 className='text-3xl font-normal'>
              {currentWeather.weather[0].main}
            </h1>
            <div className='flex justify-start items-center gap-2'>
              <Image
                src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                height={50}
                width={50}
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
          {/* **************************************************************************************** */}
          <div
            className={`${background} landscape:row-span-2 landscape:col-span-3 text-lg portrait:row-span-2 portrait:col-span-3`}
          >
            <h2>Wind: {getCardinalDirection(currentWeather.wind.deg)}</h2>
            {currentWeather.wind.gust && (
              <h2>Gust: {currentWeather.wind.gust.toFixed(1)} m/s</h2>
            )}
            <h2>Speed: {currentWeather.wind.speed.toFixed(1)}m/s</h2>
          </div>
          {/* **************************************************************************************** */}
          <div
            className={`${background} landscape:row-span-2 landscape:col-span-3 text-lg portrait:row-span-2 portrait:col-span-4`}
          >
            <h2>Humidity: {currentWeather.main.humidity}%</h2>
            <h2>Pressure: {currentWeather.main.pressure}hPa</h2>
            <h2>Cloud: {currentWeather.clouds.all}%</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
