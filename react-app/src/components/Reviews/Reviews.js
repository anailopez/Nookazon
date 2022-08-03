import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetReviews } from '../../store/reviews';
import './reviews.css'

const Reviews = () => {
    const { itemId } = useParams();
    const reviews = useSelector(state => Object.values(state.reviews));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetReviews(itemId))
    }, [dispatch, itemId])

    return (
        <>
            {reviews && itemId && reviews.map(review => (
                <div className='review-card' key={review.id}>
                    {review.item_id === parseInt(itemId) && (
                        <div>
                            <img src={review.user.icon}></img>
                            <p>{review.user.username}</p>
                            <p>{review.rating}</p>
                            <p>{review.body}</p>
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}

export default Reviews
