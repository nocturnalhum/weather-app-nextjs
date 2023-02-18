import React from 'react';
import { BsSearch } from 'react-icons/bs';

export default function Search() {
  return (
    <div className='flex justify-center py-6'>
      <form className='max-w-lg border flex  items-center justify-between px-7  rounded-xl'>
        <input
          type='text'
          placeholder='Search for a city'
          className='text-xl bg-transparent border-none text-white focus:outline-none py-2'
        />
        <button>
          <BsSearch size={20} color={'white'} />
        </button>
      </form>
    </div>
  );
}
