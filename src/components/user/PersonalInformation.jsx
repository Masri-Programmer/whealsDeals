import React, { useRef, useState, useEffect } from 'react'
import { pen, userImage2, } from '@images'
import { FaPen } from 'react-icons/fa'
import styles from '@style';
import { Button } from '@index'
// import { Link, Redirect } from 'react-router-dom';
import { editProfile, getCountries } from '../../utils/apis/Get'
import { Form, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

const PersonalInformation = () => {
    const user = useSelector((state) => state.users.user);
    const userRef = useRef();
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();

    const editImageRef = useRef(null)
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [userName, setUserName] = useState(user.user_name);
    const [validName, setValidName] = useState(false);

    const [email, setEmail] = useState(user.email_address);
    const [validEmail, setValidEmail] = useState(false);

    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);

    const [phoneNumber, setPhoneNumber] = useState(user.phone_number_one);

    useEffect(() => {
        setValidName(USER_REGEX.test(userName));
        setValidEmail(EMAIL_REGEX.test(email));
        setErrMsg('');
        setSuccess('');

    }, [userName, email, phoneNumber])

    const [country, setCountry] = useState(user.address);
    // const [countryId, setCountryId] = useState(user.r_country_id);
    const [file, setFile] = useState(user.main_image);
    const [imageUrl, setImageUrl] = useState(user.main_image);
    const [countries, setCountries] = useState([]);
    const [edit, setEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const token = sessionStorage.getItem('token') ?? localStorage.getItem("token");
    const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const v1 = USER_REGEX.test(userName);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        editProfile(token, firstName, lastName, email, phoneNumber, country, file).then((data) => {
            if (data.succeeded) {
                setErrMsg('')
                setSuccess('You have edited your profile');
                setIsLoading(false);
                setEdit(!edit);
            } else {
                setErrMsg('Error')
                setIsLoading(false)
            }
        }).finally(() => {
            setIsLoading(false)
        });
    };

    let color;
    if (!edit) {
        color = "river-bed"
    } else { color = "text-sky-500" }
    useEffect(() => {
        getCountries().then((data) => setCountries(data));
    }, []);

    const itemsHandler = (e) => {
        const file = e.target.files[0];
        setFile(file);
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setImageUrl(fileUrl);
        }
    }
    if (isLoggedIn) {
        return (
            <div className='bg-light rounded p-3'>
                <h4 className='text-medium text-heavy-metal'>
                    Personal Information
                </h4>
                <hr />
                <div className="d-flex mt-5">
                    <div className="flex-grow-1 ">
                        <div className="d-flex align-items-center pb-4 ">
                            <div className="position-relative">
                                <img
                                    src={imageUrl == null ? userImage2 : (imageUrl === user.main_image ? `${styles.imageUrl}${user.main_image}` : imageUrl)}
                                    alt="Profile"
                                    className="profile-img-inner rounded-circle"
                                    style={{ height: '75px', minWidth: '75px', maxWidth: '85px', objectFit: 'cover', zIndex: '-10' }}
                                />
                                {edit && (<div onClick={() => { editImageRef.current.click() }} className='cursor-pointer position-absolute bottom-0 end-0' alt="edit pen icon"><FaPen /></div>)}
                                <Form.Control
                                    type="file"
                                    style={{ display: "none" }}
                                    ref={editImageRef}
                                    onChange={itemsHandler}
                                    accept="image/*"
                                />
                            </div>
                            <div className="flex-grow-1 col-10">
                                <div className=" px-3">
                                    <h4 className='text-bold text-black text-capitalize'>
                                        {user.first_name && user.last_name ? <>{user.first_name} {user.last_name}</> : <>{user.user_name}</>}
                                        {user.name ? `- ${user.name}` : ''}</h4>
                                    <p className='text-bombay text-regular'>{user.user_role === 1 ? 'Admin' : 'User'}</p>
                                    <div className="p-2 position-absolute top-0 end-0">
                                        {/* <Popoverdots userId={user.id} userUserId={user.client_id} /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div >
                        {!edit && (<button onClick={() => setEdit(!edit)} className={styles.button} >Edit Profile</button>)}
                    </div>
                </div>

                <hr />
                {errMsg && (<p ref={errRef} className="w-100 text-regular text-white bg-danger rounded p-2 text-uppercase" aria-live="assertive">{errMsg}</p>)}
                {success && (<p ref={errRef} className="w-100 text-regular text-white bg-success  rounded p-2 text-uppercase" aria-live="assertive">{success}</p>)}
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className={`text-medium ${color} w-100`}>
                            Username
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
                            />
                        </Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className={`text-capitalize text-medium ${color} w-100`}>
                            email
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                id="email"
                                ref={emailRef}
                                autoComplete="on"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </Form.Label>
                    </Form.Group>

                    <div className="row">
                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label className={`text-medium ${color} w-100`}>
                                    First Name
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        id="firstName"
                                        ref={firstNameRef}
                                        autoComplete="off"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        value={firstName}
                                    />
                                </Form.Label>
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label className={`text-medium ${color} w-100`}>
                                    Last Name
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        id="lastName"
                                        ref={lastNameRef}
                                        autoComplete="off"
                                        onChange={(e) => setLastName(e.target.value)}
                                        value={lastName}
                                    />
                                </Form.Label>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 col-sm-12">
                            <Form.Group className="mb-3">
                                <Form.Label className={`text-medium ${color} w-100`}>
                                    Mobile Number
                                    {/* <Form.Control
                                    type="text"
                                    placeholder="Mobile Number"
                                    id="phoneNumber"
                                    ref={phoneNumberRef}
                                    autoComplete="off"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    value={phoneNumber}
                                /> */}
                                    <PhoneInput
                                        placeholder="Phone number"
                                        value={phoneNumber}
                                        onChange={setPhoneNumber} />
                                </Form.Label>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 col-sm-6">
                            <Form.Group className="mb-3">
                                <Form.Label className={`text-medium ${color} w-100`}>
                                    Country
                                    <Form.Select
                                        aria-label="country select"
                                        value={country}
                                        onChange={(e) => {
                                            const selectedOption = countries.find(
                                                (option) => option.name === e.target.value
                                            );
                                            setCountry(selectedOption.name);
                                            const selectedId = selectedOption.id;
                                            // setCountryId(selectedId);
                                        }} >
                                        {countries?.map(({ name, id }) => (
                                            <option value={name} key={id}>
                                                {name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Label>
                            </Form.Group>
                        </div>
                    </div>
                    {edit && (<div className="d-flex gap-3 mx-auto justify-conent-end w-100">
                        <Button className={styles.button}
                            // disable={isLoading || !validEmail || !validName}
                            loading={isLoading}
                            onClick={handleSubmit}
                            type="Submit"
                        >
                            Save
                        </Button>
                        <button role="button" className={styles.button} onClick={(e) => {
                            e.preventDefault();
                            setEdit(!edit);
                            setIsLoading(false);
                            setFirstName(user.first_name)
                            setLastName(user.last_name)
                            setEmail(user.email)
                            setPhoneNumber(user.phone_number_one)
                            setCountry(user.country)
                        }}>Cancel</button>
                    </div>)}
                </Form>

            </div>
        )
    } else { return; }
}
{/* <Redirect to="/" /> */ }

export default PersonalInformation