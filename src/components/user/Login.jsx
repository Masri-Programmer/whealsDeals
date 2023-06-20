import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, InputGroup } from 'react-bootstrap';
import { Button, LoaderAnimation } from '@index';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setShowModal, setUserProfile, setCaptchaResponse, login } from '@slices';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import styles from '@style'
// import GoogleReCaptcha from "react-google-recaptcha";
// import ReCAPTCHA from "react-google-recaptcha";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const userRef = useRef();
  const errRef = useRef();
  const rememberMeREf = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const captchaResponse = useSelector((state) => state.users.captchaResponse);

  // ...show pass
  const handleTogglePwd = () => {
    setShowPwd(!showPwd);
  };


  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])



  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    let formData = new FormData();
    formData.append("parameter", user);
    formData.append("user_password", pwd);
    formData.append("recaptcha", captchaResponse);
    const url1 = `${styles.base_url}/users/login`;
    try {
      const res = await axios.post(url1, formData);
      const responseData = res.data;
      setErrMsg(responseData.message);
      if (responseData.succeeded) {
        dispatch(login());
        localStorage.setItem("user_id", responseData.user.user_id);
        localStorage.setItem("user_name", responseData.user.user_name);
        sessionStorage.setItem('isSignedIn', true);
        sessionStorage.setItem('token', responseData.user.token);
        dispatch(setUserProfile(responseData.user));
        setSuccess(true);
        setUser('');
        setPwd('');
        dispatch(setShowModal())

        if (rememberMeREf.current.checked) {
          localStorage.setItem("token", responseData.user.token);
        }
      }
    } catch (err) {
      console.log(err.message);
      setErrMsg('Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1 className='title mt-3 mx-auto text-center'>You are logged in!</h1>
        </section>
      ) : (
        <section>
          {errMsg && (<p ref={errRef} className="text-regular text-white bg-danger rounded p-2 text-uppercase" aria-live="assertive">{errMsg}</p>)}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className='text-medium river-bed w-100'>Username or Email
                <Form.Control
                  type="text"
                  placeholder="Enter Username or Email"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className='text-medium river-bed w-100'>Password
                <InputGroup>
                  <Form.Control
                    placeholder="Password"
                    type={showPwd ? 'text' : 'password'}
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                  />
                  <button className='border-0 rounded-end bg-sky-500 px-2' type='button' onClick={() => { handleTogglePwd() }}>
                    {showPwd ? <FiEyeOff /> : <FiEye />}
                  </button>
                </InputGroup>
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <div className="d-flex justify-content-between">
                <Form.Check
                  label={<div className='d-flex'>
                    <button type='button' className='border-0 bg-white' onClick={() => { setIsChecked(!isChecked) }}>Remember Me</button>
                  </div>
                  }
                  type="checkbox"
                  checked={isChecked}
                  id="Remember-me"
                  onChange={() => { setIsChecked(!isChecked) }}
                  className='text-regular fs-6 cursor-pointer'
                  ref={rememberMeREf}
                />
                <Form.Text className='text-regular' as={Link} onClick={() => dispatch(setShowModal())} to={"/forget-password"}>Forgot Password?</Form.Text>
              </div>
            </Form.Group>
            <Button
              // disable={}
              loading={isLoading}
              type='Submit'
              className={`${styles.button} flex justify-center rounded-0 w-100 text-center mt-1 mb-2 p-2`} >
              Login
            </Button>
            <div className="text-center d-flex justify-content-center mt-2">
              {/* <ReCAPTCHA
                sitekey="6Ld27z8lAAAAAAO1VKE9X8fz4JnlVxzdHmHOmMfP"
                onChange={(response) => {
                  dispatch(setCaptchaResponse(response));
                }}
              /> */}
            </div>
          </Form>
        </section>
      )}
    </>
  )
}
export default LoginForm
