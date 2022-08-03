import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetOneItem } from '../../store/items';

const SingleItem = () => {
    const { itemId } = useParams();
    const item = useSelector(state => state.allItems[itemId]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (item) {
            dispatch(thunkGetOneItem(item.id))
        }
    }, [dispatch])

    return (
        <>
            {item && (
                <div>
                    <h1>{item.title}</h1>
                    <h2>{item.price} bells</h2>
                    <h3>About this item</h3>
                    <p>{item.description}</p>
                    <img src={item.image}></img>
                </div>
            )}
            <div>
                <h2>Reviews</h2>
            </div>
        </>
    )
}

export default SingleItem
