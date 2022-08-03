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
            dispatch(thunkGetOneItem(item))
        }
    }, [dispatch])

    return (
        <>
            {item && (
                <div>
                    <h1>{item.title}</h1>
                    <p>{item.price}</p>
                    <p>{item.description}</p>
                    <img src={item.image}></img>
                </div>
            )}
        </>
    )
}

export default SingleItem
