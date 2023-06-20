import React, { useState, useEffect } from 'react'
import { SectionLayout, CarForm } from '@index'
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setShowModal } from '@slices'

const Sell = () => {
    const dispatch = useDispatch();
    const token = sessionStorage.getItem('token') ?? localStorage.getItem("token");
    const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

    const content = isLoggedIn ? (
        <CarForm />
    ) : (
        <>Error Fetching Data</>
    )

    return (
        <SectionLayout section={"Sell your wheels"} >
            {content}
        </SectionLayout>
    )

}

export default Sell