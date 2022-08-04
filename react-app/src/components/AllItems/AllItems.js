import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkGetAllItems } from '../../store/items';
import './allitems.css'

const AllItems = () => {
    const items = useSelector(state => Object.values(state.allItems));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllItems())
    }, [dispatch])

    return (
        <>
            {items && items.map(item => (
                <div className='item-card' key={item.id}>
                    <Link to={`/items/${item.id}`}>
                        <img src={item.image} alt='Nookazon item' />
                    </Link>
                    <p>{item.title}</p>
                    <p>{item.price} bells</p>
                </div>
            ))}
        </>
    )
}

export default AllItems
