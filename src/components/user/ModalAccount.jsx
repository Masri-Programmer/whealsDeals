import React, { useState } from 'react'
import { loginImg, registerImg } from '@images'
import Modal from 'react-bootstrap/Modal';
import { ModalHeader } from 'react-bootstrap';
import { LoginForm, RegisterForm } from '@index'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setShowModal, setModalDisplayPage } from '@slices';

const ModalAccount = (props) => {
  const dispatch = useDispatch()
  const showModal = useSelector((state) => state.home.showModal)
  const { modalDisplayPage } = useSelector((state) => state.home)

  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => dispatch(setShowModal())}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modalAccount"
      >
        <Modal.Header closeButton>
          <Modal.Body>
            <div className="row">
              <div className="col-6">
                <img
                  src={modalDisplayPage ? loginImg : registerImg}
                  alt={modalDisplayPage ? "login" : "register"}
                  className="modal-img rounded h-100 object-cover"
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 my-auto">
                <Modal.Title className="title text-center fs-3">
                  {modalDisplayPage ? "Welcome Back" : "Create an Account"}
                </Modal.Title>
                <p className=" text-center">
                  {modalDisplayPage
                    ? "Welcome Back! Please enter your details."
                    : "Join our community to discover new experiences!"}
                </p>
                {/* <LoginForm /> */}
                {modalDisplayPage ? <LoginForm /> : <RegisterForm />}
                <div className="centered text-center p-3">
                  {modalDisplayPage ? (
                    <p className="text-regular">
                      Not a member?{" "}
                      <button type="button" className="text-regular text-sky-900  bg-white border-0" onClick={() => dispatch(setModalDisplayPage())}>
                        Register Now
                      </button>
                    </p>
                  ) : (
                    <p className="text-regular">
                      Already a member?{" "}
                      <button type="button" className="text-regular text-sky-900 bg-white border-0" onClick={() => dispatch(setModalDisplayPage())}>
                        Login
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal.Header>
      </Modal>

    </div>
  )
}

export default ModalAccount
