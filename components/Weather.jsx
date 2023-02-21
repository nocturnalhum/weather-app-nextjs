import React, { useState } from 'react';
import Current from './Current';
import Forecast from './Forecast';

export default function Weather({ coords }) {
  const [toggle, setToggle] = useState(false);
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
            <Current />
          </div>
          <div className='absolute w-full h-full rotate-y-180 backface-hidden'>
            <Forecast />
          </div>
        </div>
      </div>
    </div>
  );
}
