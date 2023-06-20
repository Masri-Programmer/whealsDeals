import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../style';
import { Link } from 'react-router-dom';
import { setDeleteShowModal, setId } from '@slices'
import { TopBanner, LoaderAnimation, Skeleton, CarCard, ModalAccount, DeleteCarModal } from '@index'

const WhishList = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
    const data = useSelector((state) => state.cars.cart);
    const session_id = sessionStorage.getItem("session_id");
    const deleteShowModal = useSelector((state) => state.cars.deleteShowModal)
    const totalPrice = data?.reduce((accumulator, { car_price }) => accumulator + car_price, 0);

    const handleConfirm = (id) => {
        dispatch(setDeleteShowModal());
        dispatch(setId(id));
    };

    // ...CARS MAP
    let content;
    if (!data && data != null) {
        content = <Skeleton times={2} />;
    } else {
        content = data?.map((car) => (
            <div key={car.id}>
                <CarCard
                    inBox={true}
                    id={car.id}
                    onClick={() => handleConfirm(car.id)}
                    data={car}
                    ReadLink={`/car/${car.id}`}
                />
            </div>
        ));
    }


    return (
        <>
            <TopBanner section="Wish List" />
            <div className="container my-5 pb-5 text-center">
                {content}

                <p className='text-white text-capitalize text-medium text-end w-100 fs-3 totalPrice mt-5'>total price: <span>{totalPrice} $</span></p>
                {data?.length == 0 && (
                    <>
                        <h1 className='text-white fs-5 text-capitalize'>
                            No cars Added</h1>
                        <Link to={'/buy'}>
                            <button className={`${styles.button_white} mt-4 btn mx-2`}>
                                Add to cart</button>
                        </Link>
                    </>
                )}
                {data == null && (
                    <>
                        <h1 className='title fs-5 container-noMatch'>
                            Error fetching data...</h1>
                    </>
                )}
            </div>
            <ModalAccount />
            <DeleteCarModal show={deleteShowModal} />
        </>
    );
}

export default WhishList