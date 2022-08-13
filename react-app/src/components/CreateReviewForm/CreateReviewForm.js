import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { thunkCreateReview } from "../../store/reviews";
import { thunkGetOneItem } from "../../store/items";
import './createreview.css';

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

    useEffect(() => {
        dispatch(thunkGetOneItem(itemId))
    }, [dispatch])

    useEffect(() => {
        const errors = [];

        if (!title.length) {
            errors.push('Please provide a headline for this review')
        }
        if (!body.length) {
            errors.push('Please provide a written review')
        }
        if (title.length > 200) {
            errors.push("Headline cannot exceed 200 characters")
        }
        if (body.length > 500) {
            errors.push("Written review cannot exceed 500 characters")
        }

        setValidationErrors(errors)
    }, [title, body]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (validationErrors.length > 0) {
            return alert("Cannot submit review")
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
        }

        reset()
        history.push(`/items/${itemId}`)
        return alert('Review submitted!')
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
                        <div key={ind}>{error}</div>
                    ))}
                    <ul>
                        {hasSubmitted && validationErrors.length > 0 && validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
                <h1>Create review</h1>
                {item && (
                    <div id='review-item-info'>
                        <img src={item.image} />
                        <p>{item.title}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div id='review-rating'>
                        <label htmlFor="rating">Overall rating (1-5)</label>
                        <input
                            type='number'
                            id='rating'
                            name='rating'
                            min='1'
                            max='5'
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
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
