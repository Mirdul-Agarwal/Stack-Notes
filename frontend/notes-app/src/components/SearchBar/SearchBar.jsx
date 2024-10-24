import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className='w-70 flex items-center bg-slate-100 rounded-md relative'>
        <input 
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none border-b-2 border-transparent focus:border-green-500 pl-12 pr-10"
        value={value}
        onChange={onChange}
         />

         {value && (
            <IoMdClose 
            className="absolute right-10 text-xl text-slate-500 cursor-pointer hover:text-black"
            onClick={onClearSearch} 
            />
            )
        }

         <FaMagnifyingGlass className="absolute left-4 text-slate-400 cursor-pointer hover:text-black" onClick={handleSearch} />
    </div>
  )
}

export default SearchBar;
