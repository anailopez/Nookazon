import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { thunkGetAllItems } from "../../store/items";
import { thunkGetSearchResults } from "../../store/search";
import './searchbar.css';

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [thunkSearchResult, setThunkSearchResult] = useState([]);

    const dispatch = useDispatch();

    const items = useSelector(state => Object.values(state.allItems));
    // console.log(searchResult.length);

    useEffect(() => {
        dispatch(thunkGetAllItems())
    }, [dispatch]);


    const handleSearch = (e) => {
        setSearchInput(e.target.value);

        const filterResult = items.filter(item => {
            return item.title.toLowerCase().includes(searchInput.toLowerCase());
        })

        if (filterResult) {
            setSearchResult(filterResult)
        }

    }

    const clearSearch = () => {
        setSearchInput('')
        setSearchResult([])
    }

    const handleBackendSearch = async (input) => {
        const results = await dispatch(thunkGetSearchResults(input))
        console.log(results)

        // if (results) {
        //     setThunkSearchResult(results);
        //     console.log(thunkSearchResult)
        // }
    }

    return (
        <div className="searchbar">
            <div className="search-input">
                <input type='text' value={searchInput} onChange={handleSearch} id='search-input-area' />
                <button id='search-btn' onClick={() => handleBackendSearch(searchInput)}><i className="fa-solid fa-magnifying-glass" /></button>
            </div>
            {searchInput && searchResult.length > 0 && (
                <div className="search-result">
                    {searchResult.slice(0, 5).map(item => {
                        return (
                            <Link to={`/items/${item.id}`} onClick={clearSearch} id='result-link'>
                                <p id='result-p'>{item.title}</p>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar;
