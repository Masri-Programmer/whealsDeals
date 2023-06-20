import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { AiOutlineCheck } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { CarCard, LoaderAnimation } from '@index'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCar } from '../../utils/apis/Get';
import { setCart, setShowCartModal } from '@slices';
import axios from 'axios';
import styles from '@style';

let ModalCart = (props) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
    // const { id } = useSelector((state) => state.cars);
    const { cart, success, message, showCartModal } = useSelector((state) => state.cars);
    const session_id = sessionStorage.getItem("session_id");
    const token = sessionStorage.getItem('token') ?? localStorage.getItem("token");
    const [empty, setEmpty] = useState(false)


    const totalPrice = cart?.reduce((accumulator, { car_price }) => accumulator + car_price, 0);

    const handleConfirm = (id) => {
        deleteCar(id, token || "", session_id || "").then((res) => {
            if (res.succeeded) {
                const updatedItems = cart?.filter((item) => item.id !== id);
                dispatch(setCart(updatedItems));
                if (updatedItems?.length === 0) {
                    setEmpty(true)
                }
            } else {
                alert("Failed to delete car");
            }
        });

    }


    return (
        <Modal
            show={showCartModal}
            onHide={() => dispatch(setShowCartModal())}
            size="lg"
            className='modal-cart'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className='mx-4 '>
                {message ? <>
                    {success ?
                        <Alert className='mb-4 d-flex align-items-center' variant="success">
                            <AiOutlineCheck /> {message}
                        </Alert>
                        :
                        <Alert className='mb-4 d-flex align-items-center' variant="danger">
                            {message}
                        </Alert>}
                    <div className="d-flex flex-wrap">
                        {cart?.map((car) => {
                            return <CarCard
                                key={car.id}
                                inModal="true"
                                onClick={() => handleConfirm(car?.id)}
                                data={car}
                            />;
                        })}

                    </div>
                    <p className='text-black text-capitalize text-medium text-end w-100 fs-5 totalPrice'>total price: <span>{totalPrice} $</span></p>
                    <Modal.Footer className='mx-4 sticky-top bottom-0 d-flex  '>
                        <Link to={"/whish-list"}>
                            <button className='btn sandy-button px-5 fs-6 text-uppercase' onClick={props.onHide}>continue to wish list</button>
                        </Link>
                    </Modal.Footer>
                </>
                    : <LoaderAnimation nopadding={true} />
                }
            </Modal.Body>
        </Modal>
    );
}
ModalCart = React.memo(ModalCart)
export default ModalCart;