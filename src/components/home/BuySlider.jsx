import { ReusableCard } from "@index";
import Slider from "react-slick";
import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { gallery4, gallery5, gallery6 } from '@images'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BuySlider = () => {
    useEffect(() => {
        AOS.init();
    }, [])

    var settings = {
        arrows: true,
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="px-5">
            <Slider {...settings}>
                <div data-aos="fade-up">
                    <ReusableCard
                        img={gallery6}
                        time={"500"}
                        title={"Mercedes"}
                        bags={"3"}
                        seats={"6"}
                        location={"Tyre-Lebanon"}
                        ReadLink={`/car/1`}
                    />
                </div>
                <div data-aos="fade-up">
                    <ReusableCard
                        img={gallery4}
                        time={"500"}
                        title={"Mercedes"}
                        bags={"3"}
                        seats={"6"}
                        location={"Tyre-Lebanon"}
                        ReadLink={`/car/1`}
                    />
                </div>
                <div data-aos="fade-up">
                    <ReusableCard
                        img={gallery5}
                        time={"500"}
                        bags={"3"}
                        seats={"6"}
                        location={"Tyre-Lebanon"}
                        title={"Mercedes"}
                        ReadLink={`/car/1`}
                    />
                </div>
                <div data-aos="fade-up">
                    <ReusableCard
                        img={gallery6}
                        time={"500"}
                        bags={"3"}
                        seats={"6"}
                        location={"Tyre-Lebanon"}
                        title={"Mercedes"}
                        ReadLink={`/car/1`}
                    />

                </div>
            </Slider>
        </div>

    )
}
export default BuySlider;