import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { thunkGetReviews } from '../../store/reviews';
import { thunkDeleteReview } from '../../store/reviews';
import './reviews.css'

const Reviews = () => {
    const { itemId } = useParams();
    const reviews = useSelector(state => Object.values(state.reviews));
    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetReviews(itemId))
    }, [dispatch, itemId]);

    // const handleDelete = () => {

    // }

    return (
        <div className='all-reviews'>
            <div className='write-review'>
                <h4>Review this product</h4>
                <p>Share your thoughts with other customers</p>
                <Link to={`/create-review/${itemId}`}>
                    <button>Write a customer review</button>
                </Link>
            </div>
            {reviews && itemId && reviews.map(review => (
                <div className='review-card' key={review.id}>
                    {review.item_id === parseInt(itemId) && (
                        <div>
                            <img src={review.user.icon} alt='review img'></img>
                            <p>{review.user.username}</p>
                            <p>{review.rating}</p>
                            <h4>{review.title}</h4>
                            <p>{review.body}</p>
                            {sessionUser && sessionUser.id === review.user_id && (
                                <button onClick={() => dispatch(thunkDeleteReview(review.id))}>Delete Review</button>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Reviews
