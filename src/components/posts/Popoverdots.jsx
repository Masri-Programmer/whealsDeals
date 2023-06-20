import Dropdown from 'react-bootstrap/Dropdown';
import { moreButton, deleteIcon, report } from '@images';
import { DeletePostModal, ReportPostModal } from '@index';
import { useSelector, useDispatch } from 'react-redux';
import { setShowModal, setShowReportModal, setPostId } from '../../utils/store/slices/PostsSlice';

function Popoverdots(props) {
    const dispatch = useDispatch();
    const userId = localStorage.getItem("user_id");
    const { showModal, showReportModal } = useSelector((state) => state.posts);

    return (
        <>
            <Dropdown className='Popoverdots'>
                <Dropdown.Toggle>
                    <img src={moreButton} role='button' alt="dots" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {userId == props.postUserId && (
                        <Dropdown.Item
                            role='button'
                            onClick={(event) => {
                                event.preventDefault();
                                dispatch(setShowModal());
                                dispatch(setPostId(Number(props.postId)))
                            }}>
                            {/* <img src={deleteIcon} alt="red bin" className='me-2' /> */}
                            Delete Post
                        </Dropdown.Item>)}
                    <Dropdown.Item role='button'
                        className='d-flex gap-1'
                        onClick={(event) => {
                            event.preventDefault();
                            dispatch(setShowReportModal());
                            dispatch(setPostId(Number(props.postId)))
                        }}
                    >
                        {/* <img src={report} alt="red bin" className='me-2' /> */}
                        Report Post
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <DeletePostModal
                postId={props.postId}
                userId={userId}
                show={showModal} />
            <ReportPostModal
                postId={props.postId}
                userId={userId}
                show={showReportModal} />
        </>
    );
}

export default Popoverdots;