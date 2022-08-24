import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { thunkGetAllItems } from "../../store/items";

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const dispatch = useDispatch();

    const items = useSelector(state => Object.values(state.allItems));
    console.log(searchResult.length);

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

    return (
        <div className="searchbar">
            <div className="search-input">
                <input type='text' value={searchInput} onChange={handleSearch} />
                <button><i className="fa-solid fa-magnifying-glass" /></button>
            </div>
            {searchInput && searchResult.length > 0 && (
                <div className="search-result">
                    {searchResult.slice(0, 5).map(item => {
                        return (
                            <Link to={`/items/${item.id}`} onClick={clearSearch}>
                                <p>{item.title}</p>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar;
