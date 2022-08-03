import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkGetAllItems } from '../../store/items';

const AllItems = () => {
    const items = useSelector(state => Object.values(state.allItems));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllItems())
    }, [dispatch])

    return (
        <>
            {items && items.map(item => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>Price: {item.price} bells</p>
                    <p>{item.description}</p>
                    <Link to={`/items/${item.id}`}>
                        <img src={item.image} alt='Nookazon item' />
                    </Link>
                </div>
            ))}
        </>
    )
}

export default AllItems
