import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { people1, people2, people3 } from '@images';

const Testimonials = () => {
    var settings = {
        dots: true,
        infinite: true,
        vertical: true,
        arrows: false,
        verticalSwiping: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        adaptiveHeight: true,
        // autoplay: true,
        // autoplaySpeed: 3000,


        responsive: [

            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }

        ]

    };

    return (
        <div className='testimonials homepageSlider p-3 mb-2 text-center' style={{
            background: 'linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7))',
            backgroundSize: 'cover ',
            width: '100%',
            minHeight: '60vh',
            backgroundImage: `url()`
        }}
        >
            <h1 className='text-white fs-1 text-bold mx-auto text-center text-uppercase section_title'>See What WheelsDeals Customers Say About Us</h1>
            <Slider {...settings} smooth={true} >
                <div style={{ minheight: '400px' }}>
                    <div className="testimonials rounded bg-white position-relative mx-auto my-5 py-1 w-75">
                        <div className="d-flex flex-column flex-md-row align-items-center p-3">
                            <img src={people1} className="peopleImg rounded mb-3 mb-md-0 me-md-5" style={{ height: '200px' }} alt="people" />
                            <div className="people text-start">
                                <p className="title mt-0 fs-3 fs-md-1">John Smith</p>
                                <p className="text-medium river-bed fs-6">November 20,2022</p>
                                <p className="text-regular river-bed fs-5 lh-base ">Lorem ipsum dolor sit amet consectetur. Velit purus at sit.</p>
                                <button className="sandy-button btn p-1 px-2">Read More</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ minheight: '400px' }}>
                    <div className="testimonials rounded bg-white position-relative mx-auto my-5 py-1 w-75">
                        <div className="d-flex flex-column flex-md-row align-items-center p-3">
                            <img src={people2} className="peopleImg rounded mb-3 mb-md-0 me-md-5" style={{ height: '200px' }} alt="people" />
                            <div className="people text-start">
                                <p className="title mt-0 fs-3 fs-md-1">John Smith</p>
                                <p className="text-medium river-bed fs-6">November 20,2022</p>
                                <p className="text-regular river-bed fs-5 lh-base ">Lorem ipsum dolor sit amet consectetur. Velit purus at sit.</p>
                                <button className="sandy-button btn p-1 px-2">Read More</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ minheight: '400px' }}>
                    <div className="testimonials rounded bg-white position-relative mx-auto my-5 py-1 w-75">
                        <div className="d-flex flex-column flex-md-row align-items-center p-3">
                            <img src={people3} className="peopleImg rounded mb-3 mb-md-0 me-md-5" style={{ height: '200px' }} alt="people" />
                            <div className="people text-start">
                                <p className="title mt-0 fs-3 fs-md-1">John Smith</p>
                                <p className="text-medium river-bed fs-6">November 20,2022</p>
                                <p className="text-regular river-bed fs-5 lh-base ">Lorem ipsum dolor sit amet consectetur. Velit purus at sit.</p>
                                <button className="sandy-button btn p-1 px-2">Read More</button>
                            </div>
                        </div>
                    </div>
                </div>

            </Slider>
        </div>

    )

}

export default Testimonials