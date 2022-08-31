import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateList } from "../../store/lists";
import { thunkGetLists } from "../../store/lists";


const CreateListForm = ({ closeListModal }) => {
    const userId = useSelector(state => state.session?.user?.id);

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [backendErrors, setBackendErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];

        if (name) {
            if (!name.replace(/\s+/g, '').length) {
                errors.push('Please provide a name for your new list')
            }
            if (name.replace(/\s+/g, '').length > 300) {
                errors.push("List name cannot exceed 300 characters")
            }

            setValidationErrors(errors)
        }
    }, [name]);

    const reset = () => {
        setName('');
        setBackendErrors([]);
        setValidationErrors([]);
        closeListModal();
        setHasSubmitted(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (validationErrors.length > 0) {
            return alert("Cannot create list")
        }

        const newList = {
            name: name,
            user_id: userId
        }

        const data = await dispatch(thunkCreateList(newList));

        if (data) {
            setBackendErrors(data)
        } else {
            reset();
            await dispatch(thunkGetLists(userId));
        }
    }

    return (
        <div>
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
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Create a new list</h2>
                    <button onClick={closeListModal}><i className="fa-solid fa-x" /></button>
                </div>
                <label htmlFor="name">List name</label>
                <br />
                <input
                    placeholder="Shopping List 1"
                    type='text'
                    id='name'
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <p>Use lists to save items for later. All lists are private unless you share them with others.</p>
                <button onClick={closeListModal}>Cancel</button>
                <button>Create List</button>
            </form>
        </div>
    )
}

export default CreateListForm
