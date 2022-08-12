import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { thunkGetReviews } from '../../store/reviews';
import { thunkDeleteReview } from '../../store/reviews';
import Modal from 'react-modal';
import UpdateReviewForm from '../UpdateReviewForm/UpdateReviewForm';
import './reviews.css'

const Reviews = () => {
    const { itemId } = useParams();
    const reviews = useSelector(state => Object.values(state.reviews));
    const sessionUser = useSelector(state => state.session.user);
    const item = useSelector(state => state.allItems[itemId]);
    console.log("**ITEM", item)

    const [showEditForm, setShowEditForm] = useState(false);
    // let [userReviews, setUserReviews] = useState([]);

    Modal.setAppElement('body');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetReviews(itemId));
    }, [dispatch, itemId]);


    const userReviews = reviews.filter(review => review.user_id === sessionUser.id);
    const ifItem = userReviews.filter(review => review.item_id === item.id);
    console.log(ifItem)


    function openEditModal() {
        setShowEditForm(true)
    }

    function closeEditModal() {
        setShowEditForm(false)
    }

    const styling = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    return (
        <div className='all-reviews'>
            <div className='write-review'>
                <h2>Customer reviews</h2>
                {sessionUser && (
                    <>
                        <h4>Review this product</h4>
                        {!ifItem.length > 0 && (
                            <>
                                <p>Share your thoughts with other customers</p>
                                <Link to={`/create-review/${itemId}`}>
                                    <button id='write-review-btn'>Write a customer review</button>
                                </Link>
                            </>
                        )}
                        {ifItem && ifItem.length > 0 && (
                            <p>You've posted a review!</p>
                        )}
                    </>
                )}
            </div>
            <div id='reviews-content'>
                {reviews && itemId && reviews.map(review => (
                    <div className='review-card' key={review.id}>
                        {review.item_id === parseInt(itemId) && (
                            <div>
                                <div id='review-card-user'>
                                    <img src={review.user.icon} alt='review img'></img>
                                    <p>{review.user.username}</p>
                                </div>
                                <div id='review-card-rating'>
                                    <p>Rating: {review.rating}</p>
                                    <h4>{review.title}</h4>
                                </div>
                                <p>{review.body}</p>
                                {sessionUser && sessionUser.id === review.user_id && (
                                    <>
                                        <button id='delete-review-btn' onClick={() => dispatch(thunkDeleteReview(review.id))}>Delete Review</button>
                                        <button id='edit-review-btn' onClick={openEditModal}>Edit Review</button>
                                        <Modal isOpen={showEditForm} style={styling}>
                                            <UpdateReviewForm review={review} closeEditModal={closeEditModal} />
                                            <button id='modal-btn' onClick={closeEditModal}>Cancel</button>
                                        </Modal>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reviews
