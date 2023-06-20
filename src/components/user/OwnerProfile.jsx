import React, { useRef, useState, useEffect } from 'react'
import { userImage } from '@images';
import styles from '../../style';
import { DisabledForm } from '@index'
import { Form, InputGroup } from 'react-bootstrap';

const OwnerProfile = ({ user }) => {
    return (
        <div className='bg-light rounded p-3'>
            <h4 className='text-medium text-heavy-metal'>
                Car Owner Information
            </h4>
            <hr />
            <div className="d-flex">
                <div className="flex-grow-1 ">
                    <div className="d-flex align-items-center pb-4 ">
                        <div className="position-relative">
                            <img
                                src={user?.main_image ? `${styles.imageUrl}${user?.main_image}` : userImage}
                                alt="Profile"
                                className="profile-img-inner rounded-circle"
                                style={{ height: '75px', minWidth: '75px', maxWidth: '75px', objectFit: 'cover', zIndex: '-10' }}
                            />

                        </div>
                        <div className="text-start col-10">
                            <div className=" px-3">
                                <h4 className='text-bold mojo-text text-capitalize mt-1'>
                                    {user?.first_name && user?.last_name && user?.first_name != "null" && user?.last_name != "null" ? <>{user?.first_name} {user?.last_name}</> : <>{user?.user_name}</>}
                                    {user?.name ? `- ${user?.name}` : ''}</h4>
                                <p className='text-bombay text-regular'>{user?.user_role === 1 ? 'Admin' : 'Car Owner'}</p>
                                <div className="p-2 position-absolute top-0 end-0">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div >
                </div>
            </div>
            <hr />
            <Form className='text-start mt-5'>
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <DisabledForm value={"Username"} txt={user?.user_name} />
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <DisabledForm value={"Email"} txt={user?.email_address} />
                    </div>

                    <div className="col-lg-6 col-sm-12">
                        <DisabledForm value={"First Name"} txt={user?.first_name} />
                    </div>

                    <div className="col-lg-6 col-sm-12">
                        <DisabledForm value={"Last Name"} txt={user?.last_name} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <DisabledForm value={"Address"} txt={user?.address} />
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <DisabledForm value={"Mobile Number"} txt={user?.phone_number} />
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default OwnerProfile