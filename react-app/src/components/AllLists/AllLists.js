import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetLists } from "../../store/lists";
import SingleList from "../SingleList/SingleList";
import './alllists.css';


const AllLists = () => {
    const userId = useSelector(state => state.session?.user?.id);
    const lists = useSelector(state => Object.values(state.lists));
    // console.log(lists)
    const [selectedList, setSelectedList] = useState('');
    // console.log("***", selectedList)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetLists(userId));
    }, [dispatch, userId]);


    return (
        <div className="all-lists">
            <h1>Your Lists</h1>
            <ul>
                {lists && lists.map(list => (
                    <li id='list-click'>
                        <p id='list p' onClick={() => setSelectedList(list)} >{list.name}</p>
                    </li>
                ))}
            </ul>
            <SingleList selectedList={selectedList} />
        </div>
    )
}

export default AllLists
