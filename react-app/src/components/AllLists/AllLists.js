import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetLists } from "../../store/lists";


const AllLists = () => {
    const userId = useSelector(state => state.session?.user?.id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetLists(userId));
    }, [dispatch, userId]);

    return (
        <p>hi</p>
    )
}

export default AllLists
