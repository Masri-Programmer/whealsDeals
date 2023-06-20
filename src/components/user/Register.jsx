import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa'
import { setShowModal, setCaptchaResponse, setUserProfile, login } from '@slices';
import axios from 'axios';
import { LoaderAnimation, Button } from '@index'
import styles from '@style'
// import ReCAPTCHA from "react-google-recaptcha";

let iconStyles = { color: "#0080FF" };

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const captchaResponse = useSelector((state) => state.users.captchaResponse);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
    setValidEmail(EMAIL_REGEX.test(email));
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
    setErrMsg('');
  }, [user, email, pwd, matchPwd])

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    let formData = new FormData();
    formData.append("user_name", user);
    formData.append("email_address", email);
    formData.append("user_password", pwd);
    formData.append("recaptcha", captchaResponse);
    const url1 = `${styles.base_url}/users/sign-up`;

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
        dispatch(setUserProfile(responseData.user))
        setSuccess(true);
        setUser('');
        setEmail('');
        setPwd('');
        setMatchPwd('');
        dispatch(setShowModal())
        errRef.current.focus();
      }
    } catch (err) {
      console.log(err.message);
      setErrMsg('Error');

    }

    setIsLoading(false);
  };



  return (
    <>
      {success ? (
        <section>
          <h1 className='title mt-3 mx-auto text-center'>You are Registered!</h1>
        </section>
      ) : (
        <section>
          {errMsg && (<p ref={errRef} className="text-regular text-white bg-danger rounded p-2 text-uppercase" aria-live="assertive">{errMsg}</p>)}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className='text-medium w-100 '><span className="flex items-center">
                Username
                <FaCheck style={iconStyles} className={validName ? "valid" : "hide"} />
                <FaTimes className={validName || !user ? "hide" : "invalid"} />
              </span>
                <Form.Control
                  type="text"
                  className='mb-1'
                  placeholder="Enter username"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
              </Form.Label>

              <Form.Text
                id="uidnote"
                className={userFocus && user && !validName ? "text-muted flex items-center" : "offscreen"} >
                <FaInfoCircle style={iconStyles} className='mx-1' />Letters, numbers, underscores, hyphens allowed.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3 " >
              <Form.Label className='text-medium w-100'><span className="flex items-center">
                Email
                <FaCheck style={iconStyles} className={validEmail ? "valid" : "hide"} />
                <FaTimes className={validEmail || !email ? "hide" : "invalid"} />
              </span>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  className='mb-1'
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
              </Form.Label>

              <Form.Text
                id="emailNote"
                className={emailFocus && email && !validEmail ? "text-muted items-center flex" : "offscreen"} >
                <FaInfoCircle style={iconStyles} className='mx-1' />Email not available
              </Form.Text>
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label className='text-medium w-100'><span className="flex items-center">
                Password
                <FaCheck style={iconStyles} className={validPwd ? "valid" : "hide"} />
                <FaTimes className={validPwd || !pwd ? "hide" : "invalid"} />
              </span>
                <Form.Control
                  placeholder="Password"
                  className='mb-1'
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
              </Form.Label>
              <Form.Text
                id="pwdnote"
                className={pwdFocus && !validPwd ? "text-muted items-center flex" : "offscreen "} >
                <FaInfoCircle style={iconStyles} className='mx-1' />Use uppercase, lowercase letters, a number and a special character.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className='text-medium w-100'><span className="flex items-center">
                Confirm Password
                <FaCheck style={iconStyles} className={validMatch && matchPwd ? "valid" : "hide"} />
                <FaTimes className={validMatch || !matchPwd ? "hide" : "invalid"} />
              </span>
                <Form.Control
                  placeholder="Confirm Password"
                  className='mb-1'
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
              </Form.Label>
              <Form.Text
                id="confirmnote" className={matchFocus && !validMatch ? "flex items-center" : "offscreen"}>
                <FaInfoCircle style={iconStyles} />
                Must match the first password input field.
              </Form.Text>
            </Form.Group>

            <Button
              disable={isLoading || !validName || !validEmail || !validPwd || !validMatch}
              loading={isLoading}
              type='Submit'
              className={`cursor-pointer w-100 text-center mt-1 p-2 ${styles.button}`}
            >
              Sign Up
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

export default RegisterForm
