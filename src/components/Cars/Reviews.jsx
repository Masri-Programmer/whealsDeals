import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { people1, people2, people3 } from '@images';

const Reviews = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        adaptiveHeight: true,
        // autoplay: true,
        // autoplaySpeed: 3000,
    };

    return (
        <div className='reviews homepageSlider p-5 text-center' style={{
            background: 'linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7))',
            backgroundSize: 'cover ',
            width: '100%',
            backgroundImage: `url()`
        }}
        >
            <h1 className='text-white fs-1 text-bold mx-auto text-center text-uppercase section_title'>Car Reviews</h1>
            <Slider {...settings} smooth={true}>
                <div>
                    <div className="reviews rounded bg-white position-relative mx-auto my-5 py-1" style={{ height: '420px', width: '300px' }}>
                        <div className="d-flex flex-column  align-items-center p-3">
                            <img src={people1} className="peopleImg rounded mb-3 mb-md-0 " height={250} alt="people" />
                            <div className="people text-start">
                                <p className="title mt-0 fs-3 fs-md-1">Mousa Talal</p>
                                <p className="text-medium river-bed fs-6">November 20,2022</p>
                                <p className="text-regular river-bed fs-5 lh-base ">Lorem ipsum dolor sit</p>
                                {/*<button className="sandy-button btn p-1 px-2">Read More</button>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="reviews rounded bg-white position-relative mx-auto my-5 py-1" style={{ height: '420px', width: '300px' }}>
                        <div className="d-flex flex-column  align-items-center p-3">
                            <img src={people2} className="peopleImg rounded mb-3 mb-md-0 " height={250} alt="people" />
                            <div className="people text-start">
                                <p className="title mt-0 fs-3 fs-md-1">John Smith</p>
                                <p className="text-medium river-bed fs-6">November 20,2022</p>
                                <p className="text-regular river-bed fs-5 lh-base ">Lorem ipsum dolor sit</p>
                                {/*<button className="sandy-button btn p-1 px-2">Read More</button>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="reviews rounded bg-white position-relative mx-auto my-5 py-1" style={{ height: '420px', width: '300px' }}>
                        <div className="d-flex flex-column  align-items-center p-3">
                            <img src={people3} className="peopleImg rounded mb-3 mb-md-0 " height={250} alt="people" />
                            <div className="people text-start">
                                <p className="title mt-0 fs-3 fs-md-1">John Smith</p>
                                <p className="text-medium river-bed fs-6">November 20,2022</p>
                                <p className="text-regular river-bed fs-5 lh-base ">Lorem ipsum dolor sit</p>
                                {/*<button className="sandy-button btn p-1 px-2">Read More</button>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>

    )

}

export default Reviews