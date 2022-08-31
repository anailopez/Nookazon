import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetLists } from "../../store/lists";
import { thunkDeleteList } from "../../store/lists";
import { thunkRemoveItemFromList } from "../../store/lists";

const SingleList = ({ selectedList }) => {
    const userId = useSelector(state => state.session?.user?.id);
    const lists = useSelector(state => Object.values(state.lists));
    const list = lists.filter(list => list.id === selectedList.id)[0];
    // console.log(list)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetLists(userId))
    }, [dispatch, userId]);

    const handleDelete = async (id) => {
        dispatch(thunkDeleteList(id))
        dispatch(thunkGetLists(userId))
    }

    return (
        <div className="single-list">
            {list && (
                <>
                    <h2>{list.name}</h2>
                    <img src={list.user.icon} alt='user icon'></img>
                    <button onClick={() => dispatch(thunkDeleteList(list.id))}>Delete list</button>
                    <div>
                        {list.items.map(item => (
                            <div key={item.id}>
                                <img src={item.image} alt='list item'></img>
                                <h3>{item.title}</h3>
                                <p>*rating here*</p>
                                <p>{item.price} bells</p>
                                <p>*date item added here*</p>
                                <button>Add to cart</button>
                                <button>Move</button>
                                <button onClick={() => dispatch(thunkRemoveItemFromList(list.id, item.id))}>Delete</button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default SingleList
