import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetLists } from "../../store/lists";
import SingleList from "../SingleList/SingleList";
import Modal from 'react-modal';
import CreateListForm from "../CreateListForm/CreateListForm";
import './alllists.css';


const AllLists = () => {
    const userId = useSelector(state => state.session?.user?.id);
    const lists = useSelector(state => Object.values(state.lists));
    const [selectedList, setSelectedList] = useState('');
    const [showListForm, setShowListForm] = useState(false);

    Modal.setAppElement('body');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetLists(userId));
    }, [dispatch, userId]);

    function openListModal() {
        setShowListForm(true)
    }

    function closeListModal() {
        setShowListForm(false)
    }

    const styling = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    }


    return (
        <div className="all-lists">
            <h1>Your Lists</h1>
            <button onClick={openListModal}>Create a list</button>
            <ul>
                {lists && lists.map(list => (
                    <li id='list-click' key={list.id}>
                        <p id='list p' onClick={() => setSelectedList(list)} >{list.name}</p>
                    </li>
                ))}
            </ul>
            <SingleList selectedList={selectedList} />
            <div>
                <Modal isOpen={showListForm} style={styling}>
                    <CreateListForm closeListModal={closeListModal} />
                </Modal>
            </div>
        </div>
    )
}

export default AllLists
