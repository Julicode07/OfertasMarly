import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SearchInput = ({ searchTerm, setSearchTerm }) => {
    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState(searchTerm);

    const handleSearchChange = (products) => {
        const value = products.target.value;
        setInputValue(value);
        setSearchTerm(value);
    };

    const handleClearInput = () => {
        setInputValue('');
        setSearchTerm('');
        setFocused(false);
    };

    return (
        <div className="relative flex w-full pl-2 py-2 rounded-md bg-gray-50 border border-gray-200 focus-within:bg-white group">
            <AnimatePresence>
                {!focused && !inputValue && (
                    <motion.div
                        className="flex justify-center items-center absolute left-2 ri-search-line text-blue-600 w-5 h-5"
                        initial={{ rotate: 125 }}
                        animate={{ rotate: 0 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {focused && (
                    <motion.div
                        className="flex justify-center items-center absolute left-2 ri-arrow-left-line text-blue-500 w-5 h-5 cursor-pointer text-xl"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        onClick={handleClearInput}
                    />
                )}
            </AnimatePresence>

            <input
                type="text"
                placeholder="Buscar..."
                value={inputValue}
                className="relative text-sm font-semibold focus:border-none focus:outline-none bg-transparent w-5/6 pl-8 placeholder-gray-400 pt-[0.5px]"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={handleSearchChange}
            />

            <AnimatePresence>
                {inputValue && (
                    <motion.div
                        className="flex justify-center items-center absolute right-2 ri-close-line text-gray-400 w-6 h-6 cursor-pointer text-xl pb-[3px]"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        onClick={handleClearInput}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchInput;
