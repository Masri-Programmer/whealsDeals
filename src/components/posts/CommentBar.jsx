import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { deleteIcon, userImage } from '@images'
import { Form } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap'
import styles from '@style';
import { getTimeDifference, likeComment, dislikeComment, translate } from '@get';

const CommentBar = ({ comment, onDeleteComment, postId }) => {
    const user_id = localStorage.getItem("user_id");
    const time = getTimeDifference(comment.DateTime)
    const token = sessionStorage.getItem('token') ?? localStorage.getItem("token");
    const [commentLikes, setCommentLikes] = useState(comment.likes_number ? comment.likes_number : 0);
    const [isLiked, setLiked] = useState(comment?.is_liked === '1');
    const [showEdit, setShowEdit] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [commentText, setCommentText] = useState(comment.comment);

    // ...TRANSLATE 
    const translation = () => {
        translate(commentText, "ar").then((data) => {
            setCommentText(data);
        })
    }

    //...LIKE COMMENT
    const onLikeComment = (e, id) => {
        e.preventDefault();
        if (!isLiked) {
            likeComment(token, id, postId)
                .then((data) => {
                    if (data.succeeded) {
                        setCommentLikes(parseInt(commentLikes) + 1);
                        setLiked(true);
                    } else {
                        alert('failed to like')
                    }
                })
        }
        else {
            dislikeComment(token, id, postId)
                .then((data) => {
                    if (data.succeeded) {
                        setCommentLikes(parseInt(commentLikes) - 1);
                        setLiked(false);
                    } else {
                        alert('failed to dislike')
                    }
                })
        }
    };

    //REPLY TOGGLE
    const handlePostClick = () => {
        setShowEdit(!showEdit);
    };

    const handleSubmit = () => {
        setShowEdit(false);
    };
    let content = <div></div>;
    // if (showEdit) {
    //   content = comment.replies.map((reply) => {
    //     return (

    //       <Reply reply={reply} key={reply.id} />

    //     )
    //   });
    // }


    //  INPUT

    const handleChange = (event) => {
        setReplyContent(event.target.value);
    };

    //REPLY POST || EDIT POST
    const handleReply = (event) => {
        // console.log(replyContent)
        // event.preventDefault();
        // if (content !== '') {
        //   const newReply = {
        //     id: comment.replies.length + 1,
        //     date: new Date().toLocaleDateString(),
        //     author: { name: 'Unknown' },
        //     content: content,
        //     likes: 0,
        //   };
        //   const updatedReplies = [...comment.replies, newReply];
        //   doEditPost({
        //     id: post.id,
        //     content: post.content,
        //     date: post.date,
        //     likes: post.likes,
        //     comments: updatedReplies,
        //     country: post.country,
        //     label: post.label,
        //     files: post.files
        //   });
        //   setReplyContent('');
        // }
    };

    return (
        <div>
            <div className="d-flex pb-3 mx-3">
                <div className="flex-shrink-0">
                    <img
                        src={comment.main_image ? `${styles.base_url}${comment.main_image}` : userImage}
                        alt="Profile Picture"
                        className="profile-img-inner rounded-circle"
                        style={{ border: "1px solid #888888", height: '55px', width: '55px', }}
                    />
                </div>
                <div className="flex-grow-1 postInput p-3 pb-0 ms-3">
                    <div className='position-relative'>
                        {comment.user_id == user_id && (<img src={deleteIcon} onClick={(event) => onDeleteComment(event, comment.id)} className={styles.deleteStyle} alt="delete icon " />)}
                        <h5 className='text-capitalize'>
                            <>
                                {comment.first_name || comment.last_name ? `${comment.first_name} ${comment.last_name}` : comment.user_name}
                                {comment.name && ` - ${comment.name}`}
                            </>
                        </h5>
                        <p>{commentText}</p>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-evenly comment-tags ms-5 flex-wrap">
                <p role="button" className={isLiked ? 'text-sandy-brown' : ''} onClick={(event) => onLikeComment(event, comment.id)}>
                    {commentLikes} <span>Like</span>
                </p>
                <p className='text-bombay'>{time ? time : ''}</p>
            </div>
            {showEdit ? <>
                <div className="d-flex align-items-center   mb-3 mx-5 ps-5">
                    <div className="flex-shrink-0 rounded-circle" style={{ border: "1px solid #888888" }}>
                        <img src={face2} height={30} alt="Profile Picture" />
                    </div>
                    <div className="flex-grow-1 ms-3 ">
                        <Form onSubmit={handleReply}>
                            <InputGroup className="my-3 text-regular">
                                <Form.Control
                                    size="sm"
                                    value={replyContent}
                                    onChange={handleChange}
                                    className='postInput'
                                    placeholder="Wrtite a Reply..."
                                    aria-label="share"
                                    aria-describedby="basic-addon2"
                                />
                                {/* <img src={postButtons4} height={20} alt="happy face icon" className='happyFace position-absolute top-50 start-100 translate-middle' /> */}
                            </InputGroup>
                        </Form>
                    </div>
                </div>
            </> : null}
            {content}
        </div>
    );
}

export default CommentBar