import styles from '@style';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { heartButton, heartButtonclicked, comment, userImage, } from '@images'
import { Popoverdots, PostFiles, Comment, LikesModal } from '@index';
import { setLikers, setPostId, setLoadButton, } from '../../utils/store/slices/PostsSlice';
import { likePost, dislikePost, getLikers, getTimeDifference, translate, getComments } from '@get';


const PostShow = ({ post }) => {
    const dispatch = useDispatch();
    const [showEdit, setShowEdit] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentNumber, setCommentNumber] = useState(0);
    const token = sessionStorage.getItem('token') ?? localStorage.getItem("token");
    const { media, progress, loadButton } = useSelector((state) => state.posts);
    const filteredMedia = media?.filter(obj => obj.row_id === post.id);
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(getTimeDifference(post?.DateTime));
    const [likeCount, setLikeCount] = useState(parseInt(post?.likes_number));
    const [isClicked, setClicked] = useState(post?.is_liked && post?.is_liked != 0);
    const [postText, setPostText] = useState(post?.post_description);

    // ...TRANSLATE 
    const translation = () => {
        translate(postText, selectedLanguage).then((data) => {
            setPostText(data);
        })
    }
    // ...GET TIME
    useEffect(() => {
        const intervalId = setInterval(() => {
            const newTimeDifference = getTimeDifference(post.DateTime); // assuming this is the date you want to show the difference from
            setTime(newTimeDifference);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // ...COMMENT
    const setComment = (newComments) => {
        setComments([...comments, ...newComments]);
    };
    const addComment = (newComment) => {
        setComments([newComment, ...comments]);
        setCommentNumber((prevCommentNumber) => parseInt(prevCommentNumber) + 1);
    };
    const removeComment = (commentId) => {
        const updatedComments = comments.filter((comment) => comment.id !== commentId);
        setComments(updatedComments);
        setCommentNumber((prevCommentNumber) => parseInt(prevCommentNumber) - 1);
    };
    const handlePostClick = (id) => {
        setShowEdit(!showEdit);
        if (!showEdit) {
            getComments(1, id, token).then((data) => {
                if (data.succeeded) {
                    setComments(data.comments)
                    setCommentNumber(data.count)
                } else {
                    alert('failed to fetch comments')
                }

            })
        }
    };

    const handleSubmit = () => {
        setShowEdit(false);
    };

    let content = <div></div>;
    if (showEdit) {
        content = <Comment commentNumber={commentNumber} comments={comments} onSubmit={handleSubmit} post={post} addComment={addComment} removeComment={removeComment} setComment={setComment} />;
    }

    // LIKES
    const handleLikePost = (event, postId) => {
        event.preventDefault();
        if (!isClicked) {
            likePost(token, postId);
            setLikeCount(likeCount + 1);
            setClicked(!isClicked);
        } else {
            dislikePost(token, postId);
            setLikeCount(likeCount - 1);
            setClicked(!isClicked);
        }
    };

    // ...GET LIKERS 
    const handleGetLikers = (event, post_id) => {
        event.preventDefault();
        setOpen(true)
        dispatch(setPostId(post_id));

        getLikers(1, post_id).then((data) => {
            dispatch(setLikers(data));
            if (data.length < 12) {
                if (loadButton) {
                    dispatch(setLoadButton());
                }
            } else {
                if (!loadButton) {
                    dispatch(setLoadButton());
                }
            }
        })
    }

    const handleClose = (value) => {
        setOpen(false);
    };
    let posted;
    if (post.post_description || filteredMedia?.length > 0) {
        posted = true
    } else { posted = false }
    return (
        <>
            {posted && (<div className="post mt-5 bg-light w-100 rounded position-relative">
                <LikesModal
                    postId={post.id}
                    onClose={handleClose}
                    open={open}
                />
                <div className="p-3">
                    <div className="d-flex align-items-center pb-4 mt-3">
                        <img
                            src={post.main_image == null ? userImage : `${styles.imageUrl}${post.main_image}`}
                            alt="Profile"
                            className="profile-img-inner rounded-circle"
                            style={{ border: "1px solid #888888", height: '75px', width: '75px', }}
                        />
                        <div className="flex-grow-1 col-10">
                            <div className=" mt-3 px-3">
                                <h4 className='text-bold text-black text-capitalize'>
                                    {post.first_name && post.last_name ? <>{post.first_name} {post.last_name}</> : <>{post.user_name}</>}
                                    {post.name ? `- ${post.name}` : ''}</h4>
                                <p className='text-bombay text-regular'>{time}</p>
                                <div className="p-2 position-absolute top-0 end-0">
                                    <Popoverdots postId={post.id} postUserId={post.client_id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="feed  text-regular">
                    <p className='px-5' dangerouslySetInnerHTML={{ __html: postText }} />
                    {/* {post.post_description && (<p className='text-sandy-brown cursor-pointer px-5' onClick={translation}><u>Translate</u></p>)} */}
                    <div className="postImgVideo w-100 overflow-hidden" style={{ maxHeight: '600px' }}>
                        {filteredMedia?.length > 0 && (
                            <PostFiles files={filteredMedia} />
                        )}
                    </div>
                    <div className="like-posts p-2 my-3 align-content-center align-items-center flex-wrap d-flex border-top">
                        <p className='mx-4 cursor-pointer d-flex align-items-center gap-2 justify-contetn-center' >
                            <img
                                className=' mx-1'
                                role="button"
                                src={isClicked ? heartButtonclicked : heartButton}
                                onClick={(event) => handleLikePost(event, post.id)}
                                alt="heart"
                            />
                            <span onClick={(event) => handleGetLikers(event, post.id)}>{likeCount} Likes
                            </span>
                        </p>
                        <p className='d-flex align-items-center gap-2 justify-contetn-center'>
                            <img src={comment} role="button" alt="post" onClick={() => handlePostClick(post.id)} /> {commentNumber === 0 ? post.comments_number : commentNumber} Comments</p>
                    </div>
                    {content}
                </div>
            </div>)}
        </>
    )
}
export default PostShow