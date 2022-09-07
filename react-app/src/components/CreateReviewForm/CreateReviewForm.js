import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { thunkCreateReview, thunkGetReviews } from "../../store/reviews";
import { thunkGetOneItem } from "../../store/items";
import './createreview.css';
import Rating from '@mui/material/Rating';

const CreateReviewForm = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { itemId } = useParams();
    const item = useSelector(state => state.allItems[itemId]);
    const history = useHistory();

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [rating, setRating] = useState(1);
    const [validationErrors, setValidationErrors] = useState([]);
    const [backendErrors, setBackendErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const reviews = useSelector(state => Object.values(state.reviews));
    const reviewExists = reviews.find(review => review.user_id === sessionUser?.id);
    console.log(reviewExists)

    useEffect(() => {
        dispatch(thunkGetOneItem(itemId));
        dispatch(thunkGetReviews(itemId));
    }, [dispatch, itemId]);

    useEffect(() => {
        const errors = [];

        if (title && body) {

            if (!title.replace(/\s+/g, '').length) {
                errors.push('Please provide a headline for this review')
            }
            if (!body.replace(/\s+/g, '').length) {
                errors.push('Please provide a written review')
            }

            if (title.replace(/\s+/g, '').length > 200) {
                errors.push("Headline cannot exceed 200 characters")
            }
            if (body.replace(/\s+/g, '').length > 500) {
                errors.push("Written review cannot exceed 500 characters")
            }

            setValidationErrors(errors)
        }

    }, [title, body]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (validationErrors.length > 0) {
            return alert("Cannot submit review")
        }

        if (reviewExists) {
            return alert("You've already left a review for this item! Visit item page to edit or delete existing review")
        }

        const newReview = {
            item_id: itemId,
            user_id: sessionUser.id,
            title: title,
            body: body,
            rating: rating
        }

        const data = await dispatch(thunkCreateReview(itemId, newReview))

        if (data) {
            setBackendErrors(data)
        } else {
            reset()
            history.push(`/items/${itemId}`)
            return alert('Review submitted!')
        }

    }

    const reset = () => {
        setTitle('');
        setBody('');
        setRating(1);
        setValidationErrors([]);
        setBackendErrors([]);
        setHasSubmitted(false);
    }


    return (
        <div className="create-review">
            <div className="create-review-content">
                <div>
                    {backendErrors.map((error, ind) => (
                        <div id='error-msgs' key={ind}>{error}</div>
                    ))}
                    <ul>
                        {hasSubmitted && validationErrors.length > 0 && validationErrors.map(error => (
                            <li id='error-msgs' key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
                <h1>Create review</h1>
                {item && (
                    <div id='review-item-info'>
                        <Link to={`/items/${item.id}`}>
                            <img src={item.image} />
                        </Link>
                        <Link to={`/items/${item.id}`}>
                            <p id='p-item-link'>{item.title}</p>
                        </Link>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div id='review-rating'>
                        <label htmlFor="rating">Overall rating</label>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                        />
                    </div>
                    <div id='review-title'>
                        <label htmlFor="title">Add a headline</label>
                        <input
                            placeholder="What's most important to know?"
                            type='text'
                            id='title'
                            name='title'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div id='review-body'>
                        <label htmlFor="body">Add a written review</label>
                        <textarea
                            id='body'
                            name='body'
                            rows='10'
                            cols='50'
                            placeholder="What did you like or dislike? What did you use this product for?"
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                        />
                    </div>
                    <div id='review-user'>
                        <p id='review-first-p'>This is how you'll appear to other customers</p>
                        <div id='review-user-info'>
                            <img src={sessionUser.icon} />
                            <p>{sessionUser.username}</p>
                        </div>
                    </div>
                    <div id='review-submit-btn'>
                        <button id='review-submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateReviewForm
