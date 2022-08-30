import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetLists } from "../../store/lists";

const SingleList = (selectedList) => {
    const userId = useSelector(state => state.session?.user?.id);
    const lists = useSelector(state => Object.values(state.lists));
    const list = lists.filter(list => list.id === selectedList.selectedList.id)[0];
    // console.log(list)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetLists(userId))
    }, [dispatch, userId]);

    return (
        <div className="single-list">
            {list && (
                <>
                    <h2>{list.name}</h2>
                    <img src={list.user.icon}></img>
                    <div>
                        {list.items.map(item => (
                            <>
                                <img src={item.image}></img>
                                <h3>{item.title}</h3>
                                <p>*rating here*</p>
                                <p>{item.price} bells</p>
                                <p>*date item added here*</p>
                                <button>Add to cart</button>
                                <button>Move</button>
                                <button>Delete</button>
                            </>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default SingleList
