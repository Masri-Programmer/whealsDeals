import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '@style'
import { gallery2 } from '@images'
import { GrClose } from 'react-icons/gr'
const CarCard = (props) => {
    const { data } = props
    const imgSrc = data?.main_image ? `${styles.imageUrl}${data?.main_image}` : gallery2
    return (
        <>
            <div className={`box-card d-flex  flex-wrap bg-slate-300 w-100 rounded overflow-hidden position-relative align-items-center ${props.inModal ? 'h-25  my-1' : '  my-5  h-100'}`}>
                <div className="position-absolute top-0 end-0 img-fluid cursor-pointer m-1" onClick={props.onClick}>
                    <GrClose />
                </div>
                <div className={`col-lg-3 col-md-12 col-sm-6 overflow-hidden ${props.inModal ? 'img-col-box-sm' : 'img-col-box'}`}>
                    <Link to={`/car/${data?.id}`}>
                        <img src={imgSrc} className={`img-fluid h-100 rounded w-100 zoomOnHover boxImg`} alt="car" />
                    </Link>
                </div>
                <div className="col-lg-8 col-md-6 col-sm-6  overflow-hidden">
                    <Link to={`/car/${data?.id}`}>
                        <div className={`d-flex flex-column-reverse text-start mx-4`}>
                            <div className=" fs-6 text-regular text-black">
                                <p dangerouslySetInnerHTML={{ __html: props.inModal ? null : data?.description }} />
                            </div>
                            <div className=" text-black text-regular ">{data?.car_price}$</div>
                            <div className=" text-black text-regular ">{data?.car_distance}Km</div>
                            {data?.car_for_sale == 1 && (<div className=" text-black text-regular ">Rental Price : {data?.car_rental_price}$</div>)}
                            <div className=""> <span className='title fs-4 text-uppercase'>{data?.name}</span></div>
                        </div>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default CarCard
