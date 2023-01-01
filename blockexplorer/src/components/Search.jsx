import React, { useState } from "react";
import { joinClasses } from "../helper";

const Search = ({ handleSearch, placeholder, name }) => {
    const [inputValue, setInputValue] = useState();
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };
    return (
        <div className="text-center my-10">
            <input
                type="text"
                className={joinClasses(
                    "w-1/2",
                    "p-3",
                    "rounded",
                    "bg-gray-200",
                    "focus:outline-blue-500"
                )}
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
            />
            <button
                className={joinClasses(
                    "bg-blue-400",
                    "text-white",
                    "rounded-md",
                    "z-10",
                    "-ml-5",
                    "p-3"
                )}
                onClick={() => handleSearch(inputValue)}
            >
                Search
            </button>
        </div>
    );
};

export default Search;
