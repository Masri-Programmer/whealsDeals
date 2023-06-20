import React, { useState, useEffect } from 'react'
import { SectionLayout, LoaderAnimation, ModalCart, Button, DisabledForm, Reviews, OwnerProfile } from '@index'
import { getCar } from '../utils/apis/Get'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styles from '@style'
import axios from 'axios'
import { setShowCartModal, setMessage, setSuccess, setCart } from '@slices'
import { PageSlider } from '@index'
const CarDetails = () => {
    const id = useParams();
    const dispatch = useDispatch();
    const idNumber = parseInt(id);
    const [data, setData] = useState(null);
    const [files, setFiles] = useState([]);
    const [tags, setTags] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [user, setUser] = useState(null);
    const { showCartModal, cart } = useSelector((state) => state.cars);
    const session_id = sessionStorage.getItem("session_id");
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");


    useEffect(() => {
        getCar(id.id).then((data) => {
            setData(data.car)
            setFiles(data.attachments)
            setTags(data.subs)
            setUser(data.user)
            setReviews(data.reviews)
        })
    }, [id]);



    //ADD TO CART
    const addCart = async (car_id, token = "", session_id = "") => {
        let formData = new FormData();
        formData.append("car_id", car_id);
        if (token !== "null" && token !== "undefined") {
            formData.append("token", token);
        }
        if (session_id !== "null" && session_id !== "undefined") {
            formData.append("session_id", session_id);
        }
        const response = await axios.post(`${styles.base_url}/cars/add-to-cart`, formData);

        dispatch(setMessage(response.data.message));
        dispatch(setSuccess(response.data.succeeded));
        if (response.data.succeeded) {
            if (!cart.includes(data)) {
                dispatch(setCart([...cart, data]));
            }
        }
        if (!session_id || session_id === "undefined" || session_id === "null") {
            sessionStorage.setItem("session_id", response.data.session_id);
        }
        return response.data;
    };
    const handleAddCar = (id) => {
        dispatch(setShowCartModal());
        addCart(id, token, session_id);
    };
    const imgSrc = data?.main_image ? `${styles.imageUrl}${data.main_image}` : ``;
    if (!data) {
        return <LoaderAnimation />
    }
    return (<>
        {/* <SectionLayout section={data?.name}> */}
        <div className="pt-5" style={{ paddingTop: '390px' }}>
            <PageSlider files={files} carDetail={true} />
        </div>
        <div className="brainstorm text-center px-3 m-0">
            <h1 className='title mt-4 text-capitalize'>
                <div className="car-tags d-flex align-content-around flex-wrap my-2">
                    {
                        tags?.map((tag, index) => {
                            return (
                                <button className={`${styles.details}`} id={tag.id} key={index}>
                                    {tag.name}
                                </button>
                            );
                        })
                    }
                </div>

            </h1>
            <Button
                onClick={() => { handleAddCar(data?.id) }}
                className={`bg-sky-900 text-white fs-5 fixed-bottom border-0`}
                loading={!data}
                type='Submit'>
                Add to Wish List
            </Button>
            <p className={`${styles.title}`}>{data?.maker}</p>
            <p className={`${styles.title}`}>{data?.name}</p>
            <p className='text-center  text-white my-4'>{data?.car_description}</p>
            <div className={`${styles.bg_white_description} text-start mb-5`}>
                Car distance: <DisabledForm txt={data?.car_distance} />
                Car maker: <DisabledForm txt={data?.car_maker} />
                Car price:  <DisabledForm txt={data?.car_price} />
                Car year: <DisabledForm txt={data?.car_year} />
                quantity: <DisabledForm txt={data?.quantity} />
                {data?.car_for_sale === 1 ? <div className="text-danger">
                    Car for Sale
                </div>
                    : <div className="text-success">
                        Car for Rent
                    </div>}

            </div>
            <OwnerProfile user={user} />
            <Reviews reviews={reviews} />
        </div>
        <div className=" position-relative mt-5 mx-auto" style={{ display: 'grid', placeItems: 'center' }}>
            <ModalCart
                car={data}
                showCartModal={showCartModal}
            />
        </div>
        {/* </SectionLayout > */}
    </>
    )
}

export default CarDetails