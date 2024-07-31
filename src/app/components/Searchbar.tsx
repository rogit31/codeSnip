"use client";

import { getSnipByTitle } from "../actions";
import { useState } from "react";
import Link from 'next/link';

export default function Searchbar() {
    const [input, setInput] = useState('');
    const [snipResults, setSnipResults] = useState([]);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInput(value);

        if (value.length> 1) {
            const results = await getSnipByTitle(value);
            setSnipResults(results);
        } else {
            setSnipResults([]);
        }
    };

    return (
        <>
            <div className="searchBar">
                <label htmlFor="query"></label>
                <div className="inputWrapper">
                    <input 
                        type="text" 
                        autoComplete="off" 
                        name="query"
                        id="query" 
                        placeholder="Search for snips..." 
                        aria-label="Search" 
                        value={input} 
                        onChange={handleInputChange}
                    />
                    <button type="button">
                        <div className="searchIcon"></div>
                    </button>
                </div>
            </div>
            <div className="searchResults">
                {snipResults.map((item: any) => (
                    <div key={item.id} className="searchResult">
                        <Link href={`view-snip/${item.id}`}>
                            {item.title}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
