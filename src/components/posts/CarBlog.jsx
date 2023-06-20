import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementPage, resetPage, setData, setMedia } from '../../utils/store/slices/PostsSlice'
import { PostCreate, PostShow, TopBanner, Skeleton, LoaderAnimation } from '@index'
import { fetchPosts, getPostFiles } from '@get'

const CarBlog = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [loader, setLoader] = useState(true);
    const { data, page, media } = useSelector((state) => state.posts);
    const userId = localStorage.getItem("user_id");

    // ...GET POSTS
    useEffect(() => {
        if (data?.length === 0) {
            fetchPosts({ page, userId }).then(async (newData) => {
                const allFileDataPromises = newData
                    .filter((post) => post.file_path !== null)
                    .map((post) => getPostFiles(Number(post.id)));

                const allFileData = await Promise.all(allFileDataPromises);
                const concatenatedFileData = [].concat(...allFileData);

                dispatch(setMedia([...media, ...concatenatedFileData]));
                dispatch(setData(newData));
                setLoader(false);
            });
        }

    }, []);

    // ...FETCH MORE POSTS
    useEffect(() => {
        if (data?.length !== 0) {
            fetchPosts({ page, userId }).then((newData) => {
                const uniquePosts = new Set(data?.map((post) => post.id));
                const filteredNewData = newData.filter((post) => !uniquePosts.has(post.id));
                dispatch(setData([...data, ...filteredNewData]));
                setIsLoading(false);
                setLoader(false)
            });
        }
    }, [page]);

    // ...SCROLL EFFECT 
    useEffect(() => {
        if (data?.length !== 0) {
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    dispatch(incrementPage());
                    setIsLoading(true)
                }
            }, { threshold: 1 });
            observer.observe(document.querySelector('#bottom'));
            return () => observer.disconnect();
        } else { return; }
    }, [data]);

    let content;
    if (loader) {
        content = (
            <div className="mt-5">
                <Skeleton times={6} />
            </div>
        );
    }
    // else if (loadingPostsError) {
    //     content = <div className='title fs-4 mx-auto my-5'><TextTr txt={"Error fetching data"} />...</div>;
    // }
    else {
        content = data?.map((post) => {
            return <PostShow key={post?.id} post={post} />;
        });
    }
    return (
        <div>
            <TopBanner section="Car Blog" ShowDirecton={true} />
            <div className='mx-auto game-wall p-5 '>
                <PostCreate />
                <br />
                {content}
                {isLoading && (
                    <LoaderAnimation />
                )
                }
            </div>
            <div id="bottom"></div>
        </div>
    )
}

export default CarBlog