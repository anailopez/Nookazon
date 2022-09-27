import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkGetAllItems } from '../../store/items';
import { thunkGetCartProducts } from '../../store/cart';
import { thunkGetAllOrders } from '../../store/orders';
import Footer from '../Footer/Footer';
import banner from '../../images/banner.png';
import './allitems.css'

const AllItems = () => {
    const userId = useSelector(state => state.session?.user?.id)
    let savedCart = null;

    if (userId) {
        savedCart = localStorage.getItem(userId);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllItems())
        dispatch(thunkGetCartProducts(savedCart))
        if (userId) {
            dispatch(thunkGetAllOrders(userId));
        }
    }, [dispatch, userId])

    const items = useSelector(state => Object.values(state.allItems));

    return (
        <div className='all-items-body'>
            <img id='banner' src={banner}></img>
            <div className='all-items'>
                {items && items.map(item => (
                    <div className='item-card' key={item.id}>
                        <div id='item-img'>
                            <Link to={`/items/${item.id}`}>
                                <img src={item.image} alt='Nookazon item' />
                            </Link>
                        </div>
                        <div id='item-info'>
                            <Link to={`/items/${item.id}`}>
                                <h4>{item.title}</h4>
                            </Link>
                            <p>{item.price} bells</p>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default AllItems
