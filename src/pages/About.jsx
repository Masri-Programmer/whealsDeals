import React, { useEffect } from 'react'
import { topBannerImg, logo } from '../images'
import { TopBanner, } from '@index'
import styles from '../style'
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <div className='About-Section '>
            <TopBanner img={topBannerImg} section={`About`} ShowDirecton={true} />
            <div className="row black_section py-5 w-100">
                <div className="col-lg-6 col-md-12 col-sm-12 px-5  pb-5">
                    <div className="text-sky-700 fs-3 banner-title mt-2">{`Get to know Wheels Deals`}</div>
                    <div className='text-regular text-white mt-3 fs-5 lh-lg text-justify about-text pb-0'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur id accusamus quae corporis placeat. Vel, rerum omnis doloribus consequuntur repellat debitis maxime aspernatur laborum fuga modi animi fugit nulla. Consequatur. </div>

                </div>
                <div className="col-lg-6 col-md-12 text-end col-sm-12">
                    <img className='img-fluid px-5 mt-2 pt-3' src={`${logo}`} alt="game academy" data-aos="fade-left" />
                    <div className="d-flex justify-content-end">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About