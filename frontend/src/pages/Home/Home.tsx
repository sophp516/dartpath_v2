import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.tsx";
import "./Home.css";

interface SearchQuery {
    input: string;
    distribs: string[];
    worldCulture: string[];
}

const Home = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<SearchQuery>({
        input: '',
        distribs: [],
        worldCulture: [],
    }); 
    const [distribToggle, setDistribToggle] = useState<boolean>(false);
    const [selectedWorldCulture, setSelectedWorldCulture] = useState<string[]>([]);
    const [selectedDistrib, setSelectedDistrib] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    const Distrib = [
        'ART', 'LIT', 'TMV', 'INT', 'SOC', 'QDS', 'SCI', 'SLA', 'TAS', 'TLA'
    ];

    const WorldCulture = [
        'W', 'NW', 'CL'
    ];

    const handleCheckboxChange = (category: string, value: string) => {
        if (category === 'worldCulture') {
            const updatedSelection = selectedWorldCulture.includes(value)
                ? selectedWorldCulture.filter(req => req !== value)
                : [...selectedWorldCulture, value];

            setSelectedWorldCulture(updatedSelection);
            setSearchQuery(prev => ({
                ...prev,
                worldCulture: updatedSelection,
            }));
        } else {
            const updatedSelection = selectedDistrib.includes(value)
                ? selectedDistrib.filter(req => req !== value)
                : [...selectedDistrib, value];

            setSelectedDistrib(updatedSelection);
            setSearchQuery(prev => ({
                ...prev,
                distribs: updatedSelection,
            }));
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
        setSearchQuery(prev => ({ ...prev, input: event.target.value }));
    };

    const handleSearchClick = async () => {
        console.log("Initiating search with parameters:", searchQuery);

        if (!searchQuery.input && searchQuery.distribs.length === 0 && searchQuery.worldCulture.length === 0) {
            console.warn("No search criteria provided.");
            return;
        }

        try {
            const response = await fetch(`/api/course/search?textQuery=${searchQuery.input}&distribs=${searchQuery.distribs.join(',')}&worldCulture=${searchQuery.worldCulture.join(',')}`);
            
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Received search results:", data);

            navigate(
                '/searchresult', {
                    state: {
                        courseResult: data.courses,
                        profResult: data.professors
                    }
                });

        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearchClick();
        }
    };

    return (
        <div className="home">
            <Navbar />
            <div className="home-main">
                <p>WiCS</p>
                <div className="search-container">
                    {distribToggle ? (
                        <div>
                            <div>
                                {WorldCulture.map(req => (
                                    <label key={req}>
                                        <input
                                            type="checkbox"
                                            checked={selectedWorldCulture.includes(req)}
                                            onChange={() => handleCheckboxChange('worldCulture', req)}
                                        />
                                        {req}
                                    </label>
                                ))}
                            </div>
                            <div>
                                {Distrib.map(req => (
                                    <label key={req}>
                                        <input
                                            type="checkbox"
                                            checked={selectedDistrib.includes(req)}
                                            onChange={() => handleCheckboxChange('distrib', req)}
                                        />
                                        {req}
                                    </label>
                                ))}
                            </div>
                            <button onClick={() => setDistribToggle(false)}>Save</button>
                        </div>
                    ) : (
                        <div onClick={() => setDistribToggle(true)}>
                            {(selectedDistrib.length === 0 && selectedWorldCulture.length === 0) ?
                            <p>Search by distrib</p>
                            : 
                            <div>
                                {selectedWorldCulture.map(req => (
                                    <label key={req}>
                                        <input
                                            type="checkbox"
                                            checked={selectedWorldCulture.includes(req)}
                                            onChange={() => handleCheckboxChange('worldCulture', req)}
                                        />
                                        {req}
                                    </label>))}
                                {selectedDistrib.map(req => (
                                    <label key={req}>
                                        <input
                                            type="checkbox"
                                            checked={selectedDistrib.includes(req)}
                                            onChange={() => handleCheckboxChange('distrib', req)}
                                        />
                                        {req}
                                    </label>))}
                            </div>}
                        </div>
                    )}
                    <div>
                        <input 
                            type="text"
                            onChange={handleSearchChange} 
                            value={input} 
                            placeholder="Search for a class or professor"
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleSearchClick}>Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;