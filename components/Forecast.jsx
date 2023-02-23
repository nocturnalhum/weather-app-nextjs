import React from 'react';

export default function Forecast({ forecast }) {
  // console.log('CURR FORECAST', forecast?.city?.country);
  return (
    <div className='h-full p-8  bg-gray-500/20 shadow-inner bg-clip-padding border-2 border-gray-600/70 backdrop-blur-sm border-r-gray-400 border-t-gray-500  rounded-2xl'>
      <div className='flex items-center justify-center text-2xl font-bold h-full text-black'>
        <h1>
          FORECAST: {forecast?.city?.name}, {forecast?.city?.country}
        </h1>
      </div>
    </div>
  );
}
