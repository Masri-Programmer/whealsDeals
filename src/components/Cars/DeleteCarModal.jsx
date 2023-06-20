import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Button, } from '@index';
import styles from '@style';
import { setDeleteShowModal, setCart, setAlert, setAlertText, setAlertSuccess } from '@slices';
import { deleteCar } from '../../utils/apis/Get';

function DeleteCarModal(props) {
    const dispatch = useDispatch();
    const { id } = useSelector((state) => state.cars)
    const [isLoading, setIsLoading] = useState(false)
    const data = useSelector((state) => state.cars.cart);
    const session_id = sessionStorage.getItem("session_id");
    const token = sessionStorage.getItem('token') ?? localStorage.getItem("token");

    const handleConfirm = async () => {
        setIsLoading(true);
        const res = await deleteCar(id, token, session_id);
        if (res.succeeded) {
            const updatedItems = data.filter((item) => item.id !== id);
            dispatch(setCart(updatedItems));
            dispatch(setAlert());
            dispatch(setAlertText('Successfully deleted'));
            dispatch(setAlertSuccess(true));
        } else {
            dispatch(setAlert());
            dispatch(setAlertText('failed to delete'));
            dispatch(setAlertSuccess(false));
        }
        setIsLoading(false);
        dispatch(setDeleteShowModal());
    }

    return (
        <Modal
            className='modal-content-above'
            show={props.show}
            onHide={() => dispatch(setDeleteShowModal())}
            size="lg"
            centered >
            <Modal.Body className='text-white text-center border-5'>
                <p className='text-black text-uppercase text mx-auto lh-3  fs-4 lh-lg mt-5'>
                    Are you sure you want to delete this Car ?
                </p>
            </Modal.Body>
            <Modal.Footer className=' mx-auto'>
                <button
                    onClick={() => { dispatch(setDeleteShowModal()); setIsLoading(false); }} className='px-5
sandy-button text-uppercase btn mx-3'>cancel</button>
                <Button
                    // disable={isLoading}
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
export default DeleteCarModal;
