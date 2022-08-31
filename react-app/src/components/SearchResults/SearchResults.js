import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetSearchResults } from '../../store/search';
import { thunkClearResults } from '../../store/search';

const SearchResults = () => {
    const items = useSelector(state => Object.values(state.searchResults))
    const { itemId } = useParams();
    // console.log("**SEARCHRESULTS", items)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkClearResults(itemId))
        dispatch(thunkGetSearchResults(itemId))
    }, [dispatch, itemId])

    return (
        <div>
            {items && items.map(item => (
                <>
                    <img src={item.image} alt='search item'></img>
                    <p>{item.title}</p>
                    <p>*rating here*</p>
                    <p>{item.price} bells</p>
                </>
            ))}
        </div>
    )
}

export default SearchResults
