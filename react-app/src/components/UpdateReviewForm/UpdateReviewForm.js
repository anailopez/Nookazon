import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { thunkUpdateReview } from "../../store/reviews";
import './update-review.css';

const UpdateReviewForm = ({ review, closeEditModal }) => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const dispatch = useDispatch();

    const [title, setTitle] = useState(review.title);
    const [body, setBody] = useState(review.body);
    const [rating, setRating] = useState(review.rating);
    const [validationErrors, setValidationErrors] = useState([]);
    const [backendErrors, setBackendErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    useEffect(() => {
        const errors = [];

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
    }, [title, body]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (validationErrors.length > 0) {
            return alert("Cannot submit review")
        }

        const updatedReview = {
            ...review,
            item_id: review.item_id,
            user_id: sessionUser.id,
            title: title,
            body: body,
            rating: rating
        }

        const data = await dispatch(thunkUpdateReview(updatedReview))

        if (data) {
            setBackendErrors(data)
        }

        reset()
        closeEditModal()
        return alert('Review updated!')
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
        <div className="edit-review-form">
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
            <form id='form-styling' onSubmit={handleSubmit}>
                <label htmlFor="rating">Overall rating (1-5)</label>
                <div>
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
                <label htmlFor="title">Edit headline</label>
                <div>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <label htmlFor="body">Edit written review</label>
                <div>
                    <textarea
                        id='body'
                        name='body'
                        rows='10'
                        cols='50'
                        placeholder='What did you like or dislike? What did you use this product for?'
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    />
                </div>
                <button id='modal-btn'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateReviewForm
