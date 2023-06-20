import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { incrementPage, resetPage, setData, setMedia } from '../../store/slices/PostsSlice'
// import { getProfilePosts } from '../../store'
// import { Redirect } from 'react-router-dom';
import { LoaderAnimation, PostShow } from '@index';
// import { Link, Redirect } from 'react-router-dom';
import { getUserPosts } from '../../utils/apis/Get';

const MyPosts = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const token = sessionStorage.getItem('token') ?? localStorage.getItem("token");
    const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

    // ...GET POSTS
    useEffect(() => {
        getUserPosts(token).then((newData) => {
            setData(newData.posts)
            setIsLoading(false);
        });
    }, []);

    const content = isLoading ? <LoaderAnimation /> : data?.map((post, index) => {
        if (index === 0) {
            return <PostShow key={post?.id} post={post} removeMargin={true} />;
        } else {
            return <PostShow key={post?.id} post={post} />;
        }
    });

    if (isLoggedIn) {
        return (
            <div>{content}</div>
        )
    } else { return; }
    // <Redirect to="/" />
}

export default MyPosts