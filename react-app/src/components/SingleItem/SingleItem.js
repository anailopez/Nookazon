import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetOneItem } from '../../store/items';
import { thunkGetReviews } from '../../store/reviews';
import Reviews from '../Reviews/Reviews';
import './singleitem.css'

const SingleItem = () => {
    const { itemId } = useParams();
    const item = useSelector(state => state.allItems[itemId]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (itemId) {
            dispatch(thunkGetOneItem(itemId))
            dispatch(thunkGetReviews(itemId))
        }
    }, [dispatch, itemId])

    return (
        <>
            {item && (
                <div className='single-item-display'>
                    <h1>{item.title}</h1>
                    <h2>{item.price} bells</h2>
                    <h3>About this item</h3>
                    <p>{item.description}</p>
                    <img src={item.image} alt='item img'></img>
                </div>
            )}
            <div>
                <h2>Reviews</h2>
                <Reviews />
            </div>
        </>
    )
}

export default SingleItem
