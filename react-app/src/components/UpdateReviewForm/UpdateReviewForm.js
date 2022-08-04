import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { thunkUpdateReview } from "../../store/reviews";

const UpdateReviewForm = ({ review, closeEditModal }) => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const dispatch = useDispatch();

    const [title, setTitle] = useState(review.title);
    const [body, setBody] = useState(review.body);
    const [rating, setRating] = useState(review.rating);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    useEffect(() => {
        const errors = [];

        if (!title.length) {
            errors.push('Please provide a headline for this review')
        }
        if (!body.length) {
            errors.push('Please provide a written review')
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

        const updated = await dispatch(thunkUpdateReview(updatedReview))

        if (updated) {
            reset()
            closeEditModal()
            return alert('Review updated!')
        }

    }

    const reset = () => {
        setTitle('');
        setBody('');
        setRating(1);
        setValidationErrors([]);
        setHasSubmitted(false);
    }

    return (
        <div>
            <ul>
                {hasSubmitted && validationErrors.length > 0 && validationErrors.map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <div>
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
                <div>
                    <label htmlFor="title">Edit headline</label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div>
                    <label htmlFor="body">Edit written review</label>
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
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UpdateReviewForm
