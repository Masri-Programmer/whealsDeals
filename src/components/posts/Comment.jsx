import { userImage } from '@images'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { CommentBar, AlertC } from '@index';
import { createComment, deleteComment, getComments, getUsers } from '@get';
import styles from '@style';
import Alert from 'react-bootstrap/Alert';
import { FiCheckCircle } from 'react-icons/fi'
import Dropdown from 'react-bootstrap/Dropdown';

const Comment = ({ post, comments, addComment, setComment, removeComment, commentNumber }) => {
    const numCommentsDisplayed = comments?.length;
    const numCommentsLeft = commentNumber - numCommentsDisplayed;
    const [content, setContent] = useState('');
    const main_image = useSelector((state) => state.users.user.main_image)
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [page, setPage] = useState(2);
    const [users, setUsers] = useState([]);
    const [showMentions, setShowMentions] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getUsers(searchTerm).then((data) => setUsers(data))
    }, [searchTerm]);

    const handleUserClick = (user) => {
        const inputElement = document.getElementById('input');
        const value = inputElement.value;
        const start = inputElement.selectionStart;
        const end = inputElement.selectionEnd;

        const wordStart = value.lastIndexOf(' ', start - 1) + 1;
        const wordEnd = value.indexOf(' ', end);
        const word = value.substring(wordStart, wordEnd !== -1 ? wordEnd : value.length);

        const newValue = value.substring(0, wordStart) + `@${user.first_name} ${user.last_name} ` + value.substring(end);

        inputElement.value = newValue;
        setContent(newValue);
        setSearchTerm('');
        setShowMentions(false);
    };




    // ...HANDLE INPUT...
    const handleInputChange = (event) => {
        const value = event.target.value;
        setContent(value);
        const index = value.lastIndexOf('@', event.target.selectionStart - 1);
        if (index >= 0 && value.substring(index + 1, event.target.selectionStart).match(/^\S+$/)) {
            setShowMentions(true);
            setSearchTerm(value.substring(index + 1, event.target.selectionStart));
        } else {
            setShowMentions(false);
            setSearchTerm('');
        }
    }

    // ...POST COMMENT 
    const handleSubmit = (event) => {
        event.preventDefault();
        if (content !== '') {
            createComment({ token, post_id: post.id, comment: content }).then((newComment) => {
                if (newComment.succeeded) {
                    addComment(newComment.comment);
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000);
                    setContent('');
                } else {
                    alert('failed to create comment')
                }
            })
        }
    };

    //   DELETE COMMENT 
    const handleDeleteComment = (event, commentId) => {
        event.preventDefault();
        deleteComment({ token, comment_id: Number(commentId) }).then((data) => {
            if (data.success) {
                removeComment(commentId)
                setShowAlert2(true);
                setTimeout(() => {
                    setShowAlert2(false);
                }, 3000);
            } else {
                alert('failed to delete')
            }
        })
    };

    // ...FETCH MORE COMMENTS
    const fetchMoreComments = () => {
        setPage(page + 1)
        getComments(page, post.id, token).then((data) => {
            setComment(data.comments);
        })
    }

    return (
        <>
            <AlertC showAlert={showAlert} text={"Comment Posted"} />
            <AlertC showAlert={showAlert2} text={"Comment Deleted"} />
            <div className="comments px-3">
                <div className="PostComment">
                    <div className="d-flex align-items-top pb-4 m-3 ">
                        <img
                            src={main_image == null ? userImage : `${styles.base_url}${main_image}`}
                            alt="Profile"
                            className="profile-img-inner rounded-circle"
                            style={{ border: "1px solid #888888", height: '55px', width: '55px', }}
                        />
                        <div className="flex-grow-1 ms-3">
                            <Form onSubmit={handleSubmit}>
                                <InputGroup className="mb-3 text-regular">
                                    <Form.Control
                                        id="input"
                                        className='postInput p-3 w-100'
                                        placeholder="Write a comment..."
                                        value={content}
                                        onChange={handleInputChange}
                                    />

                                    {/* <img src={postButtons4} alt="happy face icon" className='happyFace position-absolute top-50 start-100 translate-middle' /> */}
                                </InputGroup>
                                {content !== '' && < span > Press Enter to Post</span>}
                                {showMentions && (
                                    < div className='mention '>
                                        <Dropdown>
                                            {users.length > 0 && (<Dropdown.Menu show>
                                                {users.map(user => (
                                                    <Dropdown.Item key={user.user_id}
                                                        onClick={() => handleUserClick(user)}
                                                    >
                                                        {user.first_name} {user.last_name}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>)}
                                        </Dropdown>
                                    </div>)}
                            </Form>
                        </div>
                    </div>
                    <div>
                        {comments && comments.map((comment) => (
                            <CommentBar comment={comment} key={comment.id} onDeleteComment={handleDeleteComment} postId={post.id} />
                        ))}
                    </div>
                    {numCommentsLeft > 0 && <p className="text-bombay cursor-pointer" onClick={() => fetchMoreComments()}> View more {numCommentsLeft} comments </p>}
                </div>
            </div >
        </>
    )
}
export default Comment