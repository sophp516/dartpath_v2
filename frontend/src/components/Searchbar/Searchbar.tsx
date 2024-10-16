import React, { useState } from "react";

const Searchbar = () => {
    const [input, setInput] = useState<string>('');
    const [results, setResults] = useState<string[]>();

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);

        const response: string[] = []
        setResults(response)
    }

    return (
        <>
            <input 
                type="text"
                onChange={handleSearchChange} 
                value={input} 
                placeholder="Search for a class or professor"
                />
        </>
    )
}

export default Searchbar;
