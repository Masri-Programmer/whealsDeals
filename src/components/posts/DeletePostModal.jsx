import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { alertIcon } from '@images';
import { Button } from '@index';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '@get';
import { setShowModal, setData, setMedia } from '../../utils/store/slices/PostsSlice';
import { setAlertText, setAlert, setAlertSuccess } from '@slices'
function DeletePostModal(props) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const { data, media, postId } = useSelector((state) => state.posts);
    const token = sessionStorage.getItem('token') ?? localStorage.getItem("token");

    const handleConfirm = () => {
        setIsLoading(true)
        deletePost(token, postId).then((newData) => {
            if (newData.succeeded) {
                dispatch(setData(data.filter((data) => data.id != newData.post_id)));
                dispatch(setMedia(media.filter((data) => data.row_id != newData.post_id)));
                setIsLoading(false)
                dispatch(setShowModal());
                dispatch(setAlert());
                dispatch(setAlertText('Successfully deleted'));
                dispatch(setAlertSuccess(true));
            } else {
                dispatch(setAlert());
                dispatch(setAlertText('failed to delete'));
                dispatch(setAlertSuccess(false));
                alert('failed to delete post')
            }
        });
    }

    return (
        <Modal
            show={props.show}
            // onHide={() => dispatch(setShowModal())}
            size="lg"
            centered >
            <Modal.Body className='text-white text-center border-5'>
                <p className='text-uppercase text-black mx-auto lh-3  fs-4 lh-lg mt-5'>
                    Are you sure you want to delete this post ?
                </p>
            </Modal.Body>
            <Modal.Footer className=' mx-auto'>
                <button
                    onClick={() => { dispatch(setShowModal()) }}
                    className='px-5 sandy-button text-uppercase btn mx-3 '>
                    cancel
                </button>
                <Button
                    disable={isLoading}
                    loading={isLoading}
                    className='sandy-button text-uppercase btn mx-3 px-5'
                    onClick={handleConfirm}
                    type='Submit'>
                    confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default DeletePostModal;
