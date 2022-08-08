import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkGetAllItems } from '../../store/items';
import Footer from '../Footer/Footer';
import './allitems.css'

const AllItems = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllItems())
    }, [dispatch])

    const items = useSelector(state => Object.values(state.allItems));

    return (
        <div>
            <div className='all-items'>
                {items && items.map(item => (
                    <div className='item-card' key={item.id}>
                        <Link to={`/items/${item.id}`}>
                            <img src={item.image} alt='Nookazon item' />
                        </Link>
                        <p>{item.title}</p>
                        <p>{item.price} bells</p>
                    </div>
                ))}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default AllItems
